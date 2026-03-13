---
sidebar_position: 1
---

# Introduction

Introducing CDK Alchy Webhooks, a powerful library that leverages the capabilities
of AWS and its CloudFormation service to provide a flexible and scalable infrastructure
for your applications.

With CDK Alchy Webhooks, you can easily integrate the power of Alchemy into your Cloud infrastructure,
with just a few lines of code.

## Use Cases

Whether you're building a fintech application, a gaming platform, or a supply chain solution,
CDK Alchemy Webhooks can help you achieve your goals with speed and reliability.
And because it's an open source project, you can customize and extend it to meet your specific needs.

## Structure

CDK Alchemy Webhooks provides constructs for provisioning Alchemy Notify Webhooks as part of your AWS infrastructure.

### Webhook Constructs

Webhook constructs allow you to set up Alchemy Notify Webhooks while provisioning your resources,
so they are automatically created when you deploy to various environments.
The following webhook types are available:

- **Address Activity** — monitor address activity on-chain
- **NFT Activity** — monitor NFT transfers and activity
- **Custom Webhook** — use GraphQL queries to define custom webhook payloads

### Credential Management

The `AlchemyCredential` abstraction lets you securely provide your Alchemy API key and auth token from multiple sources:

- Plain text (for development)
- AWS SSM Parameter Store
- AWS Secrets Manager

See the [Credentials](./credential.md) page for details.

### GraphQL Query Source

For Custom Webhooks, the `GraphqlQuerySource` abstraction lets you provide your GraphQL query from multiple sources:

- Plain text (inline string)
- AWS SSM Parameter Store

See the [Custom Webhook](./constructs/custom-webhook.md) page for details.
