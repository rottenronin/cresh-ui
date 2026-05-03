import js from "@eslint/js";
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from "@vue/eslint-config-typescript";
import { fixupPluginRules } from "@eslint/compat";
import pluginVue from "eslint-plugin-vue";
import pluginImport from "eslint-plugin-import-x";
import storybook from "eslint-plugin-storybook";
import globals from "globals";

export default defineConfigWithVueTs(
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  vueTsConfigs.recommended,
  ...storybook.configs["flat/recommended"],
  {
    plugins: {
      import: fixupPluginRules(pluginImport),
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      "no-console": "warn",
      "no-debugger": "warn",
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-types": "off",
    },
  },
  {
    files: ["scripts/**/*.cjs", "scripts/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["**/*.stories.ts", "**/*.stories.js"],
    rules: {
      "storybook/no-renderer-packages": "off",
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", "*.d.ts", "public/**"],
  },
);
