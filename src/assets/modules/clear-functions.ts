const clearTable = () => {
  const tableToClear = document.querySelector(".js-country-table-content");
  tableToClear.innerHTML = "";
};

const clearPagination =  () => {
  const pagintaorWrapper = document.querySelector('.js-paginator');    
  pagintaorWrapper.innerHTML= ''
};

export { clearTable, clearPagination }