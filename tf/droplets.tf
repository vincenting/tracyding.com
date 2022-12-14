locals {
  website_s3_origin_id = "websiteOriginalId"
}

module "acm_request_certificate" {
  source = "cloudposse/acm-request-certificate/aws"
  providers = {
    aws = aws.us_region
  }

  ttl                       = "300"
  zone_id                   = aws_route53_zone.primary.zone_id
  domain_name               = var.root_domain_name
  subject_alternative_names = ["www.${var.root_domain_name}"]

  wait_for_certificate_issued       = true
  process_domain_validation_options = true
}

resource "aws_s3_bucket" "static_site" {
  bucket = var.hosting_s3_bucket_name
}

resource "aws_s3_bucket_acl" "static_site" {
  bucket = aws_s3_bucket.static_site.bucket
  acl    = "private"
}

resource "aws_s3_bucket_policy" "static_site" {
  bucket = aws_s3_bucket.static_site.id
  policy = data.aws_iam_policy_document.s3_policy.json
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.static_site.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.read_s3_from_cf.iam_arn]
    }
  }
}

resource "aws_cloudfront_origin_access_identity" "read_s3_from_cf" {
  comment = "Allow CloudFront to read files from S3"
}

resource "aws_cloudfront_response_headers_policy" "cache_control" {
  name    = "cache-control-for-web"
  comment = "Force the assets cached in browser"

  custom_headers_config {
    items {
      header   = "Cache-Control"
      override = true
      value    = "public, max-age=31536000"
    }
  }
}

resource "aws_cloudfront_distribution" "website" {
  origin {
    domain_name = aws_s3_bucket.static_site.bucket_regional_domain_name
    origin_id   = local.website_s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.read_s3_from_cf.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases             = local.website_domains
  http_version        = "http2and3"

  custom_error_response {
    error_code         = 403
    response_code      = 404
    response_page_path = "/404.html"
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    viewer_protocol_policy = "redirect-to-https"
    compress               = true
    target_origin_id       = local.website_s3_origin_id
    min_ttl                = 86400
    default_ttl            = 259200
    max_ttl                = 864000

    response_headers_policy_id = aws_cloudfront_response_headers_policy.cache_control.id

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  ordered_cache_behavior {
    path_pattern     = "*.html"
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.website_s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }


  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn = module.acm_request_certificate.arn
    ssl_support_method  = "sni-only"
  }

  retain_on_delete = true
}
