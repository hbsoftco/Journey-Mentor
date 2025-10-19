<script setup lang="ts">
import type { Country } from "~/types/domain/country";

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
</script>

<template>
  <div class="container mx-auto">
    <h1>Countries List</h1>

    <div v-if="pending">
      Loading...
    </div>
    <div v-if="error">
      {{ error.message || "Error fetching countries" }}
    </div>

    <ul v-if="countries && !pending && !error">
      <li v-for="country in countries" :key="country.name">
        {{ country.name }} - {{ country.region }} - {{ country.population }}
      </li>
    </ul>
  </div>
</template>
