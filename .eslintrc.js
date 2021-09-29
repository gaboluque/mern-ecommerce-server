module.exports = {
    env: {
      es6: true,
      node: true,
      jest: true,
    },
    parser: '@typescript-eslint/parser',
    extends: [
      'airbnb-base',
      'prettier',
      'plugin:prettier/recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts'],
        },
      },
    },
    rules: {
    },
  };
  