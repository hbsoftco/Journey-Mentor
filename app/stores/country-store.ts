import { defineStore } from "pinia";

import type { Country, CountryDetail } from "~/types";

import { CountryService } from "~/services/country-service";

export const useCountriesStore = defineStore("countries", () => {
  // State
  const countries = ref<Country[]>([]);
  const currentCountry = ref<CountryDetail | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const lastFetch = ref<number | null>(null);

  // Service instance
  const countryService = new CountryService();

  // Getters
  const isDataFresh = computed(() => {
    if (!lastFetch.value)
      return false;
    const fiveMinutes = 5 * 60 * 1000;
    return Date.now() - lastFetch.value < fiveMinutes;
  });

  const getCountryByCode = computed(() => {
    return (code: string): Country | undefined => {
      return countries.value.find(c => c.alpha3Code === code);
    };
  });

  const getCountriesByCodes = computed(() => {
    return (codes: string[]): Country[] => {
      return countries.value.filter(c => codes.includes(c.alpha3Code));
    };
  });

  const getCountriesByRegion = computed(() => {
    return (region: string): Country[] => {
      if (!region)
        return countries.value;
      return countries.value.filter(
        c => c.region.toLowerCase() === region.toLowerCase(),
      );
    };
  });

  // Actions
  const fetchCountries = async (force = false): Promise<Country[]> => {
    // Return cached data if fresh
    if (countries.value.length > 0 && isDataFresh.value && !force) {
      return countries.value;
    }

    loading.value = true;
    error.value = null;

    try {
      // Use service layer
      const data = await countryService.getAllCountries();
      countries.value = data;
      lastFetch.value = Date.now();
      return data;
    }
    catch (err: any) {
      error.value = err.message || "Failed to fetch countries";
      throw err;
    }
    finally {
      loading.value = false;
    }
  };

  const fetchCountryByCode = async (code: string): Promise<CountryDetail> => {
    loading.value = true;
    error.value = null;

    try {
      // Always fetch detailed info from service
      const country = await countryService.getCountryByCode(code);
      currentCountry.value = country;

      // Update or add to countries list if not exists
      const index = countries.value.findIndex(c => c.alpha3Code === code);
      if (index === -1 && country) {
        // Add basic info to list
        countries.value.push({
          name: country.name,
          region: country.region,
          population: country.population,
          capital: country.capital,
          flag: country.flag,
          alpha3Code: country.alpha3Code,
        });
      }

      return country;
    }
    catch (err: any) {
      error.value = err.message || "Failed to fetch country";
      throw err;
    }
    finally {
      loading.value = false;
    }
  };

  const clearStore = () => {
    countries.value = [];
    currentCountry.value = null;
    loading.value = false;
    error.value = null;
    lastFetch.value = null;
  };

  const refreshCountries = async () => {
    return await fetchCountries(true);
  };

  return {
    // State
    countries,
    currentCountry,
    loading,
    error,
    lastFetch,

    // Getters
    isDataFresh,
    getCountryByCode,
    getCountriesByCodes,
    getCountriesByRegion,

    // Actions
    fetchCountries,
    fetchCountryByCode,
    clearStore,
    refreshCountries,
  };
});
