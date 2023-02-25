import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

import { DiscordPosterConstruct } from "@kovi-soft/cdk-alchemy-integrator";

interface DiscordIntegratorStackProps extends cdk.StackProps {
	alchemySigningKey: string;
	discordWebhookUrl: string;
}

export class DiscordIntegratorStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: DiscordIntegratorStackProps) {
		super(scope, id, props);

		const discordPoster = new DiscordPosterConstruct(this, "DiscordPosterExample", {
			alchemySigningKey: props.alchemySigningKey,
			discordWebhookUsername: "Crazy Alchy Bot",
			discordWebhookUrl: props.discordWebhookUrl,
			discordMustacheTemplate:
				"Created At: <% createdAt %>\nFrom: <% event.activity.0.fromAddress %>\nAsset: <% event.activity.0.asset %>\nValue: <% event.activity.0.value %>"
		});

		const api = new RestApi(this, "DiscordTestRestApi");

		api.root.resourceForPath("/test-discord").addMethod("POST", new LambdaIntegration(discordPoster.func));
	}
}
