---
sidebar_position: 1
---

# NFT Activity Initializer

Allows you to setup NFT Activity Alchemy Webhook with help of AWS CDK.

Alchemy Documentation About This Webhook Type: https://docs.alchemy.com/reference/nft-activity-webhook

In order to use it provision the following construct:

```typescript
import { NFTActivityInitializer } from "@kovi-soft/cdk-alchemy-webhooks";


new NFTActivityInitializer(this, "NFTActivityExample", {
    alchemyApiKey: "<your-alchemy-api-key>",
    alchemyNetwork: "eth-mainnet", 
    alchemyAuthToken: "<your-alchemy-auth-token>",
    alchemyWebhookDestinationUrl: "https://my-domain.com/destination-to-my-server",
    alchemyContractAddress: "0x026224A2940bFE258D0dbE947919B62fE321F042", 
    alchemyTokenId: "99999"
});
```

*Check the documentation package on Github for more information*
