// eslint.config.ts
import js from "@eslint/js";
import globals from "globals";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json", // pour les règles de type strict
      },
      globals: globals.browser,
    },

    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tsPlugin,
    },

    extends: [
      js.configs.recommended,
      reactPlugin.configs.flat.recommended,
      tsPlugin.configs.recommended,
      "plugin:prettier/recommended",
    ],

    rules: {
      // --------------------------
      // React
      // --------------------------
      "react/react-in-jsx-scope": "off", // React 17+ n’a plus besoin d’import React
      "react/prop-types": "off", // TypeScript gère les props
      "react-refresh/only-export-components": "warn",

      // --------------------------
      // React Hooks
      // --------------------------
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // --------------------------
      // TypeScript strict rules
      // --------------------------
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/strict-boolean-expressions": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "warn",

      // --------------------------
      // Petites améliorations
      // --------------------------
      "no-console": "warn",
      "no-debugger": "warn",
      "prefer-const": "error",
      eqeqeq: ["error", "always"],
    },
  },
]);
