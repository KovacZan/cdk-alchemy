import { APIGatewayProxyHandler } from "aws-lambda";
import axios from "axios";
import * as mustache from "mustache";
import { getSSMParameterByName } from "../ssm-utils";
import { isValidAlchemySignature } from "../alchemy-utils";

const handler: APIGatewayProxyHandler = async request => {
	const ssmPath = process.env.SSM_PATH;

	const signingKey = process.env.ALCHEMY_SIGNING_KEY;

	const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;
	const discordWebhookUsername = process.env.DISCORD_WEBHOOK_USERNAME;

	if (
		!ssmPath ||
		!request.body ||
		!request.headers["X-Alchemy-Signature"] ||
		!signingKey ||
		!discordWebhookUrl ||
		!discordWebhookUsername ||
		!isValidAlchemySignature(request.body, request.headers["X-Alchemy-Signature"], signingKey)
	) {
		return {
			statusCode: 404,
			body: ""
		};
	}

	const template = await getSSMParameterByName(ssmPath);

	const output = mustache.render(template, { ...JSON.parse(request.body) }, {}, ["<%", "%>"]);

	await axios.post(discordWebhookUrl, {
		username: discordWebhookUsername,
		content: output
	});
	return {
		statusCode: 200,
		body: ""
	};
};

export { handler };
