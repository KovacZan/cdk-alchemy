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

Each feature follows: `{Feature}Construct` class extending CDK `Construct`, with a corresponding `{Feature}.lambda.ts` handler file.

**Registers** (initializers): Lambda functions that call Alchemy SDK to create webhooks, storing credentials in AWS Secrets Manager.

**Queues** (event handlers): Lambda functions that process incoming webhook events, retrieving credentials from Secrets Manager.

### Shared Utilities

- `alchemy-utils.ts` — Alchemy SDK init, network validation, signature verification
- `ssm-utils.ts` — AWS SSM Parameter Store access
- `secrets-utils.ts` — AWS Secrets Manager operations

### Lambda Handler Convention

Entry points use `NodejsFunction` with `entry: path.resolve(__dirname, "*.lambda.js")`. Handlers export `{ handler }` with `APIGatewayProxyHandler` signature. Environment variables configure each Lambda at deploy time.

## Code Style

- **Double quotes** (enforced by ESLint)
- **Tabs** for indentation, width 4
- **No trailing commas**
- **120 char line width**
- Target: ES2020, module: CommonJS, strict mode enabled
