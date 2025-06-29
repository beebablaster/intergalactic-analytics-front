import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },
  retries: 1,
  testMatch: '**/*.spec.ts',
  exclude: [
    '**/node_modules/**',
    '**/src/**/*.test.ts',
    '**/src/**/*.test.tsx',
  ],
});
