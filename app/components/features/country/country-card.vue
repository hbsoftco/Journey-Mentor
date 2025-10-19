<script setup lang="ts">
import type { Country } from "~/types/domain/country";

type Props = {
  country: Country;
};

const props = defineProps<Props>();

function navigateToDetail() {
  navigateTo({ name: "country-detail", params: { name: props.country.name } });
}

function formatPopulation(population: number): string {
  return new Intl.NumberFormat("en-US").format(population);
}
</script>

<template>
  <button
    class="group cursor-pointer rounded-sm dark:bg-dark-blue shadow-md overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
    tabindex="0"
    :aria-label="`View details for ${country.name}`"
    @click="navigateToDetail"
  >
    <!-- Flag Section -->
    <div class="w-full aspect-[5/3] overflow-hidden dark:bg-dark-blue bg-gray-100">
      <NuxtImg
        :src="country.flag"
        :alt="`Flag of ${country.name}`"
        loading="lazy"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Content Section -->
    <div class="p-6 space-y-3 text-left">
      <!-- Country Name -->
      <h2 class="text-xl font-bold text-dark-blue dark:text-white mb-4">
        {{ country.name }}
      </h2>

      <!-- Info List -->
      <div class="space-y-2 text-sm">
        <div class="text-dark-blue dark:text-slate-300">
          <span class="font-semibold text-dark-blue dark:text-white">Population:</span>
          {{ formatPopulation(country.population) }}
        </div>

        <div class="text-dark-blue dark:text-slate-300">
          <span class="font-semibold text-dark-blue dark:text-white">Region:</span>
          {{ country.region }}
        </div>

        <div v-if="country.capital?.[0]" class="text-dark-blue dark:text-slate-300">
          <span class="font-semibold text-dark-blue dark:text-white">Capital:</span>
          {{ country.capital[0] }}
        </div>
      </div>
    </div>
  </button>
</template>
