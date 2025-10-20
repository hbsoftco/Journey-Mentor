import type { CountryApiResponse, CountryDetail } from "~/types";

import { BaseRepository } from "~/repositories/base/base-repository";

export class CountryRepository extends BaseRepository {
  private readonly endpoints = {
    all: "/all",
    byCode: (code: string) => `/alpha/${code}`,
  };

  async getAll(): Promise<CountryApiResponse[]> {
    return this.get<CountryApiResponse[]>(this.endpoints.all, {
      fields: "name,capital,population,flag,region,alpha3Code,borders",
    });
  }

  async getByCode(code: string): Promise<CountryDetail> {
    return this.get<CountryDetail>(this.endpoints.byCode(code));
  }
}
