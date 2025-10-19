import type { CountryApiResponse } from "~/types";

import { BaseRepository } from "~/repositories/base/base-repository";

export class CountryRepository extends BaseRepository {
  private readonly endpoints = {
    all: "/all",
    byCode: (code: string) => `/alpha/${code}`,
    byRegion: (region: string) => `/region/${region}`,
    byCodes: "/alpha",
    search: (name: string) => `/name/${name}`,
  };

  async getAll(): Promise<CountryApiResponse[]> {
    return this.get<CountryApiResponse[]>(this.endpoints.all, {
      fields: "name,capital,population,flag,region",
    });
  }

  //   async getByCode(code: string): Promise<CountryDetail> {
  //     return this.get<CountryDetail>(this.endpoints.byCode(code));
  //   }

  //   async getByRegion(region: string): Promise<Country[]> {
  //     return this.get<Country[]>(this.endpoints.byRegion(region), {
  //       fields: "name,alpha3Code,capital,region,population,flags",
  //     });
  //   }

  //   async getByCodes(codes: string[]): Promise<Country[]> {
  //     const codesParam = codes.join(",");
  //     return this.get<Country[]>(this.endpoints.byCodes, {
  //       codes: codesParam,
  //       fields: "name,alpha3Code,flags",
  //     });
  //   }

//   async searchByName(name: string): Promise<Country[]> {
//     return this.get<Country[]>(this.endpoints.search(name), {
//       fields: "name,alpha3Code,capital,region,population,flags",
//     });
//   }
}
