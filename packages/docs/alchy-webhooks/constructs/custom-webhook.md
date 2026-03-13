---
sidebar_position: 3
---

# Custom Webhook

Allows you to setup a Custom GraphQL Alchemy Webhook with help of AWS CDK.

Custom Webhooks use GraphQL queries to define exactly which on-chain data you want to receive, giving you full flexibility over the webhook payload.

Alchemy Documentation About Custom Webhooks: https://docs.alchemy.com/reference/custom-webhook

## Usage

```typescript
import { CustomWebhook, AlchemyCredential, GraphqlQuerySource } from "@kovi-soft/cdk-alchemy-webhooks";

new CustomWebhook(this, "CustomWebhookExample", {
	alchemyApiKey: AlchemyCredential.fromPlainText("<your-alchemy-api-key>"),
	alchemyNetwork: "eth-mainnet",
	alchemyAuthToken: AlchemyCredential.fromPlainText("<your-alchemy-auth-token>"),
	alchemyWebhookDestinationUrl: "https://my-domain.com/destination-to-my-server",
	alchemyWebhookName: "MyCustomWebhook",
	alchemyGraphqlQuery: `{
		block {
			hash
			number
			timestamp
			transactions {
				from {
					address
				}
				createdContract {
					address
				}
			}
		}
	}`
});
```

## GraphQL Query Source

The `alchemyGraphqlQuery` prop accepts either a plain string or an `IGraphqlQuerySource` instance, following the same pattern as `AlchemyCredential`.

Use `GraphqlQuerySource.fromPlainText()` to pass the query inline (equivalent to passing a raw string):

```typescript
alchemyGraphqlQuery: GraphqlQuerySource.fromPlainText(`{
	block {
		hash
		number
	}
}`)
```

Use `GraphqlQuerySource.fromSsmParameter()` to load the query from AWS SSM Parameter Store at deploy time. The construct automatically grants the Lambda function `ssm:GetParameter` permission on the specified parameter:

```typescript
import { CustomWebhook, AlchemyCredential, GraphqlQuerySource } from "@kovi-soft/cdk-alchemy-webhooks";

new CustomWebhook(this, "CustomWebhookFromSsm", {
	alchemyApiKey: AlchemyCredential.fromSsmParameter("/alchemy/api-key"),
	alchemyNetwork: "eth-mainnet",
	alchemyAuthToken: AlchemyCredential.fromSsmParameter("/alchemy/auth-token"),
	alchemyWebhookDestinationUrl: "https://my-domain.com/destination-to-my-server",
	alchemyWebhookName: "MyCustomWebhook",
	alchemyGraphqlQuery: GraphqlQuerySource.fromSsmParameter("/my/graphql-query")
});
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `alchemyApiKey` | `string \| IAlchemyCredential` | Yes | Alchemy API key |
| `alchemyNetwork` | `Network \| string` | Yes | Target blockchain network |
| `alchemyAuthToken` | `string \| IAlchemyCredential` | Yes | Alchemy auth token |
| `alchemyWebhookDestinationUrl` | `string` | Yes | URL to receive webhook events |
| `alchemyGraphqlQuery` | `string \| IGraphqlQuerySource` | Yes | GraphQL query defining the webhook payload |
| `alchemyWebhookName` | `string` | No | Optional name for the webhook |
