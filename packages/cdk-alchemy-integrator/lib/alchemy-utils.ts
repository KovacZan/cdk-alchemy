import * as crypto from "crypto";

export function isValidAlchemySignature(body: string, signature: string, signingKey: string): boolean {
	const hmac = crypto.createHmac("sha256", signingKey);
	hmac.update(body, "utf8");
	const digest = hmac.digest("hex");
	return signature === digest;
}
