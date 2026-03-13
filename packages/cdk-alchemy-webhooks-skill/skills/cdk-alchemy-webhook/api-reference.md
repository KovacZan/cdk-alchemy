# @kovi-soft/cdk-alchemy-webhooks API Reference

## Peer Dependencies

- `aws-cdk-lib` ^2
- `constructs` ^10

## Constructs

### AddressActivityWebhook

Monitors address send/receive transactions.

```typescript
import { AddressActivityWebhook, AlchemyCredential } from "@kovi-soft/cdk-alchemy-webhooks";
```

#### AddressActivityProps

| Property | Type | Required | Description |
|---|---|---|---|
| `alchemyApiKey` | `string \| IAlchemyCredential` | Yes | Alchemy API key |
| `alchemyNetwork` | `Network \| string` | Yes | Target blockchain network |
| `alchemyAuthToken` | `string \| IAlchemyCredential` | Yes | Alchemy auth token |
| `alchemyWebhookDestinationUrl` | `string` | Yes | HTTPS endpoint to receive webhook events |
| `alchemyContractAddress` | `string` | No | Contract address to monitor |
| `alchemyWebhookName` | `string` | No | Display name for the webhook |

#### Output

- `webhookId: string` — The created webhook's ID

#### Example

```typescript
new AddressActivityWebhook(this, "MyWebhook", {
	alchemyApiKey: AlchemyCredential.fromSsmParameter("/alchemy/api-key"),
	alchemyNetwork: "eth-mainnet",
	alchemyAuthToken: AlchemyCredential.fromSsmParameter("/alchemy/auth-token"),
	alchemyWebhookDestinationUrl: "https://api.example.com/webhook",
	alchemyContractAddress: "0x026224A2940bFE258D0dbE947919B62fE321F042",
	alchemyWebhookName: "MyAddressActivityWebhook"
});
```

---

### NFTActivityWebhook

Monitors NFT transfer activity.

```typescript
import { NFTActivityWebhook, AlchemyCredential } from "@kovi-soft/cdk-alchemy-webhooks";
```

#### NFTActivityProps

| Property | Type | Required | Description |
|---|---|---|---|
| `alchemyApiKey` | `string \| IAlchemyCredential` | Yes | Alchemy API key |
| `alchemyNetwork` | `Network \| string` | Yes | Target blockchain network |
| `alchemyAuthToken` | `string \| IAlchemyCredential` | Yes | Alchemy auth token |
| `alchemyWebhookDestinationUrl` | `string` | Yes | HTTPS endpoint to receive webhook events |
| `alchemyContractAddress` | `string` | No | NFT contract address to monitor |
| `alchemyTokenId` | `string \| number \| BigNumber` | No | Specific token ID to monitor |
| `alchemyWebhookName` | `string` | No | Display name for the webhook |

#### Output

- `webhookId: string` — The created webhook's ID

#### Example

```typescript
new NFTActivityWebhook(this, "MyNFTWebhook", {
	alchemyApiKey: AlchemyCredential.fromSsmParameter("/alchemy/api-key"),
	alchemyNetwork: "eth-mainnet",
	alchemyAuthToken: AlchemyCredential.fromSsmParameter("/alchemy/auth-token"),
	alchemyWebhookDestinationUrl: "https://api.example.com/nft-webhook",
	alchemyContractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
	alchemyTokenId: "1234",
	alchemyWebhookName: "MyNFTActivityWebhook"
});
```

---

### CustomWebhook

GraphQL-based custom queries for any on-chain data.

```typescript
import { CustomWebhook, AlchemyCredential, GraphqlQuerySource } from "@kovi-soft/cdk-alchemy-webhooks";
```

#### CustomWebhookProps

| Property | Type | Required | Description |
|---|---|---|---|
| `alchemyApiKey` | `string \| IAlchemyCredential` | Yes | Alchemy API key |
| `alchemyNetwork` | `Network \| string` | Yes | Target blockchain network |
| `alchemyAuthToken` | `string \| IAlchemyCredential` | Yes | Alchemy auth token |
| `alchemyWebhookDestinationUrl` | `string` | Yes | HTTPS endpoint to receive webhook events |
| `alchemyGraphqlQuery` | `string \| IGraphqlQuerySource` | Yes | GraphQL query defining what data to receive |
| `alchemyWebhookName` | `string` | No | Display name for the webhook |

#### Output

- `webhookId: string` — The created webhook's ID

#### Example

```typescript
new CustomWebhook(this, "MyCustomWebhook", {
	alchemyApiKey: AlchemyCredential.fromSsmParameter("/alchemy/api-key"),
	alchemyNetwork: "eth-mainnet",
	alchemyAuthToken: AlchemyCredential.fromSsmParameter("/alchemy/auth-token"),
	alchemyWebhookDestinationUrl: "https://api.example.com/custom-webhook",
	alchemyWebhookName: "MyCustomWebhook",
	alchemyGraphqlQuery: GraphqlQuerySource.fromSsmParameter("/alchemy/graphql-query")
});
```

---

## AlchemyCredential

Configures how credentials (API key, auth token) are resolved at deploy time.

```typescript
import { AlchemyCredential } from "@kovi-soft/cdk-alchemy-webhooks";
```

| Method | Description |
|---|---|
| `AlchemyCredential.fromPlainText(value: string)` | Inline plain-text value. **Not recommended for production.** |
| `AlchemyCredential.fromSsmParameter(parameterName: string)` | Read from AWS SSM Parameter Store at runtime. **Recommended default.** |
| `AlchemyCredential.fromSecretsManager(secretId: string)` | Read from AWS Secrets Manager at runtime. **Best for production.** |

Credentials can also be passed as raw `string` values (equivalent to `fromPlainText`).

---

## GraphqlQuerySource

Configures how the GraphQL query is resolved for `CustomWebhook`.

```typescript
import { GraphqlQuerySource } from "@kovi-soft/cdk-alchemy-webhooks";
```

| Method | Description |
|---|---|
| `GraphqlQuerySource.fromPlainText(query: string)` | Inline GraphQL query string |
| `GraphqlQuerySource.fromSsmParameter(parameterName: string)` | Read query from AWS SSM Parameter Store at runtime |

The query can also be passed as a raw `string` (equivalent to `fromPlainText`).

---

## Supported Networks

Common Alchemy-supported networks (pass as string):

- `eth-mainnet`, `eth-sepolia`, `eth-goerli`
- `opt-mainnet`, `opt-sepolia`
- `arb-mainnet`, `arb-sepolia`
- `base-mainnet`, `base-sepolia`
- `matic-mainnet`, `matic-amoy`
- `astar-mainnet`
- `polygonzkevm-mainnet`

You can also use the `Network` enum from `alchemy-sdk` for type safety.
