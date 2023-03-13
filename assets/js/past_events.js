import data from "./data.js";

/***********************************************/

const $cards = document.getElementById("cards");
const fragment = document.createDocumentFragment();
const $checkboxes = document.getElementById("checkboxes");
const $search = document.querySelector('input[placeholder="search"]');

const imprimirCards = (array, contenedor) => {
  contenedor.innerHTML = "";

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
    <a href="../pages/details.html" class="btn btn-outline-danger">
    See more
    </a>
    </div>
    </div>
    `;
    fragment.appendChild(div);
  });
  contenedor.appendChild(fragment);
};

const filterPastEvents = (array, currentDate) => {
  const pastEvents = array.filter((event) => event.date < currentDate);
  return pastEvents;
};

const pastEvents = filterPastEvents(data.events, data.currentDate);

imprimirCards(pastEvents, $cards);

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

let categories = createCategories(data.events);

const createCheckbox = (array, container) => {
  array.forEach((category) => {
    let div = document.createElement("div");
    div.className = `form-check px-4 col-12 col-sm-3`;
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


/********************************************************************/

let $check = pastEvents;

// filtro con checkboxes


const filterCheckbox = (array) => {
  const checked = document.querySelectorAll('input[type="checkbox"]:checked');
  // const checked = document.querySelectorAll('input[type="checkbox"]');

  const filterCheckboxes = Array.from(checked)
    .filter((checkbox) => checkbox.checked)
    .map((check) => check.value);

  // console.log(filterCheckboxes);

  if (filterCheckboxes.length > 0) {
    const filteredArray = array.filter((event) =>
      filterCheckboxes.includes(event.category.toLowerCase())
    );
    $check = filteredArray;
    // console.log($check);
    return filteredArray;
  } else {
    const filteredArray = data.events;
    return filteredArray;
  }
};

$checkboxes.addEventListener("change", () => {
  let filterData = filterCheckbox(pastEvents);
  imprimirCards(filterData, $cards);
});

// filtro con el search

const filterSearch = (array, value) => {
  let filteredArray = array.filter((element) =>
    element.name.toLowerCase().includes(value.toLowerCase())
  );
  return filteredArray;
};

const notFound = (container) => {
  container.innerHTML = ``;
  let div = document.createElement("article");
  div.className = "col";
  div.innerHTML += `
                    <div class="card h-100 hover">
                    <img
                      src="../assets/img/error.jpg"
                      class="card-img-top h-50"
                      alt="Event not found">
                    <div class="card-body">
                      <h5 class="card-title">Event not found</h5>
                      <p class="card-text">Please, try again</p>
                    </div>
                  `;
  fragment.appendChild(div);
  container.appendChild(fragment);
};

$search.addEventListener("input", (e) => {
  let filterData = filterSearch($check, e.target.value);

  console.clear();
  console.log("filterData: ");
  console.log(filterData);

  // imprimirCards(filterData, $cards);

  if (filterData.length === 0) {
    console.log("dentro del if");
    notFound($cards);
  } else {
    console.log("dentro del else");
    imprimirCards(filterData, $cards);
  }
});
