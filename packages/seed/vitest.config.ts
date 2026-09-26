import { defineConfig } from 'vitest/config';

// Covers unit tests
export default defineConfig({
  test: {
    include: ['test/unit/**/*.test.ts'],
  },
});
