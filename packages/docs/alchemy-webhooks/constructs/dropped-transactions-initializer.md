---
sidebar_position: 3
---

# Dropped Transactions Initializer

Allows you to setup Dropped Transactions Alchemy Webhook with help of AWS CDK.

Alchemy Documentation About This Webhook Type: https://docs.alchemy.com/reference/dropped-transaction-webhook

In order to use it provision the following construct:

```typescript
import { DroppedTransactionsInitializer } from "@kovi-soft/cdk-alchemy-webhooks";


new DroppedTransactionsInitializer(this, "DroppedTransactionsExample", {
    alchemyApiKey: "<your-alchemy-api-key>",
    alchemyNetwork: "eth-mainnet", 
    alchemyAuthToken: "<your-alchemy-auth-token>",
    alchemyWebhookDestinationUrl: "https://my-domain.com/destination-to-my-server",
    alchemyAppId: "<your-alchemy-app-id>"
});
```

*Check the documentation package on Github for more information*
