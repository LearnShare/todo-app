module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  ignorePatterns: [
    '**/*.test.js',
    '.eslintrc.js',
    'vite.config.ts',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'import',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
  },
};
