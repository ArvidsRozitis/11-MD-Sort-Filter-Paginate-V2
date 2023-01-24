// /* eslint-disable no-empty */
// /* eslint-disable no-plusplus */
// /* eslint-disable space-before-blocks */
// /* eslint-disable padded-blocks */
// /* eslint-disable no-use-before-define */
// /* eslint-disable indent */
// /* eslint-disable semi */
// /* eslint-disable no-trailing-spaces */
// /* eslint-disable no-multiple-empty-lines */
// import axios from 'axios';

// interface Country {
//   name: string;
//   code: string;
//   capital: string;
//   region: string;
//   currency: {
//     code: string;
//     name: string;
//     symbol: string;
//     flag: string;
//     dialling_code: string;
//     isoCode: string;
//   };
//   language: {
//     code: string;
//     name: string;
//   };
// }

// const tableContent = document.querySelector('.js-country-table-content');
// const clearTable = () => {
//   tableContent.innerHTML = ''
// }


// // axios.get<Country[]>('http://localhost:3004/countries').then(({ data }) => { 
// //   creatRow(data)
// // });

// // const creatRow = (countries:Country[]) => {
// //   countries.forEach((country, i) => {
// //     let rowClass = i % 2 == 0 ? "table__content-row--bg-lightgrey": "table__content-row--bg-white"

// //     const row = document.createElement("tr");
// //     row.classList.add('table__content-row', rowClass);

// //     const cell1 = document.createElement('th');
// //     cell1.classList.add('table__content-cell');
// //     cell1.innerText = country.name
// //     row.appendChild(cell1)
    
// //     const cell2 = document.createElement('th');
// //     cell2.classList.add('table__content-cell');
// //     cell2.innerText = country.capital
// //     row.appendChild(cell2)
    
// //     const cell3 = document.createElement('th');
// //     cell3.classList.add('table__content-cell');
// //     cell3.innerText = country.currency.name
// //     row.appendChild(cell3)
    
// //     const cell4 = document.createElement('th');
// //     cell4.classList.add('table__content-cell');
// //     cell4.innerText = country.language.name
// //     row.appendChild(cell4)
    
// //     tableContent.appendChild(row)
// //   })
// // }

// const sortByCountry = document.querySelector('.js-sort-by-country')
// sortByCountry.addEventListener ('click', () => {
//   axios.get<Country[]>('http://localhost:3004/countries').then(({ data }) => {
//     const sortTo = document.querySelector(".js-sort-by-country")
//     if (sortTo.classList.contains('sorted')) {
//       data.sort((a,b) => {
//         sortTo.classList.remove('sorted')
//         return a.name > b.name ? -1 : a.name > b.name ? 1 : 0;
//       })
//     } else {
//       sortTo.classList.add('sorted')
//       data.sort((a,b) => {
//         return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
//       })
//     }

//     clearTable()

//     data.forEach((country, i) => {
//       let rowClass = i % 2 == 0 ? "table__content-row--bg-lightgrey": "table__content-row--bg-white"
    
//       const row = document.createElement("tr");
//       row.classList.add('table__content-row', rowClass);
    
//       const cell1 = document.createElement('th');
//       cell1.classList.add('table__content-cell');
//       cell1.innerText = country.name
//       row.appendChild(cell1)
      
//       const cell2 = document.createElement('th');
//       cell2.classList.add('table__content-cell');
//       cell2.innerText = country.capital
//       row.appendChild(cell2)
      
//       const cell3 = document.createElement('th');
//       cell3.classList.add('table__content-cell');
//       cell3.innerText = country.currency.name
//       row.appendChild(cell3)
      
//       const cell4 = document.createElement('th');
//       cell4.classList.add('table__content-cell');
//       cell4.innerText = country.language.name
//       row.appendChild(cell4)
      
//       tableContent.appendChild(row)
//     })   
//   });
// })



