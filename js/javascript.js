
document.getElementById('search-btn').addEventListener('click', function () {
    let searchText = document.getElementById("search-text").value;
    addingPhone(searchText);
})
function addingPhone(phone) {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`)
    .then(res => res.json())
    .then(info => display(info));
}

function appendDiv() {
    
}
function display(info) {
    const phones = info.data;
    document.getElementById('phone-container').innerHTML = ``;
    for (let i = 0; i < 12;i++) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-cyan-100 shadow-xl p-0 pt-4 max-w-xs mx-auto">
        <figure><img class="w-24" src="${phones[i].image}" alt="Shoes" /></figure>
        <div class="card-body space-y-2 px-0 text-center pb-0">
          <h2 class="card-title mx-auto">${phones[i].phone_name}</h2>
          <p>There's no more important consumer product today than a cell phone.</p>
          <button class="btn btn-primary rounded-b-xl rounded-t-none">Buy Now</button>
        </div>
        </div>
        `
        document.getElementById('phone-container').appendChild(div)
    }


    const showAllBtn=document.getElementById('show-all-btn')
    if (phones.length >12) {
        showAllBtn.classList.remove('hidden')
        document.getElementById('show-more').addEventListener('click', function () {
            for (let i = 12; i < phones.length-1;i++) {
                const div = document.createElement('div');
                div.innerHTML = `
                <div class="card bg-cyan-100 shadow-xl p-0 pt-4 max-w-xs mx-auto">
                <figure><img class="w-24" src="${phones[i].image}" alt="Shoes" /></figure>
                <div class="card-body space-y-2 px-0 text-center pb-0">
                <h2 class="card-title mx-auto">${phones[i].phone_name}</h2>
                <p>There's no more important consumer product today than a cell phone.</p>
                <button class="btn btn-primary rounded-b-xl rounded-t-none">Buy Now</button>
                </div>
                </div>
                `
                document.getElementById('phone-container').appendChild(div)
            }
            showAllBtn.classList.add('hidden')
        })
    }
    else {
        showAllBtn.classList.add('hidden');
    }
}