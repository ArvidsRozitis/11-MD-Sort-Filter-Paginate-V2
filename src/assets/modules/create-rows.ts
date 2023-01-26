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

const tableContent = document.querySelector('.js-country-table-content');

const createCountryRow= (data: Country[]) => {
  data.forEach((country, i) => {
    let rowClass = i % 2 == 0 ? "table__content-row--bg-lightgrey": "table__content-row--bg-white"
  
    const row = document.createElement("tr");
    row.classList.add('table__content-row', rowClass);
  
    let cell = document.createElement('th');
    cell.classList.add('table__content-cell');
    cell.innerText = country.name;
    row.appendChild(cell);

    cell = document.createElement('th');
    cell.classList.add('table__content-cell');
    cell.innerText = country.capital;
    row.appendChild(cell);

    cell = document.createElement('th');
    cell.classList.add('table__content-cell');
    cell.innerText = country.currency.name;
    row.appendChild(cell);

    cell = document.createElement('th');
    cell.classList.add('table__content-cell');
    cell.innerText = country.language.name;
    row.appendChild(cell);

    tableContent.appendChild(row)
  })
}

export {createCountryRow}
  
  