import react from '@vitejs/plugin-react';
import { defineConfig } from 'wxt';
import type { UserConfig } from 'wxt';

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
