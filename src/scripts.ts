import axios from "axios";
import { Country } from "./assets/modules/interfaces";
import { createContryRow } from "./assets/modules/create-rows";
import { clearTable } from "./assets/modules/clear-table";

// 1= kā importētinterfaces ieks moduļa

// paņemam datus
//ja datus vajag sakārtot, tad tos sakārto
//ja search laukā tiek ierakstīts kaut kas jāsāk pēc atiecīgajiem parametriem filtrēt datus
//jāpaņem dati attiecībā no lapas no līdz
//jāparāda rezultāts



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

const filterBy = document.querySelectorAll('.js-filter')
filterBy.forEach((inputfield: HTMLInputElement) => {
  inputfield.addEventListener('input', (event) => {
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
    })
    clearTable()
    diplayTable(currentPage, rowsOnPage, sortByColumn, howToSort);
  }
  })
})

//apakšā dēļ mainīgajiem
const diplayTable = (page: number, rows: number, sortBy: string, sortOrder: string) => {
  axios.get<Country[]>(`http://localhost:3004/countries?_page=${page}&_limit=${rows}&_sort=${sortBy}&_order=${sortOrder}`).then(({ data }) => {
    createContryRow(data)


    
  })
};
//pirmā ielāde
diplayTable(currentPage, rowsOnPage, sortByColumn, howToSort);





// axios.get<Country[]>(`http://localhost:3004/countries`).then(({ data }) => {
//     console.log(data.length)
//     const createPagginator = () => {
      

//       if ((data.length >= 1) && (data.length >= 4)) {
//         const pagginator = document.querySelector('.js-paginator');
//         const button1 = document.createElement('button');
//         button1.textContent = currentPage.toString()
//         pagginator.appendChild(button1)


//         const button2 = document.createElement('button');
//         button1.textContent = currentPage.toString()
//         pagginator.appendChild(button2)
//       }
//       }
//     createPagginator()
    

    
//   })


