interface Country {
    name: string;
    code: string;
    capital: string;
    region: string;
    currency: {
      code: string;
      name: string;
      symbol: string;
      flag: string;
      dialling_code: string;
      isoCode: string;
    };
    language: {
      code: string;
      name: string;
    };
}
export { Country }