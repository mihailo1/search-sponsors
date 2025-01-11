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
    rules: {
      ...pluginJs.configs.recommended.rules, // Use the recommended rules from @eslint/js
    },
  },
  {
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, // Include TypeScript rules
      ...tsPlugin.configs['recommended-type-checked'].rules, // If available, include type-checked rules
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
      ...pluginReact.configs.recommended.rules, // Include React rules
    },
  },
];
