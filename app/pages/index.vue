<script setup lang="ts">
import type { Country } from "~/types";

import AppInput from "~/components/common/app-input.vue";
import AppSelect from "~/components/common/app-select.vue";
import CountryCard from "~/components/features/country/country-card.vue";
import { fuzzyMatch } from "~/utils/fuzzy-search";

const route = useRoute();
const router = useRouter();
const countriesStore = useCountriesStore();

// Initialize filters from URL
const searchQuery = ref((route.query.search as string) || "");
const debouncedSearchQuery = ref((route.query.search as string) || "");
const selectedRegion = ref((route.query.region as string) || "");
const sortBy = ref((route.query.sort as string) || "");

// Fetch countries using store (with SSR support)
const { pending, error } = await useAsyncData(
  "countries-list",
  async () => {
    // Store handles caching internally
    return await countriesStore.fetchCountries();
  },
  {
    server: true,
    lazy: false,
    // Get initial data from store if available
    default: () => countriesStore.countries as Country[],
  },
);

const regionOptions = [
  { value: "", label: "All Regions" },
  { value: "africa", label: "Africa" },
  { value: "americas", label: "Americas" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "oceania", label: "Oceania" },
];

const sortOptions = [
  { value: "", label: "Default" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "population-asc", label: "Population (Low to High)" },
  { value: "population-desc", label: "Population (High to Low)" },
];

// Debounce search input (300ms delay)
let searchDebounceTimer: NodeJS.Timeout;
watch(searchQuery, (newValue) => {
  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => {
    debouncedSearchQuery.value = newValue;
  }, 300);
});

// Use store's countries
const allCountries = computed(() => countriesStore.countries);

// Filtered and sorted countries
const filteredCountries = computed(() => {
  if (!allCountries.value.length)
    return [];

  let result = [...allCountries.value];

  // Filter by search (using debounced value)
  if (debouncedSearchQuery.value) {
    result = result.filter(country =>
      fuzzyMatch(country.name, debouncedSearchQuery.value),
    );
  }

  // Filter by region
  if (selectedRegion.value) {
    result = countriesStore.getCountriesByRegion(selectedRegion.value);

    // Apply search on filtered region
    if (debouncedSearchQuery.value) {
      result = result.filter(country =>
        fuzzyMatch(country.name, debouncedSearchQuery.value),
      );
    }
  }

  // Sort
  if (sortBy.value) {
    const [field, order] = sortBy.value.split("-");
    result.sort((a, b) => {
      if (field === "name") {
        return order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      else if (field === "population") {
        return order === "asc"
          ? a.population - b.population
          : b.population - a.population;
      }
      return 0;
    });
  }

  return result;
});

// Sync with URL (using debounced search)
watch([debouncedSearchQuery, selectedRegion, sortBy], () => {
  const query: Record<string, string> = {};
  if (debouncedSearchQuery.value)
    query.search = debouncedSearchQuery.value;
  if (selectedRegion.value)
    query.region = selectedRegion.value;
  if (sortBy.value)
    query.sort = sortBy.value;
  router.push({ query });
});

// Cleanup on unmount
onUnmounted(() => {
  clearTimeout(searchDebounceTimer);
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Filters -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div class="w-full md:w-96">
        <AppInput
          v-model="searchQuery"
          placeholder="Search for a country..."
          icon="heroicons-outline:search"
          icon-position="left"
        />
      </div>

      <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <AppSelect
          v-model="selectedRegion"
          size="md"
          :options="regionOptions"
          placeholder="Filter by Region"
          class="w-full sm:w-48"
        />

        <AppSelect
          v-model="sortBy"
          size="md"
          :options="sortOptions"
          placeholder="Sort by"
          class="w-full sm:w-48"
        />
      </div>
    </div>

    <!-- Loading -->
    <div v-if="pending || countriesStore.loading" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-dark-blue dark:border-white" />
    </div>

    <!-- Error -->
    <div v-else-if="error || countriesStore.error" class="text-center py-12">
      <p class="text-red-500 text-lg">
        {{ error?.message || countriesStore.error || "Error fetching countries" }}
      </p>
    </div>

    <!-- No Results -->
    <div v-else-if="filteredCountries.length === 0" class="text-center py-12">
      <p class="text-dark-blue dark:text-white text-lg">
        No countries found matching your criteria.
      </p>
    </div>

    <!-- Countries Grid -->
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-14"
    >
      <CountryCard
        v-for="country in filteredCountries"
        :key="country.alpha3Code"
        :country="country"
      />
    </div>
  </div>
</template>
