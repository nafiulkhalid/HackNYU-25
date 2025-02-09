import { defineConfig } from 'wxt';
import type { UserConfig } from 'wxt';
import react from '@vitejs/plugin-react';

export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  alias: {
    '@': './',
    '@assets': './assets',
    '@components': './components',
    '@composables': './composables',
    '@entrypoints': './entrypoints',
    '@hooks': './hooks',
    '@modules': './modules',
    '@utils': './utils',
    '@features': './entrypoints/features',
    '@popup': './entrypoints/popup',   
  },
  vite: () => ({
          plugins: [react()],
  }),
} as UserConfig);
