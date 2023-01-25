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

const sortByCountry = (button: HTMLButtonElement, data: Country[]) => { 
    if (button.classList.contains('not-sorted')) {
      //if not sorted, then sort a-z 
      data.sort((a,b) => {
        button.classList.remove('not-sorted')
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      })
    
    } else {
      //if sorted, then sort z-a
      button.classList.add('not-sorted')
      data.sort((a,b) => {
        return a.name > b.name ? -1 : a.name > b.name ? 1 : 0;
      })
    }
  }
  
const sortByCapital = (button: HTMLButtonElement, data: Country[]) => { 
    if (button.classList.contains('not-sorted')) {
      //if not sorted, then sort a-z 
      data.sort((a,b) => {
        button.classList.remove('not-sorted')
        return a.capital < b.capital ? -1 : a.capital > b.capital ? 1 : 0;
      })
    
    } else {
      //if sorted, then sort z-a
      button.classList.add('not-sorted')
      data.sort((a,b) => {
        return a.capital> b.capital ? -1 : a.capital > b.capital ? 1 : 0;
      })
    }
  }
  
const sortByLanguageName = (button: HTMLButtonElement, data: Country[]) => { 
    if (button.classList.contains('not-sorted')) {
      //if not sorted, then sort a-z 
      data.sort((a,b) => {
        button.classList.remove('not-sorted')
        return a.language.name < b.language.name ? -1 : a.language.name > b.language.name ? 1 : 0;
      })
    
    } else {
      //if sorted, then sort z-a
      button.classList.add('not-sorted')
      data.sort((a,b) => {
        return a.language.name > b.language.name ? -1 : a.language.name > b.language.name ? 1 : 0;
      })
    }
  }
  
const sortByCurrencyName = (button: HTMLButtonElement, data: Country[]) => { 
    if (button.classList.contains('not-sorted')) {
      //if not sorted, then sort a-z 
      data.sort((a,b) => {
        button.classList.remove('not-sorted')
        return a.currency.name < b.currency.name ? -1 : a.currency.name > b.currency.name ? 1 : 0;
      })
    
    } else {
      //if sorted, then sort z-a
      button.classList.add('not-sorted')
      data.sort((a,b) => {
        return a.currency.name > b.currency.name ? -1 : a.currency.name > b.currency.name ? 1 : 0;
      })
    }
  }

  export {sortByCountry, sortByCapital ,sortByCurrencyName ,sortByLanguageName}