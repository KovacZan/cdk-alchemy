import { Construct } from "constructs";
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Duration } from "aws-cdk-lib";
import { BigNumber, Network } from "alchemy-sdk";
import { PolicyStatement } from "aws-cdk-lib/aws-iam";
import { StringParameter } from "aws-cdk-lib/aws-ssm";
import { v4 as uuid } from "uuid";
import { Runtime } from "aws-cdk-lib/aws-lambda";

export interface NFTActivityProps {
	alchemyApiKey: string;
	alchemyNetwork: Network | string;
	alchemyAuthToken: string;
	alchemyWebhookDestinationUrl: string;
	alchemyContractAddress?: string;
	alchemyTokenId?: string | number | BigNumber;

	ssmPathToRandomId?: string;
}

export class NFTActivityConstruct extends Construct {
	public readonly description = "Construct for NFT Activity Alchemy Notify/Webhook Functionality";
	public readonly functionDuration = Duration.minutes(15);

	public readonly func: NodejsFunction;

	public ssmPathToRandomId = "/cdk-alchemy-webhooks/nft-activity/secret";
	public secretIdSSM: StringParameter;
	constructor(scope: Construct, id: string, private readonly props: NFTActivityProps) {
		super(scope, id);

		if (this.props.ssmPathToRandomId) {
			this.ssmPathToRandomId = this.props.ssmPathToRandomId;
		}

		this.secretIdSSM = new StringParameter(this, "RandomIdStringParameter", {
			stringValue: `${this.ssmPathToRandomId}/${uuid()}`,
			parameterName: this.ssmPathToRandomId
		});

		this.func = new NodejsFunction(this, "NFTActivityLambda", {
			entry: path.resolve(__dirname, "NFTActivity.lambda.js"),
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
				ALCHEMY_API_KEY: this.props.alchemyApiKey,
				ALCHEMY_NETWORK: this.props.alchemyNetwork,
				ALCHEMY_AUTH_TOKEN: this.props.alchemyAuthToken,
				ALCHEMY_WEBHOOK_DESTINATION_URL: this.props.alchemyWebhookDestinationUrl,
				ALCHEMY_CONTRACT_ADDRESS: this.props.alchemyContractAddress!, // TODO: adjust
				ALCHEMY_TOKEN_ID: this.props.alchemyTokenId!.toString(), // TODO: adjust

				SSM_PATH_TO_SECRET: this.secretIdSSM.parameterName
			}
		});
	}
}
