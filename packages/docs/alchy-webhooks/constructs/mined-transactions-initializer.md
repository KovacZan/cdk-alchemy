---
sidebar_position: 4
---

# Mined Transactions Initializer

Allows you to setup Mined Transactions Alchemy Webhook with help of AWS CDK.

Alchemy Documentation About This Webhook Type: https://docs.alchemy.com/reference/mined-transaction-webhook

In order to use it provision the following construct:

```typescript
import { MinedTransactionsInitializer } from "@kovi-soft/cdk-alchemy-webhooks";


new MinedTransactionsInitializer(this, "MinedTransactionsExample", {
    alchemyApiKey: "<your-alchemy-api-key>",
    alchemyNetwork: "eth-mainnet", 
    alchemyAuthToken: "<your-alchemy-auth-token>",
    alchemyWebhookDestinationUrl: "https://my-domain.com/destination-to-my-server",
    alchemyAppId: "<your-alchemy-app-id>"
});
```

*Check the documentation package on Github for more information*
