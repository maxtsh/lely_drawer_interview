module.exports = {
  root: true,
  env: { browser: true, es2022: true },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/recommended",
    "plugin:testing-library/react",
    "prettier",
  ],
  ignorePatterns: ["node_modules", "coverage", "dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
  },
  plugins: [
    "react-refresh",
    "@typescript-eslint",
    "@typescript-eslint/eslint-plugin",
    "react",
    "react-hooks",
    "testing-library",
    "import",
    "prettier",
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["./tsconfig.json", "./tsconfig.node.json"],
      },
    },
  },
  overrides: [
    {
      files: ["*.config.cjs"],
      env: {
        node: true,
      },
    },
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    quotes: ["error", "double"],
    "import/no-unresolved": [2, { caseSensitive: false }],
    "import/named": 2,
    "import/namespace": 2,
    "import/default": 2,
    "import/export": 2,
    "import/no-named-as-default": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.test.ts",
          "**/*.test.tsx",
          "**/test/*",
          "**/mocks/*",
          "**/__mocks__/*",
          "**/tests/*",
          "./src/tests/*",
          "vite.config.ts",
          "vitest.config.ts",
          "cypress.config.ts",
          "tailwind.config.ts",
        ],
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: ["parameter", "variable"],
        leadingUnderscore: "require",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
        modifiers: ["unused"],
      },
      {
        selector: ["parameter", "variable"],
        leadingUnderscore: "allowDouble",
        format: ["camelCase", "PascalCase", "UPPER_CASE"],
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "react/prop-types": 0,
    "linebreak-style": ["error", "windows"],
    semi: ["error", "always"],
  },
};

