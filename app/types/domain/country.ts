type Country = {
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

type Currency = {
  code: string;
  name: string;
  symbol?: string;
};

export type {
  Country,
  Currency,
};
