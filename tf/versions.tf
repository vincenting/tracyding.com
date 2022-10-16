terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"

  backend "s3" {
    bucket = "tracy-ding-state"
    key    = "tf//terraform.tfstate"
    region = "ap-east-1"
  }
}