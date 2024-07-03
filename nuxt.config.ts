// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["vuetify-nuxt-module"],
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Roboto'
      },
      icons: 'mdi'
    },
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      }
    }
  },
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