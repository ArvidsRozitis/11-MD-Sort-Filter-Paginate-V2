import axios from 'axios';

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

axios.get<Country[]>('http://localhost:3004/countries').then(({ data }) => {
  // eslint-disable-next-line no-use-before-define
  showCountries(data);
});

const showCountries = (countries: Country[]) => {
  const contriesTable = document.querySelector('.js-country-table');

  countries.forEach((country, i) => {
    let contentRowStyle = 'table__content-row--bg-lightgrey';
    if (i % 2 === 0) {
      contentRowStyle = 'table__content-row--bg-lightgrey';
    } else {
      contentRowStyle = 'table__content-row--bg-white';
    }

    const countryRow = document.createElement('tr');
    countryRow.classList.add('table__content-row', contentRowStyle);

    countryRow.innerHTML = `
        <th class="table__content-cell">${country.name}</th>
        <th class="table__content-cell">${country.capital}</th>
        <th class="table__content-cell">${country.currency.name}</th>
        <th class="table__content-cell">${country.language.name}</th>
        `;

    contriesTable.appendChild(countryRow);
  });
};
