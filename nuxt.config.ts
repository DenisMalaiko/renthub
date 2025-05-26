// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/', // Якщо твій проєкт не хоститься в підпапці
  },

  nitro: {
    preset: 'node-server', // Або 'static' для повністю статичного білду
  },

  runtimeConfig: {
    public: {
      //API_URL: 'https://renthub-api.onrender.com',
      API_URL: 'http://localhost:8080',
      DATE_FORMAT: 'DD/MM/YYYY',
    }
  },

  devtools: { enabled: false },

  modules: ["vuetify-nuxt-module", "@pinia/nuxt", //"@vite-pwa/nuxt",
  '@nuxt/test-utils/module', 'nuxt-toast'],

  // Вимикає SSR (важливо для PWA)
  ssr: false,
  target: 'static',

  vite: {
    optimizeDeps: {
      include: ['vuetify'],
    },
  },

  pwa: {
    //registerType: 'autoUpdate',
    manifest: {
      name: "Renthub",
      short_name: "Renthub",
      description: "Renthub is a web application created on Nuxt3, Vue3, GraphQl and PWA",
      theme_color: '#ffffff',
      start_url: '/',
    },
    workbox: {
      navigateFallback: "/",
      globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"],
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
          urlPattern: ({ url }: any) => url.pathname.startsWith('/_nuxt/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'nuxt-assets-DEN',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60 * 24 * 7,
            },
          },
        },
        {
          urlPattern: ({ request }: any) => request.destination === "document",
          handler: "NetworkFirst",
          options: {
            cacheName: "html-cache",
            expiration: { maxAgeSeconds: 60 * 60 * 24 * 7 },
          },
        },
        {
          urlPattern: ({ request }: any) =>
            ["script", "style", "image", "font"].includes(
              request.destination as string
            ),
          handler: "CacheFirst",
          options: {
            cacheName: "assets-cache",
            expiration: { maxAgeSeconds: 60 * 60 * 24 * 30 },
          },
        },
      ],
    },
    /*selfDestroying: false, // Вимкни, якщо хочеш кастомний SW
    injectRegister: "script", // Автоматично реєструвати SW
    strategies: "injectManifest",
    srcDir: "public",
    filename: "custom-sw.js", // 🔥 Використовуємо наш кастомний SW*/
    devOptions: {
      enabled: true,
      type: "module"
    }
  },

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
    transpile: ['vuetify'],
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

  compatibilityDate: '2025-02-25',
})