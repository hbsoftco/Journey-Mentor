type Currency = {
  code: string;
  name: string;
  symbol?: string;
};

type Language = {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
};

type RegionalBloc = {
  acronym: string;
  name: string;
};

type Country = {
  alpha3Code: string;
  name: string;
  flag: string;
  population: number;
  region: string;
  capital?: string;
  borders?: string[];
};

type CountryDetail = Country & {
  subregion?: string;
  nativeName?: string;
  currencies?: Currency[];
  independent?: boolean;
  topLevelDomain: string[];
  languages: Language[];
};

export type { Country, CountryDetail, Currency, Language, RegionalBloc };
