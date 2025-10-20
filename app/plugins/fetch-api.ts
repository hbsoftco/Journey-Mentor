export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    retry: 1,
    retryDelay: 500,
    cache: "no-cache",

    async onRequest({ options }) {
      // Set request headers
      const headers = new Headers(options.headers);
      headers.set("Accept", "application/json");
      options.headers = headers;
    },

    async onResponse({ response }) {
      // Handle successful responses
      if (response.ok) {
        return response._data;
      }
    },

    async onResponseError({ response, options }) {
      // Global error handling
      console.error(`[API Error] ${options.method} ${options.baseURL}:`, {
        status: response.status,
        statusText: response.statusText,
        data: response._data,
      });
    },
  });

  return {
    provide: {
      api,
    },
  };
});
