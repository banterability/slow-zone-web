import js from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import-x";

export default [
  {
    ignores: [
      "api",
      "build/**",
      "node_modules/**",
      "public/build/**",
      ".react-router/**",
    ],
  },

  js.configs.recommended,

  eslintReact.configs["recommended-typescript"],

  ...tsPlugin.configs["flat/recommended"],

  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "import-x": importPlugin },
    settings: {
      "import-x/internal-regex": "^~/",
      "import-x/resolver": {
        node: { extensions: [".ts", ".tsx"] },
        typescript: { alwaysTryTypes: true },
      },
    },
    rules: {
      ...importPlugin.flatConfigs.recommended.rules,
      ...importPlugin.flatConfigs.typescript.rules,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },

  {
    files: ["scripts/**/*.js", "*.mjs"],
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
        fetch: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
      },
    },
  },

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { "import-x": importPlugin },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: {
      "import-x/resolver": { typescript: {} },
    },
    rules: {
      "import-x/order": [
        "error",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "type",
          ],
          "newlines-between": "always",
        },
      ],
    },
  },

  prettier,
];
