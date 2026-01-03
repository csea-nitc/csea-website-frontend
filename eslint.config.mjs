import { defineConfig } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  {
    // You can add global ignores here (like build outputs)
    ignores: ['.next/*', 'out/*', 'dist/*'],
  },
  {
    // If you need to add custom rules later, do it here:
    rules: {
      // 'no-unused-vars': 'error',
    },
  },
]);
