resource "aws_route53_zone" "primary" {
  name = var.root_domain_name
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

resource "aws_route53_record" "root" {
  zone_id = aws_route53_zone.primary.zone_id
  name    = var.root_domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}
