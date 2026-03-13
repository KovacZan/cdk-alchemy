# @kovi-soft/cdk-alchemy-webhooks-skill

A [Claude Code](https://claude.ai/code) skill for scaffolding [@kovi-soft/cdk-alchemy-webhooks](https://www.npmjs.com/package/@kovi-soft/cdk-alchemy-webhooks) CDK constructs.

## Installation

```bash
npx skills add https://github.com/KovacZan/cdk-alchemy/tree/master/packages/cdk-alchemy-webhooks-skill  
```

## Usage

Once installed, invoke the skill in Claude Code:

```
/cdk-alchemy-webhook address-activity
/cdk-alchemy-webhook nft-activity
/cdk-alchemy-webhook custom
```

Or invoke without arguments to be guided through webhook type selection:

```
/cdk-alchemy-webhook
```

## Webhook Types

| Type | Use Case |
|---|---|
| **AddressActivityWebhook** | Monitor send/receive transactions for specific addresses |
| **NFTActivityWebhook** | Monitor NFT transfer activity for contracts/tokens |
| **CustomWebhook** | GraphQL-based custom queries for any on-chain data |

## Documentation

Full package documentation: [cdk-alchemy-webhooks docs](https://kovaczan.github.io/cdk-alchemy/)
