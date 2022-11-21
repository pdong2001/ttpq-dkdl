import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// import checker from 'vite-plugin-checker';
//@ts-ignore
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    // checker({
    //   typescript: false,
    // }),
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: {
      clientPort: 3000,
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
