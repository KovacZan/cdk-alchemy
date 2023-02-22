import { Construct } from "constructs";
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Duration } from "aws-cdk-lib";
import { Network } from "alchemy-sdk";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { v4 as uuid } from "uuid";

export interface DroppedTransactionsProps {
	alchemyApiKey: string;
	alchemyNetwork: Network | string;
	alchemyAuthToken: string;
	alchemyWebhookDestinationUrl: string;
	alchemyAppId: string;
	ssmPathToRandomId?: string;
}

export class DroppedTransactionsConstruct extends Construct {
	public readonly description =
		"Construct for Dropped Transactions Notifications Alchemy Notify/Webhook Functionality";
	public readonly functionDuration = Duration.minutes(15);

	public readonly func: NodejsFunction;
	public ssmPathToRandomId = "/cdk-alchemy-webhooks/dropped-transactions/secret";
	public secretIdSSM: StringParameter;
	constructor(scope: Construct, id: string, private readonly props: DroppedTransactionsProps) {
		super(scope, id);

		if (this.props.ssmPathToRandomId) {
			this.ssmPathToRandomId = this.props.ssmPathToRandomId;
		}

		this.secretIdSSM = new StringParameter(this, "RandomIdStringParameter", {
			stringValue: `${this.ssmPathToRandomId}/${uuid()}`,
			parameterName: this.ssmPathToRandomId
		});

		this.func = new NodejsFunction(this, "DroppedTransactionsLambda", {
			entry: path.resolve(__dirname, "DroppedTransactions.lambda.js"),
			description: this.description,
			timeout: this.functionDuration,
			runtime: Runtime.NODEJS_18_X,
			initialPolicy: [
				new PolicyStatement({
					actions: ["secretsmanager:CreateSecret"],
					resources: ["*"]
				}),
				new PolicyStatement({
					actions: ["ssm:GetParameter*"],
					resources: ["*"] // TODO
				})
			],
			environment: {
				ALCHEMY_APP_ID: this.props.alchemyAppId,
				ALCHEMY_API_KEY: this.props.alchemyApiKey,
				ALCHEMY_NETWORK: this.props.alchemyNetwork,
				ALCHEMY_AUTH_TOKEN: this.props.alchemyAuthToken,
				ALCHEMY_WEBHOOK_DESTINATION_URL: this.props.alchemyWebhookDestinationUrl,

				SSM_PATH_TO_SECRET: this.secretIdSSM.parameterName
			}
		});
	}
}
