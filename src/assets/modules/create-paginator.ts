import { createActiveButton } from "./create-pagination-buttons";
import { backToFirstPage } from "./create-pagination-buttons";
import { createButton } from "./create-pagination-buttons";
import { createThereIsMorePagesButton } from "./create-pagination-buttons";
import { clearPagination } from "./clear-functions";
import { clearTable } from "./clear-functions";
import { diplayTable } from "../../scripts";

let howToSort = 'asc'
let sortByColumn = 'name'

let currentPage = 1;

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
        currentPage = Number(page.id);
        clearTable()
        diplayTable(currentPage, rowsOnPage, sortByColumn, howToSort);
        });
      });
  
    } else if((pageCount - page > 2) && (page > 1)){
      const paginationWrapper = document.querySelector('.js-paginator');
      clearPagination();
      backToFirstPage(paginationWrapper)
      createButton(currentPage-1, paginationWrapper);
      createActiveButton(currentPage, paginationWrapper);
      createButton(currentPage+1, paginationWrapper);
      createThereIsMorePagesButton(paginationWrapper);
      createButton(pageCount, paginationWrapper);
  
       //----------------jāizness funkcijā!!!
       const setPage = document.querySelectorAll(".js-page");
       setPage.forEach((page) => {
         page.addEventListener("click", () => {
         currentPage = Number(page.id);
         clearTable()
         diplayTable(currentPage, rowsOnPage, sortByColumn, howToSort);
         });
       });
  
  
    } else if (pageCount - page < 4) {
      const paginationWrapper = document.querySelector('.js-paginator');    
      clearPagination();
      backToFirstPage(paginationWrapper)
      createButton(pageCount-3, paginationWrapper);
      createButton(pageCount-2, paginationWrapper);
      createButton(pageCount-1, paginationWrapper);
      createButton(pageCount, paginationWrapper);
  
  
      //----------------jāizness funkcijā!!!
      const setPage = document.querySelectorAll(".js-page");
      setPage.forEach((page) => {
        page.addEventListener("click", () => {
          currentPage = Number(page.id);
          clearTable()
          diplayTable(currentPage, rowsOnPage, sortByColumn, howToSort);
          
          console.log(page)
        });
      });
    } 
  }

  export {createPagginator}