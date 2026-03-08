import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			quotes: ["error", "double", { avoidEscape: true }],
			"@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }]
		}
	},
	{
		ignores: ["lib/", "cdk.out/", "node_modules/", "**/*.js", "**/*.d.ts"]
	}
);
