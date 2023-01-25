import axios from 'axios';
import  {sortByCountry, sortByCapital , sortByCurrencyName, sortByLanguageName} from './assets/modules/sort-functions';
import { Country } from './assets/modules/interfaces';
import { createContry } from './assets/modules/create-rows';


// 1= kā importētinterfaces ieks moduļa

// paņemam datus
//ja datus vajag sakārtot, tad tos sakārto
//ja search laukā tiek ierakstīts kaut kas jāsāk pēc atiecīgajiem parametriem filtrēt datus
//jāpaņem dati attiecībā no lapas no līdz
//jāparāda rezultāts

axios.get<Country[]>('http://localhost:3004/countries').then(({data}) =>{
  console.log(data)
  sortTable();
});

const clearTable = () => {
  const tableToClear = document.querySelector('.js-country-table-content');
  tableToClear.innerHTML = ''
}


// axios.get<Country[]>('http://localhost:3004/countries').then(({ data }) => { 
//   creatRow(data)
// });

// const creatRow = (countries:Country[]) => {
//   countries.forEach((country, i) => {
//     let rowClass = i % 2 == 0 ? "table__content-row--bg-lightgrey": "table__content-row--bg-white"

//     const row = document.createElement("tr");
//     row.classList.add('table__content-row', rowClass);

//     const cell1 = document.createElement('th');
//     cell1.classList.add('table__content-cell');
//     cell1.innerText = country.name
//     row.appendChild(cell1)
    
//     const cell2 = document.createElement('th');
//     cell2.classList.add('table__content-cell');
//     cell2.innerText = country.capital
//     row.appendChild(cell2)
    
//     const cell3 = document.createElement('th');
//     cell3.classList.add('table__content-cell');
//     cell3.innerText = country.currency.name
//     row.appendChild(cell3)
    
//     const cell4 = document.createElement('th');
//     cell4.classList.add('table__content-cell');
//     cell4.innerText = country.language.name
//     row.appendChild(cell4)
    
//     tableContent.appendChild(row)
//   })
// }

const sortTable = () => {
  //select all buttons
  const sortBy = document.querySelectorAll('.js-sort')

  //see which button is pressed 
  sortBy.forEach((button: HTMLButtonElement) => {
    button.addEventListener('click', () => {

       //when presed get data
      axios.get<Country[]>('http://localhost:3004/countries').then(({ data }) => {

        //when sort by countr is pressed
        if(button.id === 'country') {
          console.log("country is presed")
          sortByCountry(button, data)
        } else if(button.id === 'capital') {
          console.log("capital is presed")
          sortByCapital(button, data)        
        } else if(button.id === 'currency.name') {
          console.log("currency.name is presed")
          sortByCurrencyName(button, data) 
        } else if(button.id === 'language.name') {
          console.log("language.name is presed")        
          sortByLanguageName(button, data)        
        }        
             
        //when sorted, clear previous table
        clearTable()

        //create new table
        createContry(data)

      })
    })
  })
}