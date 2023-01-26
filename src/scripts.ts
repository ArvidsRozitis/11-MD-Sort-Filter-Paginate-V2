import axios from "axios";
import { Country } from "./assets/modules/interfaces";
import { createContryRow } from "./assets/modules/create-rows";
import { clearTable } from "./assets/modules/clear-table";

// 1 = kā importētinterfaces iekš moduļa




//------------kārtošana
const sortBy = document.querySelectorAll('.js-sort')
let howToSort = 'asc'
let sortByColumn = 'name'

sortBy.forEach((button) => {
  button.addEventListener('click', () => {
    sortByColumn = button.id
    if(howToSort === 'asc') {
      howToSort = 'desc'
    } else {
      howToSort = 'asc'
    }
    currentPage=1
    clearTable()
    diplayTable(currentPage, rowsOnPage, sortByColumn, howToSort);
  })
})
//------------lapas izvēle
const setPage = document.querySelectorAll(".js-page");
let rowsOnPage = 20;
let currentPage = 1;
setPage.forEach((page) => {
  page.addEventListener("click", () => {
    currentPage = Number(page.textContent);
    clearTable()
    diplayTable(currentPage, rowsOnPage, sortByColumn, howToSort);
  });
});

//------------filtrs
const filterBy = document.querySelectorAll('.js-filter')
filterBy.forEach((inputfield: HTMLInputElement) => {
  inputfield.addEventListener('input', (event) => {
    if(inputfield.value.length === 0){
      console.log('notīrīts');
      window.location.reload()
      
    }
    if (inputfield.value.length < 3) {
      event.preventDefault();
    } else{
      let filterColumn = 'name'
      console.log(inputfield.value)

      if(inputfield.classList.contains('js-filter-country-name')) {
        filterColumn = 'name'      
      } else if(inputfield.classList.contains('js-filter-country-capital')) {
        filterColumn = 'capital'
      } else if(inputfield.classList.contains('js-filter-country-currency-name')) {
        filterColumn = 'currency.name'
      } else if(inputfield.classList.contains('js-filter-country-language-name')){
        filterColumn = 'language.name'

      }
      axios.get<Country[]>(`http://localhost:3004/countries?${filterColumn}_like=${inputfield.value}`).then(({ data }) => {
        console.log(data)
        clearTable()
        createContryRow(data)   
      })
    }
  })
})


const createPagginator = (page: number, dataLenght: number) => {
  const pageCount = Math.ceil(dataLenght/20);//data lenght /20 math

  if(pageCount - page > 1) {
  const pagintaorWrapper = document.querySelector('.js-paginator');
  const buttonFirst = document.createElement('button');
  buttonFirst.classList.add('js-page');
  buttonFirst.textContent = currentPage.toString()
  pagintaorWrapper.appendChild(buttonFirst)
  
  const buttonSecound = document.createElement('button');
  buttonSecound.classList.add('js-page');
  buttonSecound.textContent = String(currentPage +1 );
  pagintaorWrapper.appendChild(buttonSecound)
  
  const buttonThereIsMorePages = document.createElement('button');
  buttonThereIsMorePages.classList.add('js-page');
  buttonThereIsMorePages.textContent = '...'
  pagintaorWrapper.appendChild(buttonThereIsMorePages)
  
  const buttonlast = document.createElement('button');
  buttonlast.classList.add('js-page');
  buttonlast.textContent = pageCount.toString()
  pagintaorWrapper.appendChild(buttonlast)
  }
}

//------------------lapas ielāde
const diplayTable = (page: number, rows: number, sortBy: string, sortOrder: string) => {
  axios.get<Country[]>(`http://localhost:3004/countries?_page=${page}&_limit=${rows}&_sort=${sortBy}&_order=${sortOrder}`).then(({ data }) => {
    createContryRow(data)
  })
  axios<Country[]>(`http://localhost:3004/countries`).then(({ data }) => {
    const dataLengt = data.length
    createPagginator(page, dataLengt)  
  })
};
//pirmā ielāde
diplayTable(currentPage, rowsOnPage, sortByColumn, howToSort);







