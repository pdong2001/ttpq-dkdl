import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
//@ts-ignore
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
  ],
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      // @ts-ignore
      '~': path.resolve(__dirname, './src'),
    },
  },
  envPrefix: 'TTPQ',
});
