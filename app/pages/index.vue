<script setup lang="ts">
import type { Country } from "~/types/domain/country";

import AppInput from "~/components/common/app-input.vue";
import AppSelect from "~/components/common/app-select.vue";
import CountryCard from "~/components/features/country/country-card.vue";
import { CountryService } from "~/services/country-service";

const countryService = new CountryService();

const { data: countries, pending, error } = await useAsyncData<Country[]>(
  "countries-list",
  () => countryService.getAllCountries(),
  {
    server: true,
    lazy: false,
    default: () => [],
  },
);

const searchQuery = ref("");
const selectedRegion = ref("");

const regionOptions = [
  { value: "africa", label: "Africa" },
  { value: "americas", label: "Americas" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "oceania", label: "Oceania" },
];
</script>

<template>
  <div class="container mx-auto">
    <div class="flex justify-between items-center mb-8">
      <div class="min-w-md">
        <AppInput
          v-model="searchQuery"
          placeholder="Search for a country..."
          icon="heroicons-outline:search"
          icon-position="left"
        />
      </div>

      <div>
        <AppSelect
          v-model="selectedRegion"
          size="md"
          :options="regionOptions"
          placeholder="Filter by Region"
        />
      </div>
    </div>

    <div v-if="pending">
      Loading...
    </div>
    <div v-if="error">
      {{ error.message || "Error fetching countries" }}
    </div>

    <div v-if="countries && !pending && !error" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14">
      <CountryCard
        v-for="country in countries"
        :key="country.name"
        :country="country"
      />
    </div>
  </div>
</template>
