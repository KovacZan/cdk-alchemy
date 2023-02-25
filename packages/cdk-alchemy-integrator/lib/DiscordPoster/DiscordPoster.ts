import { Construct } from "constructs";
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Duration } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

export interface DiscordPosterProps {
	alchemySigningKey: string;
	discordWebhookUsername: string;
	discordWebhookUrl: string;

	discordMustacheTemplate: string;
	ssmPath?: string;
}

export class DiscordPosterConstruct extends Construct {
	public readonly description = "Construct for Discord Posting via Webhook";
	public readonly functionDuration = Duration.minutes(15);

	public readonly func: NodejsFunction;

	public ssmPath = "/cdk-alchemy-integrator/discord/ssm-path";
	public ssm: StringParameter;
	constructor(scope: Construct, id: string, private readonly props: DiscordPosterProps) {
		super(scope, id);

		if (this.props.ssmPath) {
			this.ssmPath = this.props.ssmPath;
		}

		this.ssm = new StringParameter(this, "SSMMustacheTemplate", {
			stringValue: this.props.discordMustacheTemplate,
			parameterName: this.ssmPath
		});

		this.func = new NodejsFunction(this, "DiscordPosterLambda", {
			entry: path.resolve(__dirname, "DiscordPoster.lambda.js"),
			description: this.description,
			timeout: this.functionDuration,
			runtime: Runtime.NODEJS_18_X,
			initialPolicy: [
				new PolicyStatement({
					actions: ["ssm:GetParameter*"],
					resources: ["*"] // TODO
				})
			],
			environment: {
				SSM_PATH: this.ssmPath,
				ALCHEMY_SIGNING_KEY: this.props.alchemySigningKey,
				DISCORD_WEBHOOK_USERNAME: this.props.discordWebhookUsername,
				DISCORD_WEBHOOK_URL: this.props.discordWebhookUrl
			}
		});
	}
}
