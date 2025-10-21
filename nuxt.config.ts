import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "@pinia/nuxt",
    "@nuxt/test-utils/module",
  ],

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes",
      htmlAttrs: {
        lang: "en",
        dir: "ltr",
      },
      title: "Journey Mentor",
      meta: [
        { name: "theme-color", content: "#000000" },

        // Primary Meta Tags
        {
          key: "description",
          name: "description",
          content: "Submission for Journey Mentor’s Frontend Developer technical assessment.",
        },
        {
          key: "author",
          name: "author",
          content: "Hossein Bajan",
        },

        // Open Graph / Facebook
        {
          key: "og:type",
          property: "og:type",
          content: "website",
        },
        {
          key: "og:title",
          property: "og:title",
          content: "Submission for Journey Mentor’s Frontend Developer technical assessment.",
        },
        {
          key: "og:description",
          property: "og:description",
          content: "Submission for Journey Mentor’s Frontend Developer technical assessment.",
        },
        {
          key: "og:site_name",
          property: "og:site_name",
          content: "Submission for Journey Mentor’s Frontend Developer technical assessment.",
        },

        // Twitter
        {
          key: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          key: "twitter:title",
          name: "twitter:title",
          content: "Submission for Journey Mentor’s Frontend Developer technical assessment.",
        },
        {
          key: "twitter:description",
          name: "twitter:description",
          content: "Submission for Journey Mentor’s Frontend Developer technical assessment.",
        },

      ],
    },
  },

  css: ["~/assets/css/main.css"],

  eslint: {
    config: {
      standalone: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: {
    provider: "bunny",
    defaults: {
      weights: ["300", "600", "800"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
    },
    families: [
      {
        name: "Nunito Sans",
        provider: "bunny",
        global: true,
      },
    ],
    priority: ["bunny", "google"],
    processCSSVariables: false,
  },

  icon: {
    mode: "css",
    cssLayer: "base",
  },

  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    storageKey: "nuxt-color-mode",
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "https://restcountries.com/v2",
    },
  },

  image: {
    domains: ["restcountries.com"],
  },

  pinia: {},
});
