import { defineVitestConfig } from '@nuxt/test-utils/config'
import vue from '@vitejs/plugin-vue';
import path from 'path'
import { fileURLToPath } from "url";

export default defineVitestConfig({
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './'),
      '@': path.resolve(__dirname, './'),
      '~/': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: {
    environment: 'nuxt',
    globals: true,
    deps: {
      inline: ['vuetify'],
    },
  }
})