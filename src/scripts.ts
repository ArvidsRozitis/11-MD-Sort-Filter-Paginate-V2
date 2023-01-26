import axios from "axios";
import { Country } from "./assets/modules/interfaces";
import { createCountryRow } from "./assets/modules/create-rows";
import { clearTable , clearPagination } from "./assets/modules/clear-functions";
import { createPagginator } from "./assets/modules/create-paginator";
// import { createActiveButton, createThereIsMorePagesButton, createButton, backToFirstPage } from "./assets/modules/create-pagination-buttons";

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
    } else {
      
      axios.get<Country[]>(`http://localhost:3004/countries?${inputfield.id}_like=${inputfield.value}`).then(({ data }) => {
        console.log(data) 
        clearTable()
        createCountryRow(data)   
      })
    }
  })
})
//------------filtrs


//------------------lapas ielāde
const diplayTable = (page: number, rows: number, sortBy: string, sortOrder: string) => {
  axios.get<Country[]>(`http://localhost:3004/countries?_page=${page}&_limit=${rows}&_sort=${sortBy}&_order=${sortOrder}`).then(({ data }) => {
    createCountryRow(data)
  })
  axios<Country[]>(`http://localhost:3004/countries`).then(({ data }) => {
    const dataLength = data.length
    console.log(data.length)
    
    createPagginator(page, dataLength)
  })
};

//pirmā ielāde
diplayTable(currentPage, rowsOnPage, sortByColumn, howToSort);

export {diplayTable}