import axios from "axios";
import { Country } from "./assets/modules/interfaces";
import { createCountryRow } from "./assets/modules/create-rows";
import { clearTable , clearPagination } from "./assets/modules/clear-functions";
import { createActiveButton, createThereIsMorePagesButton, createButton } from "./assets/modules/create-pagination-buttons";

// 1 = kā importētinterfaces iekš moduļa


//jāsataisa, ka filtrs parāda 20 lapas
// jāsatais, ka var paņemt lapu atkapaļ
//jāsataisa, ka pēdējās lapas rādās aktive
// jāsataisa pagination filtram/
// jānostilo filtrs
// jānostilo tabulai, lai nelēkā izmēri


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
  const pageCount = Math.ceil(dataLenght/20);

  if((pageCount - page > 2) && (page === 1)) {
    const paginationWrapper = document.querySelector('.js-paginator');
    clearPagination();
    createActiveButton(currentPage, paginationWrapper);
    createButton(currentPage+1, paginationWrapper);
    createThereIsMorePagesButton(paginationWrapper);
    createButton(pageCount, paginationWrapper);
    
    //----------------jāizness funkcijā!!!
    const setPage = document.querySelectorAll(".js-page");
    setPage.forEach((page) => {
      page.addEventListener("click", () => {
      currentPage = Number(page.textContent);
      clearTable()
      diplayTable(currentPage, rowsOnPage, sortByColumn, howToSort);
      });
    });

  } else if((pageCount - page > 2) && (page > 1)){
    const paginationWrapper = document.querySelector('.js-paginator');
    clearPagination();
    createButton(currentPage-1, paginationWrapper);
    createActiveButton(currentPage, paginationWrapper);
    createButton(currentPage+1, paginationWrapper);
    createThereIsMorePagesButton(paginationWrapper);
    createButton(pageCount, paginationWrapper);

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
    const paginationWrapper = document.querySelector('.js-paginator');    
    clearPagination();

    createButton(pageCount-3, paginationWrapper);
    createButton(pageCount-2, paginationWrapper);
    createButton(pageCount-1, paginationWrapper);
    createButton(pageCount, paginationWrapper);


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