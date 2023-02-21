#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { NFTActivityStack } from "../lib/Initializers/NFTActivityStack";
import { AddressActivityStack } from "../lib/Initializers/AddressActivityStack";
import { DroppedTransactionsStack } from "../lib/Initializers/DroppedTransactionsStack";

import * as dotenv from "dotenv";

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

new DroppedTransactionsStack(app, "DroppedTransactionsStack", {
	env: {
		account: process.env.CDK_DEFAULT_ACCOUNT,
		region: process.env.CDK_DEFAULT_REGION
	},
	alchemyApiKey: process.env.ALCHEMY_API_KEY!,
	alchemyAuthToken: process.env.ALCHEMY_AUTH_TOKEN!,
	alchemyAppId: process.env.ALCHEMY_APP_ID!
});
