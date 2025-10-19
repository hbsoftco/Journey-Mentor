type Currency = {
  code: string;
  name: string;
  symbol?: string;
};

type Country = {
  name: string;
  flag: string;
  population: number;
  region: string;
  capital?: string;
};

type CountryDetail = Country & {
  subregion?: string;
  borders?: string[];
  nativeName?: string;
  currencies?: Currency[];
  independent?: boolean;
};

export type { Country, CountryDetail, Currency };
