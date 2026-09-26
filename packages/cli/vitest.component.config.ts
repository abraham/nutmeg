import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

// Covers a generated component's DOM tests, run in a real browser via Playwright.
export default defineConfig({
  optimizeDeps: {
    // Pre-bundle eagerly so Vite doesn't reload mid-run on first discovery.
    include: ['@nutmeg/seed'],
  },
  test: {
    include: ['test/*.test.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
  },
});
