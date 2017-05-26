# lambda-counselors

An AWS Lambda function for creating PDFs from CFPB's [housing counselor search tool](https://www.consumerfinance.gov/find-a-housing-counselor/).

## Installation

1. `npm i -g serverless`
1. `npm install`
1. Create/obtain AWS credentials that have Lambda access.
1. Store the credentials locally: `aws configure --profile housing-counselors-pdf`
1. Create an S3 bucket called `housing-counselor-pdfs` and grant your account write access to it.

## Testing

1. `serverless deploy` will deploy the project to staging.
1. `serverless invoke --log --function pdf --data '{"queryStringParameters":{"zipcode":12345}}'` invokes the function with `?zipcode=1234`.

## Deployment

1. `serverless deploy --stage production`

[Serverless](https://serverless.com/) will upload the project to AWS and provide an endpoint for GET requests.

## Contributing

Please read our general [contributing guidelines](CONTRIBUTING.md).

## Open source licensing info
1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)
