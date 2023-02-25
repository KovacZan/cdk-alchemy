---
sidebar_position: 5
---

# NFT Activity Queue


## Setup 

Allows you to setup to update NFT Activity Alchemy Webhook with help of SQS Queues, 
which you can call from your app.

Alchemy Documentation About Updating Webhook via SDK: https://docs.alchemy.com/reference/sdk-update-webhook

In order to use it provision the following construct:

```typescript
import { NFTActivityQueue } from "@kovi-soft/cdk-alchemy-webhooks";


new NFTActivityQueue(this, "NFTActivityQueueExample", {
    nftActivityProps: {
        alchemyApiKey: "<your-alchemy-api-key>",
        alchemyNetwork: "eth-mainnet",
        alchemyAuthToken: "<your-alchemy-auth-token>"
    }
});
```

## Usage

You can execute `NFTActivity` Queue from other AWS Services or you can try it out via AWS Console.

![Queue Usage Via AWS Console](./img/image1.png)

## Interface

```typescript
interface NFTActivityRecord {
    filterType: "ADD" | "REMOVE";
    filters: { 
        contractAddress: string; 
        tokenId: string; 
    }[];
}
```

### Example body
```json
{
   "filterType":"ADD",
   "filters":[
      {
         "contractAddress":"0x03fE2664Cb4351D1ac72050CF1843A68DB12533C",
         "tokenId":"999999"
      }
   ]
}
```
