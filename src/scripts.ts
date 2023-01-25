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

const diplayTable = (page: number, rows: number, sortBy: string, sortOrder: string) => {
  axios.get<Country[]>(`http://localhost:3004/countries?_page=${page}&_limit=${rows}&_sort=${sortBy}&_order=${sortOrder}`).then(({ data }) => {
    createContryRow(data)
  })
};

diplayTable(currentPage, rowsOnPage, sortByColumn, howToSort);
