const clearTable = () => {
  const tableToClear = document.querySelector(".js-country-table-content");
  tableToClear.innerHTML = "";
};

export { clearTable }