import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react({ jsxRuntime: 'classic' })],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 800,
    modulePreload: {
      polyfill: false,
      resolveDependencies: (_filename, deps) =>
        deps.filter((dep) => !dep.includes('vendor-maps')),
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':    ['react', 'react-dom', 'react-router-dom', 'react/jsx-runtime'],
          'vendor-markdown': ['react-markdown', 'remark-gfm'],
          'vendor-icons':    ['react-icons'],
        },
      },
    },
  },
  server: {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.VITE_PORT) || 3000,
    proxy: {
      '/api': 'http://localhost:7667',
    },
  },
});
