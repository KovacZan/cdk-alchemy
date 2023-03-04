# CDK Alchemy

## Introduction

Modular Implementation of various components, which interact with Alchemy Web3 Platform
and AWS Cloud.
Allowing you to use Alchemy Platform in the cloud and simultaneously simplifies provisioning of
AWS Resources in the cloud.

## Project Structure

```
.
|-- cdk-alchemy-integrator // Impplementation of Alchemy Integrator Module
|-- cdk-alchemy-webhooks //Impplementation of Alchemy Webhooks Module
|-- docs // Documentation App
`-- examples // Implementaion of examples with CDK
```

## Usage

### For usage of Alchemy Webhooks
```bash
npm install @kovi-soft/cdk-alchemy-webhooks
```
*Check the Documentation for more details*

### For usage of Alchemy Integrator
```bash
npm install @kovi-soft/cdk-alchemy-integrator
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
