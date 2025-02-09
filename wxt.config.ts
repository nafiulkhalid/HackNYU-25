// wxt.config.ts
import { defineConfig } from 'wxt';

export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  alias: {
    '@': './entrypoints/popup',
  },
});
