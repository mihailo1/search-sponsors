import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import * as pluginJs from '@eslint/js';
import * as tsPlugin from '@typescript-eslint/eslint-plugin';
import * as pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser, // TypeScript parser
      globals: globals.browser,
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // JavaScript recommended rules
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, // TypeScript recommended rules
    },
  },
  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
    },
    rules: {
      ...pluginReact.configs.recommended.rules, // React recommended rules
    },
  },
];
