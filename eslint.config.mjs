import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import unusedImports from "eslint-plugin-unused-imports";
import preferArrow from "eslint-plugin-prefer-arrow";
import tsParser from "@typescript-eslint/parser";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  ...fixupConfigRules(
    compat.extends(
      "next/core-web-vitals",
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:@typescript-eslint/stylistic-type-checked",
      "plugin:import/recommended",
      "plugin:prettier/recommended",
    ),
  ),
  {
    plugins: {
      "@typescript-eslint": fixupPluginRules(typescriptEslint),
      "unused-imports": unusedImports,
      "prefer-arrow": preferArrow,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: true,
      },
    },

    rules: {
      "@typescript-eslint/only-throw-error": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",

      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],

      "@typescript-eslint/require-await": "off",

      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],

      "unused-imports/no-unused-imports": "error",
      "import/namespace": "off",

      "import/order": [
        "error",
        {
          pathGroups: [
            {
              pattern: "@/**",
              group: "parent",
            },
          ],

          "newlines-between": "always",
          warnOnUnassignedImports: true,
        },
      ],

      "prefer-arrow/prefer-arrow-functions": [
        "error",
        {
          disallowPrototype: true,
          singleReturnOnly: false,
          classPropertiesAllowed: false,
        },
      ],

      "prefer-arrow-callback": [
        "error",
        {
          allowNamedFunctions: true,
        },
      ],

      "func-style": [
        "error",
        "expression",
        {
          allowArrowFunctions: true,
        },
      ],
    },
  },
];

export default config;
