---
sidebar_position: 6
---

# Claude Code Skill

CDK Alchemy Webhooks provides a [Claude Code](https://claude.ai/code) skill that scaffolds webhook constructs interactively. Instead of writing boilerplate manually, the skill guides you through credential setup, network selection, and generates production-ready CDK construct code.

## Installation

```bash
npx skills add https://github.com/KovacZan/cdk-alchemy/tree/master/packages/cdk-alchemy-webhooks-skill
```

## Usage

Once installed, invoke the skill in Claude Code with a specific webhook type:

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

## What It Does

The skill walks you through the full setup process:

1. **Webhook type selection** — choose from Address Activity, NFT Activity, or Custom Webhook
2. **Credential configuration** — set up your Alchemy API key and auth token (plain text, SSM Parameter Store, or Secrets Manager)
3. **Network selection** — pick the blockchain network to monitor
4. **Code generation** — produces a ready-to-deploy CDK construct with all configuration in place
