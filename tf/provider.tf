provider "aws" {
  region = "ap-east-1"
}

provider "aws" {
  alias  = "us_region"
  region = "us-east-1"
}
