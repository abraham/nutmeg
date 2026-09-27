import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

// Covers LitElement-backed DOM tests, run in a real browser via Playwright.
export default defineConfig({
  test: {
    include: ['test/test-element.test.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
  },
});
