import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

// Covers a generated component's DOM tests, run in a real browser via Playwright.
export default defineConfig({
  optimizeDeps: {
    // Pre-bundle eagerly so Vite doesn't reload mid-run on first discovery.
    include: ['@nutmeg/seed'],
  },
  server: {
    fs: {
      // Windows mixes backslash/forward-slash paths in its own fs.allow check,
      // rejecting its own node_modules files (e.g. @vitest/browser/dist/client).
      strict: false,
    },
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
