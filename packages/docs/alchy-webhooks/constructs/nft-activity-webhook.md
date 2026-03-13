---
sidebar_position: 1
---

# NFT Activity Webhook

Allows you to setup NFT Activity Alchemy Webhook with help of AWS CDK.

Alchemy Documentation About This Webhook Type: https://docs.alchemy.com/reference/nft-activity-webhook

## Usage

```typescript
import { NFTActivityWebhook, AlchemyCredential } from "@kovi-soft/cdk-alchemy-webhooks";

new NFTActivityWebhook(this, "NFTActivityExample", {
	alchemyApiKey: AlchemyCredential.fromPlainText("<your-alchemy-api-key>"),
	alchemyNetwork: "eth-mainnet",
	alchemyAuthToken: AlchemyCredential.fromPlainText("<your-alchemy-auth-token>"),
	alchemyWebhookDestinationUrl: "https://my-domain.com/destination-to-my-server",
	alchemyContractAddress: "0x026224A2940bFE258D0dbE947919B62fE321F042",
	alchemyTokenId: "99999",
	alchemyWebhookName: "MyNFTActivityWebhook"
});
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `alchemyApiKey` | `string \| IAlchemyCredential` | Yes | Alchemy API key |
| `alchemyNetwork` | `Network \| string` | Yes | Target blockchain network |
| `alchemyAuthToken` | `string \| IAlchemyCredential` | Yes | Alchemy auth token |
| `alchemyWebhookDestinationUrl` | `string` | Yes | URL to receive webhook events |
| `alchemyContractAddress` | `string` | No | Contract address to monitor |
| `alchemyTokenId` | `string \| number \| BigNumber` | No | Token ID to filter on |
| `alchemyWebhookName` | `string` | No | Optional name for the webhook |
