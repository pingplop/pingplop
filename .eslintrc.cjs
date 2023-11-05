/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  ignorePatterns: ['/*', '/web/components/icons', '!/web', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  // parserOptions: {
  //   ecmaVersion: "latest",
  //   sourceType: "module",
  //   project: ["./tsconfig.json", "./tsconfig.node.json"],
  //   tsconfigRootDir: __dirname,
  // },
  plugins: ['react-refresh', '@typescript-eslint', 'simple-import-sort'],
  settings: {
    react: {
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
    },
  },
  rules: {
    'react-refresh/only-export-components': [
      'off',
      {
        allowConstantExport: true,
      },
    ],
    'react/jsx-key': 'off',
    'import/no-anonymous-default-export': 'off',
    'no-console': [
      'warn',
      {
        allow: ['error', 'info', 'warn'],
      },
    ],
    '@next/next/no-img-element': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // These packages come first.
          ['dotenv(/.*|$)', 'node(?!:?$)'],
          // Packages `react` and `nextjs` related.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(@|components)(/.*|$)'],
          ['^(@)(/.*|$)'],
          // Side effect imports.
          ['^\\u0000'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports.
          ['^.+\\.?(css)$'],
        ],
      },
    ],
  },
  globals: {
    React: true,
    JSX: true,
  },
}
