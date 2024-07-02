// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["vuetify-nuxt-module"],
  typescript: {
    shim: false,
    strict: true
  },
  build: {
    transpile: ['vue'],
    loaders: {
      scss: {
        implementation: require('sass')
      }
    }
  },
  css: [
    // Global SCSS file
    '@/assets/css/styles.css'
  ],
})