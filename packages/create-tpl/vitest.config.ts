import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/temp/**',
      './playground/**/*.*',
      './playground-temp/**/*.*',
    ],
    testTimeout: 20000,
  },
  esbuild: {
    target: 'node14',
  },
})
