module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "airbnb-base",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
      },
    },
  },
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "prettier/prettier": ["error", { printWidth: 100 }],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"],
    "import/prefer-default-export": 0,
    "import/extensions": 0,
    "@typescript-eslint/ban-ts-comment": 0,
  },
};
