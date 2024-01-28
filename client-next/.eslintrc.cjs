module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
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
    'react-refresh',
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-closing-bracket-location': ['error', 'after-props'],
    'react/jsx-closing-tag-location': 'off',
    'react/jsx-indent-props': ['error', 4],
    'react/jsx-curly-spacing': [
      'error',
      {
        'when': 'always',
      },
    ],
    'template-curly-spacing': [
      'error',
      'always',
    ],
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-restricted-syntax': 'off',
    'react/jsx-one-expression-per-line': 'off',
  },
}
