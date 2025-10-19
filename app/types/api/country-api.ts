import type { Currency } from "~/types/domain/country";

export type CountryApiResponse = {
  name: string;
  topLevelDomain: string[];
  capital?: string;
  subregion?: string;
  region: string;
  population: number;
  borders?: string[];
  nativeName?: string;
  currencies?: Currency[];
  flag: string;
  independent?: boolean;
};
