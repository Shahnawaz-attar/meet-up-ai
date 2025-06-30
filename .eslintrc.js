module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
  },
  overrides: [
    {
      files: ["src/app/modules/auth/ui/views/**/*.tsx"],
      rules: {
        // only ignore `any` in catch clauses:
        "@typescript-eslint/no-explicit-any": [
          "error",
          { ignoreCatchClause: true }
        ],
      },
    },
  ],
};
