import data from "./data.js";

const $container = document.getElementById("detailCard");

const queryString = location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const event = data.events.find((event) => event._id == id);

console.log(event);

const $back = document.getElementById("buttonBack");


const eventDetail = (event, container) => {
  let div = document.createElement("article");
  div.className = "row g-0 heigthCard";

  const assistanceEstimate = event.hasOwnProperty("assistance")
    ? `<li class="list-group-item">Assistance: ${event.assistance} </li>`
    : `<li class="list-group-item">Estimate: ${event.estimate} </li>`;

  div.innerHTML = `
										<div class="col-lg-7">
											<img
												src="${event.image}"
												class="rounded w-100 h-100"
												alt="${event.name} image">
										</div>
										<div class="col-lg-5">
											<div class="card-body">
												<h5 class="card-title">${event.name}</h5>
												<div class="card-text">
													<ul class="list-group list-group-flush">
														<li class="list-group-item">${event.date}</li>
														<li class="list-group-item">${event.description}</li>
														<li class="list-group-item">Categoty: ${event.category}</li>
														<li class="list-group-item">Place: ${event.place}</li>
														<li class="list-group-item">Capacity: ${event.capacity}</li>
														${assistanceEstimate}															
														<li class="list-group-item">Price: $ ${event.price}</li>
													</ul>
												</div>
											</div>
										</div>
									`;
  container.appendChild(div);
};

eventDetail(event, $container);

$back.addEventListener('click', () => {
	window.history.back();
});
