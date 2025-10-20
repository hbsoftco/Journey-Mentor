import type { Country, CountryDetail } from "~/types";

import { CountryRepository } from "~/repositories/country-repository";

export class CountryService {
  constructor(private readonly repo = new CountryRepository()) {}

  async getAllCountries(): Promise<Country[]> {
    const apiResponse = await this.repo.getAll();
    // Map API response -> Domain
    return apiResponse.map(c => ({
      name: c.name,
      region: c.region,
      population: c.population,
      capital: c.capital,
      flag: c.flag,
      alpha3Code: c.alpha3Code,
    }));
  }

  async getCountryByCode(code: string): Promise<CountryDetail> {
    const apiResponse = await this.repo.getByCode(code);
    return apiResponse;
  }
}
