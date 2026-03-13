#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";

import { NFTActivityStack } from "../lib/Initializers/NFTActivityStack";
import { AddressActivityStack } from "../lib/Initializers/AddressActivityStack";
import { CustomWebhookStack } from "../lib/Initializers/CustomWebhookStack";

import * as dotenv from "dotenv";
import * as process from "process";

dotenv.config();

const app = new cdk.App();

new NFTActivityStack(app, "NFTActivityStack", {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION
	},
	alchemyApiKey: process.env.ALCHEMY_API_KEY!,
	alchemyAuthToken: process.env.ALCHEMY_AUTH_TOKEN!
});

new AddressActivityStack(app, "AddressActivityStack", {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION
	},
	alchemyApiKey: process.env.ALCHEMY_API_KEY!,
	alchemyAuthToken: process.env.ALCHEMY_AUTH_TOKEN!
});

new CustomWebhookStack(app, "CustomWebhookStack", {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION
	},
	alchemyApiKey: process.env.ALCHEMY_API_KEY!,
	alchemyAuthToken: process.env.ALCHEMY_AUTH_TOKEN!
});
