---
sidebar_position: 3
---

# Custom Webhook

Allows you to setup a Custom GraphQL Alchemy Webhook with help of AWS CDK.

Custom Webhooks use GraphQL queries to define exactly which on-chain data you want to receive, giving you full flexibility over the webhook payload.

Alchemy Documentation About Custom Webhooks: https://docs.alchemy.com/reference/custom-webhook

## Usage

```typescript
import { CustomWebhook, AlchemyCredential } from "@kovi-soft/cdk-alchemy-webhooks";

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

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `alchemyApiKey` | `string \| IAlchemyCredential` | Yes | Alchemy API key |
| `alchemyNetwork` | `Network \| string` | Yes | Target blockchain network |
| `alchemyAuthToken` | `string \| IAlchemyCredential` | Yes | Alchemy auth token |
| `alchemyWebhookDestinationUrl` | `string` | Yes | URL to receive webhook events |
| `alchemyGraphqlQuery` | `string` | Yes | GraphQL query defining the webhook payload |
| `alchemyWebhookName` | `string` | No | Optional name for the webhook |
