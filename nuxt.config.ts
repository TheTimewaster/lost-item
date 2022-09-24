// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@vueuse/nuxt', 'nuxt-windicss', 'nuxt-icon', '@nuxtjs/i18n'],
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: true,
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;800&family=Source+Serif+Pro:wght@700&display=swap',
        },
      ],
    },
  },
  i18n: {
    locales: [
      {
        code: 'en',
        file: 'en.json',
      },
      {
        code: 'de',
        file: 'de.json',
      },
    ],
    lazy: true,
    langDir: './locales',
    baseUrl: 'http://localhost:3000',
    defaultLocale: 'en',
    vueI18n: {
      legacy: false,
      locale: 'en',
      // messages: {
      //   en: {
      //     app: {
      //       your_items: 'Your items',
      //       messages: {
      //         error: 'Something went wrong. 😭',
      //       },
      //     },
      //   },
      //   de: {
      //     app: {
      //       your_items: 'Deine Gegenstände',
      //       messages: {
      //         error: 'Etwas ist schiefgelaufen! 😭',
      //       },
      //     },
      //   },
      // },
    },
  },
});
