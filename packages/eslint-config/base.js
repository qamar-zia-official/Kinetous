import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

/** Base flat config for internal TS packages (no framework assumptions). */
export default tseslint.config(
    {
        ignores: ["dist/**", "node_modules/**", ".turbo/**"],
    },
    js.configs.recommended,
    tseslint.configs.recommended,
    {
        languageOptions: {
            globals: { ...globals.node },
        },
        rules: {
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
            ],
        },
    },
);
