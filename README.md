# CDK Alchemy

## Introduction

Modular Implementation of various components, which interact with Alchemy Web3 Platform
and AWS Cloud.
Allowing you to use Alchemy Platform in the cloud and simultaneously simplifies provisioning of
AWS Resources in the cloud.

## Project Structure

```
.
|-- cdk-alchemy-webhooks       // Implementation of Alchemy Webhooks Module
|-- cdk-alchemy-webhooks-skill // Claude Code skill for scaffolding webhook constructs
|-- docs                       // Documentation App
`-- examples                   // Implementation of examples with CDK
```

## Usage

### Alchemy Webhooks
```bash
npm install @kovi-soft/cdk-alchemy-webhooks
```

### Claude Code Skill
```bash
npx skills add https://github.com/KovacZan/cdk-alchemy/tree/master/packages/cdk-alchemy-webhooks-skill
```

*Check the Documentation for more details*

## Install and Run - For Further Development

Run the initial setup then move to dedicated package for the module you want to work in

### 1. Clone
```bash
git clone https://github.com/KovacZan/cdk-alchemy
```
### 2. Install
```bash
pnpm install
```
### 3. Move to Desired Module
```bash
cd packages/<module>
```

## Licence

Alchemy CDK is [MIT licensed](LICENSE.md).
