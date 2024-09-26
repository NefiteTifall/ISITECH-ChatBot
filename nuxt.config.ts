// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/ui',
    '@nuxt/content',
    '@formkit/auto-animate',
    '@nuxthub/core',
  ],
  css: ['~/assets/css/main.scss'],
  hub: {
    database: true
  }
})
