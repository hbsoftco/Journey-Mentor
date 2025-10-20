<script setup lang="ts">
import AppButton from "~/components/common/app-button.vue";

const route = useRoute();
const router = useRouter();
const countriesStore = useCountriesStore();

const countryCode = route.params.code as string;

// Fetch country detail using store
const { data: country, pending, error } = await useAsyncData(
  `country-${countryCode}`,
  async () => {
    return await countriesStore.fetchCountryByCode(countryCode);
  },
  {
    server: true,
    lazy: false,
  },
);

// Set dynamic page title
useHead({
  title: () => country.value?.name
    ? `${country.value.name} - Journey Mentor`
    : "Journey Mentor",
});

// Get border countries from store
const borderCountries = computed(() => {
  if (!country.value?.borders || country.value.borders.length === 0) {
    return [];
  }
  return countriesStore.getCountriesByCodes(country.value.borders);
});

function formatPopulation(population: number): string {
  return new Intl.NumberFormat("en-US").format(population);
}

function goBack() {
  router.back();
}

function navigateToBorderCountry(code: string) {
  router.push({ name: "country-code", params: { code } });
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Back Button -->
    <AppButton
      icon="heroicons-outline:arrow-left"
      class="mb-12"
      @click="goBack"
    >
      Back
    </AppButton>

    <!-- Loading State -->
    <div v-if="pending || countriesStore.loading" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-blue dark:border-white" />
    </div>

    <!-- Error State -->
    <div v-else-if="error || countriesStore.error || !country" class="text-center py-12">
      <p class="text-red-500 text-lg">
        {{ error?.message || countriesStore.error || "Country not found" }}
      </p>
    </div>

    <!-- Country Detail -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
      <!-- Flag with 5:3 ratio -->
      <div class="w-full">
        <div class="aspect-[5/3] overflow-hidden rounded-sm shadow-lg">
          <NuxtImg
            :src="country.flag"
            :alt="`Flag of ${country.name}`"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <!-- Information -->
      <div class="space-y-8">
        <h1 class="text-3xl lg:text-4xl font-bold text-dark-blue dark:text-white">
          {{ country.name }}
        </h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Left Column -->
          <div class="space-y-3 text-dark-blue dark:text-white">
            <div>
              <span class="font-semibold">Native Name:</span>
              {{ country.nativeName || "N/A" }}
            </div>
            <div>
              <span class="font-semibold">Population:</span>
              {{ formatPopulation(country.population) }}
            </div>
            <div>
              <span class="font-semibold">Region:</span>
              {{ country.region }}
            </div>
            <div>
              <span class="font-semibold">Sub Region:</span>
              {{ country.subregion || "N/A" }}
            </div>
            <div v-if="country.capital">
              <span class="font-semibold">Capital:</span>
              {{ country.capital }}
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-3 text-dark-blue dark:text-white">
            <div v-if="country.topLevelDomain?.length">
              <span class="font-semibold">Top Level Domain:</span>
              {{ country.topLevelDomain.join(", ") }}
            </div>
            <div v-if="country.currencies?.length">
              <span class="font-semibold">Currencies:</span>
              {{ country.currencies.map(c => c.name).join(", ") }}
            </div>
            <div v-if="country.languages?.length">
              <span class="font-semibold">Languages:</span>
              {{ country.languages.map(l => l.name).join(", ") }}
            </div>
          </div>
        </div>

        <!-- Border Countries -->
        <div v-if="country.borders && country.borders.length > 0" class="space-y-4">
          <h3 class="font-semibold text-dark-blue dark:text-white">
            Border Countries:
          </h3>

          <!-- Show loading while border countries are being fetched -->
          <div v-if="borderCountries.length === 0" class="text-dark-blue dark:text-white text-sm">
            Loading border countries...
          </div>

          <!-- Show border countries -->
          <div v-else class="flex flex-wrap gap-3">
            <AppButton
              v-for="border in borderCountries"
              :key="border.alpha3Code"
              size="sm"
              @click="navigateToBorderCountry(border.alpha3Code)"
            >
              {{ border.name }}
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
