export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Marktplaats',
    titleTemplate: '%s | Marktplaats UCLL',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/app.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/mixins.js',
    '~/plugins/vee-validate.js',
    { src: '~/plugins/vue-easy-lightbox.js', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
    // https://i18n.nuxtjs.org/
    '@nuxtjs/i18n',
    // https://www.npmjs.com/package/@nuxtjs/toast
    '@nuxtjs/toast',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    credentials: true
  },

  toast: {

        duration: 3000
  },

  // ENV
  publicRuntimeConfig: {
    hCaptchaSiteKey: process.env.HCAPTCHA_SITE_KEY,
    //csrfTokenUrl: '/api/auth/sanctum/csrf-cookie',
  },

  proxy: {
    '/api': {
      changeOrigin: false,
      target: process.env.API_SERVER_URL,
      xfwd: true
    },

    '/storage': process.env.API_SERVER_URL
  },

  auth: {
    strategies: {
      cookie: {
        scheme: 'cookie',
        cookie: {
          name: 'Auth',
        },
        endpoints: {
          login: {
            url: '/api/auth/login'
          },
          logout: {
            url: '/api/auth/logout'
          },
          user: {
            url: '/api/auth/user'
          }
        }
      },
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      home: '/',
    },
  },

  i18n: {
    locales: [
      {
        code: 'nl',
        iso: 'nl-BE',
        file: 'nl.js',
        name:'Nederlands',
      },
      {
        code: 'en',
        iso: 'en-GB',
        file: 'en.js',
        name: 'English',
      }
    ],
    lazy: true,
    langDir: 'lang/',
    defaultLocale: 'nl',
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'nl',
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"],
  }
}
