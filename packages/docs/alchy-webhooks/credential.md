---
sidebar_position: 3
---

# Credentials

`AlchemyCredential` provides a flexible way to supply your Alchemy API key and auth token to webhook constructs. Instead of passing plain text secrets directly, you can reference credentials stored in AWS SSM Parameter Store or AWS Secrets Manager.

## IAlchemyCredential Interface

All credential sources implement the `IAlchemyCredential` interface:

```typescript
interface IAlchemyCredential {
	readonly sourceType: CredentialSourceType;
	readonly value: string;
}
```

## Factory Methods

### Plain Text

Pass credentials directly as plain text. Suitable for development or when values come from CDK context or environment variables.

```typescript
import { AlchemyCredential } from "@kovi-soft/cdk-alchemy-webhooks";

const apiKey = AlchemyCredential.fromPlainText("your-api-key");
```

### SSM Parameter Store

Reference a credential stored in AWS Systems Manager Parameter Store. The construct automatically grants the Lambda function `ssm:GetParameter` permissions on the specified parameter.

```typescript
const apiKey = AlchemyCredential.fromSsmParameter("/my-app/alchemy-api-key");
```

### Secrets Manager

Reference a credential stored in AWS Secrets Manager. The construct automatically grants the Lambda function `secretsmanager:GetSecretValue` permissions on the specified secret.

```typescript
const apiKey = AlchemyCredential.fromSecretsManager("my-app/alchemy-api-key");
```

## Usage with Constructs

All webhook constructs accept `string | IAlchemyCredential` for `alchemyApiKey` and `alchemyAuthToken` props. Passing a plain string is equivalent to using `AlchemyCredential.fromPlainText()`.

```typescript
import { AddressActivityWebhook, AlchemyCredential } from "@kovi-soft/cdk-alchemy-webhooks";

new AddressActivityWebhook(this, "AddressActivity", {
	alchemyApiKey: AlchemyCredential.fromSsmParameter("/prod/alchemy-api-key"),
	alchemyAuthToken: AlchemyCredential.fromSecretsManager("prod/alchemy-auth-token"),
	alchemyNetwork: "eth-mainnet",
	alchemyWebhookDestinationUrl: "https://my-domain.com/webhook"
});
```

## Automatic IAM Permissions

When using `fromSsmParameter()` or `fromSecretsManager()`, the construct automatically adds the necessary IAM policy to the Lambda function's execution role. No manual permission configuration is required.
