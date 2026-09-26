import { defineConfig } from 'vitest/config';

// Covers a generated component's DOM tests, run in a real browser via Playwright.
export default defineConfig({
  test: {
    include: ['test/*.test.ts'],
    browser: {
      enabled: true,
      provider: 'playwright',
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
  },
});
