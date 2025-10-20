import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CountryApiResponse, CountryDetail } from "~/types";

import { CountryRepository } from "~/repositories/country-repository";

// Mock useNuxtApp
const mockApi = vi.fn();
vi.mock("#app", () => ({
  useNuxtApp: () => ({
    $api: mockApi,
  }),
}));

describe("countryRepository", () => {
  let repository: CountryRepository;

  const mockCountriesResponse: CountryApiResponse[] = [
    {
      name: "Germany",
      region: "Europe",
      population: 83000000,
      capital: "Berlin",
      flag: "https://example.com/de.png",
      alpha3Code: "DEU",
      borders: ["FRA", "POL"],
    },
  ];

  const mockCountryDetail: CountryDetail = {
    name: "Germany",
    region: "Europe",
    population: 83000000,
    capital: "Berlin",
    flag: "https://example.com/de.png",
    alpha3Code: "DEU",
    nativeName: "Deutschland",
    subregion: "Western Europe",
    topLevelDomain: [".de"],
    currencies: [{ code: "EUR", name: "Euro", symbol: "€" }],
    languages: [{ name: "German", nativeName: "Deutsch" }],
    borders: ["FRA", "POL", "AUT"],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    repository = new CountryRepository();
  });

  describe("getAll", () => {
    it("should fetch all countries with correct fields", async () => {
      mockApi.mockResolvedValue(mockCountriesResponse);

      const result = await repository.getAll();

      expect(mockApi).toHaveBeenCalledWith("/all", {
        method: "GET",
        params: {
          fields: "name,capital,population,flag,region,alpha3Code,borders",
        },
      });
      expect(result).toEqual(mockCountriesResponse);
    });

    it("should handle API errors", async () => {
      const apiError = { statusCode: 500, message: "Server error" };
      mockApi.mockRejectedValue(apiError);

      await expect(repository.getAll()).rejects.toEqual(apiError);
    });

    it("should handle 404 errors", async () => {
      const apiError = { statusCode: 404, message: "Not found" };
      mockApi.mockRejectedValue(apiError);

      await expect(repository.getAll()).rejects.toEqual(apiError);
    });
  });

  describe("getByCode", () => {
    it("should fetch country by code", async () => {
      mockApi.mockResolvedValue(mockCountryDetail);

      const result = await repository.getByCode("DEU");

      expect(mockApi).toHaveBeenCalledWith("/alpha/DEU", {
        method: "GET",
        params: undefined,
      });
      expect(result).toEqual(mockCountryDetail);
    });

    it("should handle different country codes", async () => {
      mockApi.mockResolvedValue(mockCountryDetail);

      await repository.getByCode("FRA");

      expect(mockApi).toHaveBeenCalledWith("/alpha/FRA", {
        method: "GET",
        params: undefined,
      });
    });

    it("should handle country not found", async () => {
      const apiError = { statusCode: 404, message: "Country not found" };
      mockApi.mockRejectedValue(apiError);

      await expect(repository.getByCode("XXX")).rejects.toEqual(apiError);
    });

    it("should handle network errors", async () => {
      const networkError = new Error("Network error");
      mockApi.mockRejectedValue(networkError);

      await expect(repository.getByCode("DEU")).rejects.toThrow("Network error");
    });
  });
});
