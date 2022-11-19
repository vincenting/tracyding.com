resource "aws_route53_zone" "primary" {
  name = var.root_domain_name
}

locals {
  website_domains = [var.root_domain_name, "www.${var.root_domain_name}"]
}

resource "aws_route53_record" "root" {
  for_each = toset(local.website_domains)

  zone_id = aws_route53_zone.primary.zone_id
  name    = each.key
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website.domain_name
    zone_id                = aws_cloudfront_distribution.website.hosted_zone_id
    evaluate_target_health = false
  }
}
