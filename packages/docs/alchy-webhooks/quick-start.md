---
sidebar_position: 2
---
# Quick Start

:::caution

This package is still under development! Be careful while using it!

:::

## 1. Installation 

Run the following command inside your infrastructure repository.

```bash
npm install @kovi-soft/cdk-alchemy-webhooks
```

*You can use any other node package manager*

## 2. Setup

Include `AddressActivityInitializer` into your Infrastructure code and start using.

```typescript
import { AddressActivityInitializer } from "@kovi-soft/cdk-alchemy-webhooks";

export class AddressActivityStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: {}) {
        super(scope, id, props);

        new AddressActivityInitializer(this, "AddressActivityExample", {
            alchemyApiKey: "<your-alchemy-api-key>",
            alchemyNetwork: "eth-mainnet",
            alchemyAuthToken: "<your-alchemy-auth-token>",
            alchemyWebhookDestinationUrl: "https://my-domain.com/destination-to-my-server",
            alchemyContractAddress: "0x026224A2940bFE258D0dbE947919B62fE321F042"
        });
    }
}
```

## 3. Execute

Run the following command

```bash
cdk deploy AddressActivityStack
```

*This may vary based on your project setup*
