import type { Currency, Language, RegionalBloc } from "~/types";

type CountryApiResponse = {
  alpha3Code: string;
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

type CountryDetailApiResponse = {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: [number, number];
  demonym: string;
  area: number;
  timezones: string[];
  nativeName: string;
  numericCode: string;
  flags: {
    svg: string;
    png: string;
  };
  currencies: Currency[];
  languages: Language[];
  translations: Record<string, string>;
  flag: string;
  regionalBlocs: RegionalBloc[];
  independent: boolean;
};

export type { CountryApiResponse, CountryDetailApiResponse };
