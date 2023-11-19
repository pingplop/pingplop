/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { join, resolve } from 'node:path'
import { viteSingleFile } from 'vite-plugin-singlefile'
import basicSSL from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [react(), basicSSL(), viteSingleFile({ removeViteModuleLoader: true })],
  envDir: join(__dirname),
  envPrefix: 'VITE_',
  define: { 'import.meta.env.APP_VERSION': `"${process.env.npm_package_version}"` },
  publicDir: resolve(__dirname, 'static'),
  root: resolve(__dirname, 'web'),
  base: '/',
  build: {
    minify: true,
    emptyOutDir: true,
    chunkSizeWarningLimit: 1200,
    reportCompressedSize: false,
    outDir: resolve(__dirname, 'web/dist'),
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'web/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\//, ''),
      },
    },
  },
  test: {
    setupFiles: './setup-test.ts',
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['lcov', 'text'],
      include: ['web/**'],
      exclude: ['**/*.stories.tsx', '**/index.ts'], // exclude stories and index files
    },
    globals: true,
    environment: 'jsdom',
    cache: { dir: resolve(__dirname, 'node_modules/.vitest') },
    include: ['**/*.{test,spec}.{ts,tsx}'],
    css: false,
  },
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'web') },
      { find: '~', replacement: resolve(__dirname, 'static') },
    ],
  },
})
