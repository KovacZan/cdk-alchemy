import { SSM } from "@aws-sdk/client-ssm";
export async function getSSMParameterByName(name: string) {
	const param = await new SSM({}).getParameter({
		Name: name
	});
	if (!param.Parameter?.Value) {
		throw new Error(`Can not resolve Parameter name from SSM parameter with name: ${name}`);
	}
	return param.Parameter.Value as string;
}
