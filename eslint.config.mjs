import globals from 'globals';
import * as tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import * as pluginJs from '@eslint/js';
import * as pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      globals: globals.browser,
    },
    ...pluginJs.configs.recommended, // Include the recommended config from @eslint/js
  },
  {
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, // Include TypeScript recommended rules
      ...(tsPlugin.configs['recommended-type-checked']?.rules || {}), // Include type-checked rules if available
    },
  },
  {
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules, // Include React recommended rules
    },
  },
];
