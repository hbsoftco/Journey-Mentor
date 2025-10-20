import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { Country } from "~/types";

import { useCountriesStore } from "~/stores/country-store";

// Mock the service
vi.mock("~/services/country-service", () => ({
  CountryService: vi.fn().mockImplementation(() => ({
    getAllCountries: vi.fn(),
    getCountryByCode: vi.fn(),
  })),
}));

describe("country Store", () => {
  let store: ReturnType<typeof useCountriesStore>;

  const mockCountries: Country[] = [
    {
      name: "Germany",
      region: "Europe",
      population: 83000000,
      capital: "Berlin",
      flag: "https://example.com/de.png",
      alpha3Code: "DEU",
    },
    {
      name: "Japan",
      region: "Asia",
      population: 125000000,
      capital: "Tokyo",
      flag: "https://example.com/jp.png",
      alpha3Code: "JPN",
    },
  ];

  beforeEach(() => {
    // Create fresh pinia instance before each test
    setActivePinia(createPinia());
    store = useCountriesStore();
    vi.clearAllMocks();
  });

  it("should start with empty countries", () => {
    expect(store.countries).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
  });

  it("should filter countries by region", () => {
    // Setup: Add countries to store
    store.countries = mockCountries;

    // Act: Get Europe countries
    const europeCountries = store.getCountriesByRegion("Europe");

    // Assert
    expect(europeCountries).toHaveLength(1);
    expect(europeCountries[0].name).toBe("Germany");
  });

  it("should find country by code", () => {
    store.countries = mockCountries;

    const country = store.getCountryByCode("DEU");

    expect(country).toBeDefined();
    expect(country?.name).toBe("Germany");
  });

  it("should return undefined for non-existent country", () => {
    store.countries = mockCountries;

    const country = store.getCountryByCode("XXX");

    expect(country).toBeUndefined();
  });

  it("should clear store data", () => {
    // Setup: Add data
    store.countries = mockCountries;
    store.loading = true;
    store.error = "Some error";

    // Act: Clear
    store.clearStore();

    // Assert: Everything should be reset
    expect(store.countries).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
  });
});
