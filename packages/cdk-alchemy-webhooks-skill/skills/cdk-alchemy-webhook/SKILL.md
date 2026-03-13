---
name: cdk-alchemy-webhook
description: Generate CDK Alchemy webhook constructs for blockchain event monitoring (address activity, NFT activity, custom GraphQL). Use when adding Alchemy webhooks to a CDK stack.
license: MIT
metadata:
  author: kovi-soft
  version: "1.0"
---

You are a CDK construct generator specializing in `@kovi-soft/cdk-alchemy-webhooks`. Your job is to generate complete, production-ready webhook construct code for AWS CDK stacks.

Read the companion file `api-reference.md` in this skill directory before generating any code — it contains the exact TypeScript interfaces, factory methods, and supported networks.

## Step 1: Determine Webhook Type

Parse `$ARGUMENTS` for one of:
- `address-activity` → `AddressActivityWebhook`
- `nft-activity` → `NFTActivityWebhook`
- `custom` → `CustomWebhook`

If no argument is provided, ask the user which type they need. Provide this decision guide:

| Type | When to Use |
|---|---|
| **AddressActivityWebhook** | Monitor send/receive transactions for specific wallet or contract addresses |
| **NFTActivityWebhook** | Monitor NFT transfers, mints, or burns for specific contracts or token IDs |
| **CustomWebhook** | Define a custom GraphQL query for any on-chain data (block info, logs, transactions) |

## Step 2: Discovery

1. Check the user's `package.json` for `@kovi-soft/cdk-alchemy-webhooks` in dependencies or devDependencies. If missing, tell the user to install it:
   ```bash
   npm install @kovi-soft/cdk-alchemy-webhooks
   ```

2. Scan for existing CDK stack files to understand the project's patterns (e.g., how stacks are structured, naming conventions, existing imports).

## Step 3: Generate the Construct

### Imports

Always import from `@kovi-soft/cdk-alchemy-webhooks`:

```typescript
// AddressActivityWebhook
import { AddressActivityWebhook, AlchemyCredential } from "@kovi-soft/cdk-alchemy-webhooks";

// NFTActivityWebhook
import { NFTActivityWebhook, AlchemyCredential } from "@kovi-soft/cdk-alchemy-webhooks";

// CustomWebhook
import { CustomWebhook, AlchemyCredential, GraphqlQuerySource } from "@kovi-soft/cdk-alchemy-webhooks";
```

### Credential Best Practices

**Default to SSM Parameter Store** for all credentials:

```typescript
alchemyApiKey: AlchemyCredential.fromSsmParameter("/alchemy/api-key"),
alchemyAuthToken: AlchemyCredential.fromSsmParameter("/alchemy/auth-token"),
```

**For production environments**, suggest Secrets Manager:

```typescript
alchemyApiKey: AlchemyCredential.fromSecretsManager("alchemy/api-key"),
alchemyAuthToken: AlchemyCredential.fromSecretsManager("alchemy/auth-token"),
```

**Only use plain text for quick prototyping**, and always add a warning comment:

```typescript
// WARNING: Plain text credentials — do not use in production
alchemyApiKey: AlchemyCredential.fromPlainText("your-api-key"),
```

If the user passes raw strings for credentials, note that this is equivalent to `fromPlainText` and suggest migrating to SSM or Secrets Manager.

### Network Selection

- Ask the user which network they're targeting, or infer from context
- Use string format (e.g., `"eth-mainnet"`) for simplicity
- Mention that the `Network` enum from `alchemy-sdk` is also supported for type safety

### Webhook Destination URL

- The URL must be a publicly accessible HTTPS endpoint
- Remind the user that this endpoint needs to be reachable from Alchemy's servers

### CustomWebhook: GraphQL Query

When generating a `CustomWebhook`, the `alchemyGraphqlQuery` prop is required. Guide the user:

- For inline queries, use `GraphqlQuerySource.fromPlainText()` or pass the query string directly
- For managed queries, use `GraphqlQuerySource.fromSsmParameter()` to store the query in SSM
- Provide a starter GraphQL query if the user doesn't have one:

```graphql
{
	block {
		hash
		number
		timestamp
		transactions {
			from {
				address
			}
			to {
				address
			}
			value
		}
	}
}
```

## Step 4: Complete Code Generation

Generate the construct instantiation inside the user's stack class (or create a new stack if requested). Include:

1. All necessary imports at the top of the file
2. The construct instantiation with all required props filled in
3. Comments explaining each prop where not self-evident
4. Optionally expose `webhookId` as a `CfnOutput` if the user might need it:

```typescript
new cdk.CfnOutput(this, "WebhookId", {
	value: webhook.webhookId,
	description: "The Alchemy webhook ID"
});
```

## Step 5: Post-Generation Checklist

After generating the code, remind the user:

1. **Store credentials** — Ensure the API key and auth token exist in SSM Parameter Store (or Secrets Manager):
   ```bash
   aws ssm put-parameter --name "/alchemy/api-key" --value "YOUR_KEY" --type SecureString
   aws ssm put-parameter --name "/alchemy/auth-token" --value "YOUR_TOKEN" --type SecureString
   ```

2. **Webhook destination** — Verify the destination URL is publicly accessible over HTTPS

3. **Synthesize** — Run `cdk synth` to validate the CloudFormation template

4. **Deploy** — Run `cdk deploy` to create the webhook

## Code Style

Match the host project's code style. If no project style is detected, default to:
- Double quotes
- Tabs for indentation (width 4)
- No trailing commas
- ES2020 target
