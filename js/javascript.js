document.getElementById("search-btn").addEventListener("click", function () {
    loading(true);
    let searchText = document.getElementById("search-text").value;
    addingPhone(searchText);
});
addingPhone("13");
function addingPhone(phone) {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`)
        .then((res) => res.json())
        .then((info) => display(info));
}

function appendDiv(phones, i) {
    const div = document.createElement("div");
    console.log(phones[i]);
    div.innerHTML = `
        <div class="card bg-cyan-100 shadow-xl p-0 pt-4 max-w-xs mx-auto">
        <figure><img class="w-24" src="${phones[i].image}" alt="Shoes" /></figure>
        <div class="card-body space-y-2 px-0 text-center pb-0">
        <h2 class="card-title mx-auto">${phones[i].phone_name}</h2>
        <p>There's no more important consumer product today than a cell phone.</p>
        <button id="show-details-btn" onclick="showDetailhandler('${phones[i].slug}');my_modal_1.showModal()" class="btn btn-primary rounded-b-xl rounded-t-none">Show Details</button>
        </div>
        </div>
        `;
    document.getElementById("phone-container").appendChild(div);
}

function display(info) {
    const phones = info.data;
    document.getElementById("phone-container").innerHTML = ``;
    const showAllBtn = document.getElementById("show-all-btn");
    const showMore = document.getElementById("show-more");
    for (let i = 0; i < phones.length; i++) {
        appendDiv(phones, i);
        loading(false);
    }
}

function loading(value) {
    if (value === true) {
        document.getElementById("load-spinner").classList.remove("hidden");
    } else {
        document.getElementById("load-spinner").classList.add("hidden");
    }
}

const showDetailhandler = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then((res) => res.json())
        .then((details) => modalHandler(details.data));
};
const modalHandler = (details) => {
    console.log(details);
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
    <img class="mx-auto" src="${details.image}" alt="">
    <h1><span class="modalStyle">Brand: </span>${details?.brand}</h1>
    <h1><span class="modalStyle">Release Date: </span>${details?.releaseDate}</h1>
    <h1><span class="modalStyle">Name: </span>${details?.name}</h1>
    <h1><span class="modalStyle">Phone Storage: </span>${details?.mainFeatures?.memory}</h1>
    <h1><span class="modalStyle">Chipset: </span>${details?.mainFeatures?.chipSet}</h1>
    <h1><span class="modalStyle">Display Size: </span>${details?.mainFeatures?.displaySize}</h1>
    <h1><span class="modalStyle">Storage: </span>${details?.mainFeatures?.storage}</h1>

    `;
    detailsContainer.appendChild(div);
};
