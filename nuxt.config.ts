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
  ],

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
});
