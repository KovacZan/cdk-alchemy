# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CDK Alchemy is a TypeScript monorepo providing AWS CDK v2 constructs for integrating with the Alchemy Web3 Platform.

## Commands

**Package manager:** pnpm (workspace monorepo)

All commands run from within individual `packages/*` directories:

```bash
pnpm build          # TypeScript compilation (tsc)
pnpm test           # Jest tests
pnpm lint           # ESLint
pnpm format         # Prettier
```

Docs (`packages/docs`):
```bash
pnpm start          # Docusaurus dev server
pnpm build          # Production build
pnpm typecheck      # tsc type checking
```

## Architecture

### Monorepo Structure

- `packages/cdk-alchemy-webhooks/` — CDK constructs for Alchemy webhook lifecycle
- `packages/examples/` — Example CDK stacks
- `packages/docs/` — Docusaurus documentation site

### Construct Pattern

Three webhook types: `AddressActivityWebhook`, `NFTActivityWebhook`, `CustomWebhook` (GraphQL-based). Each extends CDK `Construct` with a corresponding `{Type}.lambda.ts` handler file. Constructs are located in `lib/registers/{Type}/` subdirectories.

**Registers** (CustomResource handlers): Lambda functions that call Alchemy SDK to create/update/delete webhooks as part of the CDK lifecycle. Credentials are configurable via `AlchemyCredential` class — supports plain text, SSM Parameter Store, or Secrets Manager.

### Shared Utilities

- `alchemy-utils.ts` — Alchemy SDK init, network validation
- `credential.ts` — `AlchemyCredential` class, credential config resolution, IAM grant helpers
- `credential-resolver.ts` — Runtime credential resolution from SSM, Secrets Manager, or plain text
- `utils.ts` — URL validation

### Lambda Handler Convention

Entry points use `NodejsFunction` with `entry: path.resolve(__dirname, "*.lambda.js")`. Handlers export `{ handler }` with `CdkCustomResourceEvent` → `CdkCustomResourceResponse` signature, managing webhook create/update/delete lifecycle. Lambda runtime is NODEJS_22_X with 15-minute timeout. AWS SDK modules (`@aws-sdk/*`) are externalized. Environment variables configure each Lambda at deploy time.

### Publishing

- Published package: `@kovi-soft/cdk-alchemy-webhooks`
- CI/CD: Manual GitHub Actions workflow for npm publishing

## Code Style

- **Double quotes** (enforced by ESLint)
- **Tabs** for indentation, width 4
- **No trailing commas**
- **120 char line width**
- Target: ES2020, module: CommonJS, strict mode enabled
