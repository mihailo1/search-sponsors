const { resolve } = require('node:path');
const babelParser = require('@babel/eslint-parser');
const globals = require('globals');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = [
  {
    ignores: ['.*.js', 'node_modules/', 'dist/'],
  },
  {
    files: ['*.js?(x)', '*.ts?(x)'],
    plugins: {
      // 'only-warn': require('eslint-plugin-only-warn'),
    },
    languageOptions: {
      parser: babelParser,
      sourceType: 'module',
      globals: {
        React: true,
        JSX: true,
        ...globals.node,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          project,
        },
      },
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: 'warn',
    },
    rules: {
      // Add your rules here
    },
  },
];
