
const createThereIsMorePagesButton = (paginationWrapper: Element) =>{
    const buttonThereIsMorePages = document.createElement('button');
    buttonThereIsMorePages.classList.add('table__page-button','table__page-button--more','js-page');
    buttonThereIsMorePages.textContent = '...'
    buttonThereIsMorePages.setAttribute('disabled', 'disabled')
    paginationWrapper.appendChild(buttonThereIsMorePages)
}

const createActiveButton = (pageNumber: number, paginationWrapper: Element) => {
    const buttonActive = document.createElement('button');   
    buttonActive.classList.add('table__page-button','table__page-button--active','js-page');
    buttonActive.textContent = pageNumber.toString();
    paginationWrapper.appendChild(buttonActive)
}

const createButton = (pageNumber: number, paginationWrapper: Element) => {
    const button = document.createElement('button');   
    button.classList.add('table__page-button','js-page');
    button.textContent = pageNumber.toString();
    paginationWrapper.appendChild(button)
}
export {createActiveButton, createThereIsMorePagesButton, createButton}






