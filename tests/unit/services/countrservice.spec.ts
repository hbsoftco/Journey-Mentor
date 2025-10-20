import { beforeEach, describe, expect, it, vi } from "vitest";

import type { CountryApiResponse, CountryDetail } from "~/types";

import { CountryRepository } from "~/repositories/country-repository";
import { CountryService } from "~/services/country-service";

// Mock the repository
vi.mock("~/repositories/country-repository");

describe("countryService", () => {
  let service: CountryService;
  let mockRepo: any;

  const mockApiResponse: CountryApiResponse[] = [
    {
      name: "Germany",
      region: "Europe",
      population: 83000000,
      capital: "Berlin",
      flag: "https://example.com/de.png",
      alpha3Code: "DEU",
      borders: ["FRA", "POL"],
    },
    {
      name: "France",
      region: "Europe",
      population: 67000000,
      capital: "Paris",
      flag: "https://example.com/fr.png",
      alpha3Code: "FRA",
      borders: ["DEU", "ESP"],
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
    mockRepo = {
      getAll: vi.fn(),
      getByCode: vi.fn(),
    };
    vi.mocked(CountryRepository).mockImplementation(() => mockRepo);
    service = new CountryService();
  });

  describe("getAllCountries", () => {
    it("should fetch and map all countries", async () => {
      mockRepo.getAll.mockResolvedValue(mockApiResponse);

      const result = await service.getAllCountries();

      expect(mockRepo.getAll).toHaveBeenCalledOnce();
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        name: "Germany",
        region: "Europe",
        population: 83000000,
        capital: "Berlin",
        flag: "https://example.com/de.png",
        alpha3Code: "DEU",
      });
    });

    it("should handle empty response", async () => {
      mockRepo.getAll.mockResolvedValue([]);

      const result = await service.getAllCountries();

      expect(result).toEqual([]);
    });

    it("should propagate repository errors", async () => {
      const error = new Error("API Error");
      mockRepo.getAll.mockRejectedValue(error);

      await expect(service.getAllCountries()).rejects.toThrow("API Error");
    });

    it("should map multiple countries correctly", async () => {
      mockRepo.getAll.mockResolvedValue(mockApiResponse);

      const result = await service.getAllCountries();

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("Germany");
      expect(result[1].name).toBe("France");
      expect(result[0].alpha3Code).toBe("DEU");
      expect(result[1].alpha3Code).toBe("FRA");
    });
  });

  describe("getCountryByCode", () => {
    it("should fetch country detail by code", async () => {
      mockRepo.getByCode.mockResolvedValue(mockCountryDetail);

      const result = await service.getCountryByCode("DEU");

      expect(mockRepo.getByCode).toHaveBeenCalledWith("DEU");
      expect(result).toEqual(mockCountryDetail);
    });

    it("should handle country not found", async () => {
      const error = new Error("Country not found");
      mockRepo.getByCode.mockRejectedValue(error);

      await expect(service.getCountryByCode("XXX")).rejects.toThrow("Country not found");
    });

    it("should pass correct code to repository", async () => {
      mockRepo.getByCode.mockResolvedValue(mockCountryDetail);

      await service.getCountryByCode("FRA");

      expect(mockRepo.getByCode).toHaveBeenCalledWith("FRA");
    });
  });
});
