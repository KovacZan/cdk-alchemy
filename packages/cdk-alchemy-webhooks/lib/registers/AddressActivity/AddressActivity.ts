import { Construct } from "constructs";
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { CustomResource, Duration } from "aws-cdk-lib";
import { Network } from "alchemy-sdk";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Provider } from "aws-cdk-lib/custom-resources";
import {
	IAlchemyCredential,
	resolveCredentialConfig,
	configureCredentialEnv,
	grantCredentialRead
} from "../../credential";

export interface AddressActivityProps {
	alchemyApiKey: string | IAlchemyCredential;
	alchemyNetwork: Network | string;
	alchemyAuthToken: string | IAlchemyCredential;
	alchemyWebhookDestinationUrl: string;
	alchemyContractAddress?: string;
	alchemyWebhookName?: string;
}

export class AddressActivityWebhook extends Construct {
	public readonly webhookId: string;

	constructor(scope: Construct, id: string, props: AddressActivityProps) {
		super(scope, id);

		const apiKeyCred = resolveCredentialConfig(props.alchemyApiKey);
		const authTokenCred = resolveCredentialConfig(props.alchemyAuthToken);

		const handler = new NodejsFunction(this, "AddressActivityHandler", {
			entry: path.resolve(__dirname, "AddressActivity.lambda.js"),
			description: "Custom Resource handler for Address Activity Alchemy Webhook",
			timeout: Duration.minutes(15),
			runtime: Runtime.NODEJS_22_X,
			environment: {
				...configureCredentialEnv("ALCHEMY_API_KEY", apiKeyCred),
				...configureCredentialEnv("ALCHEMY_AUTH_TOKEN", authTokenCred)
			},
			bundling: {
				externalModules: ["@aws-sdk/*"]
			}
		});

		grantCredentialRead(handler, apiKeyCred);
		grantCredentialRead(handler, authTokenCred);

		const provider = new Provider(this, "AddressActivityProvider", {
			onEventHandler: handler
		});

		const resource = new CustomResource(this, "AddressActivityResource", {
			serviceToken: provider.serviceToken,
			properties: {
				network: props.alchemyNetwork,
				destinationUrl: props.alchemyWebhookDestinationUrl,
				contractAddress: props.alchemyContractAddress || "",
				webhookName: props.alchemyWebhookName || ""
			}
		});

		this.webhookId = resource.getAttString("WebhookId");
	}
}
