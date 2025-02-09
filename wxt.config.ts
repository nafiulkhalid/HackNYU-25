// wxt.config.ts
import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';

export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  alias: {
    '@': './entrypoints/popup',
  },
  vite: () => ({
    plugins: [react()],
  }),
});
