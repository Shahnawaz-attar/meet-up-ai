module.exports = {
  root: true,
  extends: ["next/core-web-vitals"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    // ... any other overrides
  },
  eslint:{
    ignoreDuringBuilds: true,
  }
};
