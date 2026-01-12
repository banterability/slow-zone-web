import path from "node:path";
import { fileURLToPath } from "node:url";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["api", "node_modules", "build", ".react-router"],
}, ...compat.extends("prettier"), {
    plugins: {
        import: importPlugin,
    },
    rules: {
        "import/order": ["error", {
            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },

            groups: ["builtin", "external", "internal", "parent", "sibling", "type"],
            "newlines-between": "always",
        }],
    },
}];