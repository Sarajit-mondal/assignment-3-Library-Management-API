// eslint.config.ts
import tseslint from "typescript-eslint";

export default tseslint.config([
  {
    files: ['**/*.ts', '**/*.tsx'], // Specify which files to apply
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "prefer-const": "error",
      "no-console": "warn",
    },
  },
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/.env"],
  },
]);
