import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.VITE_PORT) || 3000,
    proxy: {
      '/api': 'http://localhost:7666',
    },
  },
});
