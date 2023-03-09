import data from "./data.js";

/***********************************************/

const $cards = document.getElementById("cards");
const fragment = document.createDocumentFragment();
const $checkboxes = document.getElementById("checkboxes");
const $search = document.querySelector('input[placeholder="search"]');

const imprimirCards = (array, contenedor) => {
  array.forEach((event) => {
    let div = document.createElement("article");

    div.className = "col";
    div.innerHTML += `
    <div class="card h-100 hover">
    <img
    src="${event.image}"
    class="card-img-top h-50"
    alt="${event.name} image">
    <div class="card-body">
    <h5 class="card-title">${event.name}</h5>
    <p class="card-text">${event.category}</p>
        </div>
        <div class="card-footer d-flex justify-content-between">
        <p class="m-2">$ ${event.price}</p>
        <a href="pages/details.html" class="btn btn-outline-danger">
        See more
        </a>
        </div>
        </div>
        `;
    fragment.appendChild(div);
  });
  contenedor.appendChild(fragment);
};
imprimirCards(data.events, $cards);

// Extraigo las categorias del array original, y elimino los duplicados

const createCategories = (array) => {
  let categories = array.map((category) => category.category);
  categories = categories.reduce((accum, element) => {
    if (!accum.includes(element)) {
      accum.push(element);
    }
    return accum;
  }, []);
  return categories;
};

/* Otra forma. Ver si esta bien */

// const createCategories = (array) => {
//   let categories = array.map((category) => category.category);
//   categories = new Set(categories);
//   return categories;
// };

let categories = createCategories(data.events);

/* Creo checkboxes con las categorias extraidas*/

const createCheckbox = (array, container) => {
  array.forEach((category) => {
    let div = document.createElement("div");
    div.className = `form-check px-4 col-12 col-sm-3 ${category.toLowerCase()}`;
    div.innerHTML = `
              <label class="form-check-label" for="${category.toLowerCase()}">
                <input
                  type="checkbox"
                  name="category"
                  class="form-check-input"
                  value="${category.toLowerCase()}"
                  id="${category.toLowerCase()}">
                <span class="">${category}</span>
              </label>
        `;
    container.appendChild(div);
  });
};

createCheckbox(categories, $checkboxes);

// const filterCheckbox = (array) => {
//   let checked = document.querySelector('input[type="checkbox"]:checked');

  
//   let filteredArray = array.filter((event) =>
//     event.category.toLowerCase().includes(checked.category.toLowerCase())
//   );
//   return filteredArray;
// };

// $checkboxes.addEventListener("change", () => {

//   let filterData = filterCheckbox(data.events);
//   imprimirCards(filterData, $cards);
// });
