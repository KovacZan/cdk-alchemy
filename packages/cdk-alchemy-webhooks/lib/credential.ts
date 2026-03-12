import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { PolicyStatement, Effect } from "aws-cdk-lib/aws-iam";
import { Stack } from "aws-cdk-lib";

export enum CredentialSourceType {
	PLAIN = "plain",
	SSM = "ssm",
	SECRETS_MANAGER = "secretsmanager"
}

export interface IAlchemyCredential {
	readonly sourceType: CredentialSourceType;
	readonly value: string;
}

export class AlchemyCredential implements IAlchemyCredential {
	public readonly sourceType: CredentialSourceType;
	public readonly value: string;

	private constructor(sourceType: CredentialSourceType, value: string) {
		this.sourceType = sourceType;
		this.value = value;
	}

	static fromPlainText(value: string): AlchemyCredential {
		return new AlchemyCredential(CredentialSourceType.PLAIN, value);
	}

	static fromSsmParameter(parameterName: string): AlchemyCredential {
		return new AlchemyCredential(CredentialSourceType.SSM, parameterName);
	}

	static fromSecretsManager(secretId: string): AlchemyCredential {
		return new AlchemyCredential(CredentialSourceType.SECRETS_MANAGER, secretId);
	}
}

export function resolveCredentialConfig(prop: string | IAlchemyCredential): IAlchemyCredential {
	if (typeof prop === "string") {
		return { sourceType: CredentialSourceType.PLAIN, value: prop };
	}
	return prop;
}

export function configureCredentialEnv(prefix: string, cred: IAlchemyCredential): Record<string, string> {
	return {
		[`${prefix}_SOURCE`]: cred.sourceType,
		[`${prefix}_VALUE`]: cred.value
	};
}

export function grantCredentialRead(fn: NodejsFunction, cred: IAlchemyCredential): void {
	if (cred.sourceType === CredentialSourceType.SSM) {
		const paramArn = cred.value.startsWith("arn:")
			? cred.value
			: Stack.of(fn).formatArn({
				service: "ssm",
				resource: "parameter",
				resourceName: cred.value.startsWith("/") ? cred.value.slice(1) : cred.value
			});

		fn.addToRolePolicy(
			new PolicyStatement({
				effect: Effect.ALLOW,
				actions: ["ssm:GetParameter"],
				resources: [paramArn]
			})
		);
	} else if (cred.sourceType === CredentialSourceType.SECRETS_MANAGER) {
		const secretArn = cred.value.startsWith("arn:")
			? cred.value
			: Stack.of(fn).formatArn({
				service: "secretsmanager",
				resource: "secret",
				resourceName: `${cred.value}-??????`
			});

		fn.addToRolePolicy(
			new PolicyStatement({
				effect: Effect.ALLOW,
				actions: ["secretsmanager:GetSecretValue"],
				resources: [secretArn]
			})
		);
	}
}
