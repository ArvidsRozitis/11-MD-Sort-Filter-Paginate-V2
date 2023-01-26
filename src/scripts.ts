import axios from "axios";
import { Country } from "./assets/modules/interfaces";
import { createCountryRow } from "./assets/modules/create-rows";
import { clearTable } from "./assets/modules/clear-table";

// 1 = kā importētinterfaces iekš moduļa



//----globālie pagaidām
const sortBy = document.querySelectorAll('.js-sort')
let howToSort = 'asc'
let sortByColumn = 'name'
let rowsOnPage = 20;
let currentPage = 1;

//------------kārtošana
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
        createCountryRow(data)   
      })
    }
  })
})

const createPagginator = (page: number, dataLenght: number) => {
  let rowsOnPage = 20;
  const pageCount = Math.ceil(dataLenght/20);//data lenght /20 math

  if(pageCount - page > 2) {
    const pagintaorWrapper = document.querySelector('.js-paginator');
    pagintaorWrapper.innerHTML= ''

    const buttonFirst = document.createElement('button');
    buttonFirst.classList.add('table__page-button');
    buttonFirst.classList.add('js-page');
    buttonFirst.classList.add('table__page-button--active');
    buttonFirst.textContent = currentPage.toString()
    pagintaorWrapper.appendChild(buttonFirst)
    
    const buttonSecound = document.createElement('button');
    buttonSecound.classList.add('table__page-button');
    buttonSecound.classList.add('js-page');
    buttonSecound.textContent = String(currentPage +1 );
    pagintaorWrapper.appendChild(buttonSecound)
    
    const buttonThereIsMorePages = document.createElement('button');
    buttonThereIsMorePages.classList.add('table__page-button');
    buttonThereIsMorePages.classList.add('js-page');
    buttonThereIsMorePages.textContent = '...'
    buttonThereIsMorePages.setAttribute('disabled', 'disabled')
    pagintaorWrapper.appendChild(buttonThereIsMorePages)
    
    const buttonlast = document.createElement('button');
    buttonlast.classList.add('table__page-button');
    buttonlast.classList.add('js-page');
    buttonlast.textContent = pageCount.toString()
    pagintaorWrapper.appendChild(buttonlast)
    
    //----------------jāizness funkcijā!!!
    const setPage = document.querySelectorAll(".js-page");
    setPage.forEach((page) => {
      page.addEventListener("click", () => {
      currentPage = Number(page.textContent);
      clearTable()
      diplayTable(currentPage, rowsOnPage, sortByColumn, howToSort);
      });
    });

  } else if (pageCount - page < 4) {
    const pagintaorWrapper = document.querySelector('.js-paginator');    
    pagintaorWrapper.innerHTML= ''

    const buttonOneback = document.createElement('button');    
    buttonOneback.classList.add('table__page-button');
    buttonOneback.classList.add('js-page');
    buttonOneback.textContent = String(pageCount -3 );
    pagintaorWrapper.appendChild(buttonOneback)

    const buttonFirst = document.createElement('button');
    buttonFirst.classList.add('table__page-button');
    buttonFirst.classList.add('js-page');
    buttonFirst.textContent = String(pageCount -2 );
    pagintaorWrapper.appendChild(buttonFirst)
    
    const buttonSecound = document.createElement('button');
    buttonSecound.classList.add('table__page-button');
    buttonSecound.classList.add('js-page');
    buttonSecound.textContent = String(pageCount -1 );
    pagintaorWrapper.appendChild(buttonSecound)

    const buttonlast = document.createElement('button');
    buttonlast.classList.add('table__page-button');
    buttonlast.classList.add('js-page');
    buttonlast.textContent = pageCount.toString()
    pagintaorWrapper.appendChild(buttonlast)    

    //----------------jāizness funkcijā!!!
    const setPage = document.querySelectorAll(".js-page");
    setPage.forEach((page) => {
      page.addEventListener("click", () => {
        currentPage = Number(page.textContent);
        clearTable()
        diplayTable(currentPage, rowsOnPage, sortByColumn, howToSort);
        
        console.log(page)
      });
    });
  } 





}

//------------------lapas ielāde
const diplayTable = (page: number, rows: number, sortBy: string, sortOrder: string) => {
  axios.get<Country[]>(`http://localhost:3004/countries?_page=${page}&_limit=${rows}&_sort=${sortBy}&_order=${sortOrder}`).then(({ data }) => {
    createCountryRow(data)
  })
  axios<Country[]>(`http://localhost:3004/countries`).then(({ data }) => {
    const dataLengt = data.length
    createPagginator(page, dataLengt)  
  })
};

//pirmā ielāde
diplayTable(currentPage, rowsOnPage, sortByColumn, howToSort);