import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/sotnikov-test-app/',
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests',
    mockReset: true,
  },
})
