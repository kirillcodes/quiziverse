module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".vue", ".ts", ".d.ts", ".tsx"],
      },
      alias: {
        extensions: [".vue", ".js", ".ts", ".scss", ".d.ts", ".tsx"],
        map: [
          ["@components", "src/components"],
          ["@layouts", "src/layouts"],
          ["@pages", "src/pages"],
          ["@routes", "src/routes"],
          ["@styles", "src/styles"],
          ["@hooks", "src/hooks"],
        ],
      },
    },
  },
};
