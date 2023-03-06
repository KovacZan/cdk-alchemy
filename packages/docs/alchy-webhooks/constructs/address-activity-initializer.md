---
sidebar_position: 2
---

# Address Activity Initializer

Allows you to setup Address Activity Alchemy Webhook with help of AWS CDK.

Alchemy Documentation About This Webhook Type: https://docs.alchemy.com/reference/address-activity-webhook

In order to use it provision the following construct:

```typescript
import { AddressActivityInitializer } from "@kovi-soft/cdk-alchemy-webhooks";


new AddressActivityInitializer(this, "AddressActivityExample", {
    alchemyApiKey: "<your-alchemy-api-key>",
    alchemyNetwork: "eth-mainnet", 
    alchemyAuthToken: "<your-alchemy-auth-token>",
    alchemyWebhookDestinationUrl: "https://my-domain.com/destination-to-my-server",
    alchemyContractAddress: "0x026224A2940bFE258D0dbE947919B62fE321F042"
});
```

*Check the documentation package on Github for more information*
