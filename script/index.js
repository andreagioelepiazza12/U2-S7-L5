
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTMzNDhhZDEyOTAwMTU4NzZiZDciLCJpYXQiOjE3MzE2NjI2NDQsImV4cCI6MTczMjg3MjI0NH0.iar7zziLmVRyRqmdSgjZ6-Ji2Dg2uhXenLivQFpwlBY";

const url = "https://striveschool-api.herokuapp.com/api/product/";

const cardContainer = document.getElementById("cardContainer");
const cardsRow = document.getElementById("cardsRow")


cardContainer.appendChild(cardsRow);

function createCard(product) {
    const col = document.createElement("div");
    col.className = "col-12 col-md-6 col-lg-3 mb-4"
    cardsRow.appendChild(col);
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
    <div class="card h-100 d-flex flex-column">
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" style="max-height: 200px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">${product.name}</h5>
              <p id="brand">${product.brand}</p>
              <p id="price">${product.price}</p>
              <a href="details.html?id=${product._id}" class="btn btn-primary m-2">Show info</a>
              <a href="backOffice.html?id=${product._id}" class="btn btn-primary m-2">Modifica</a>
            </div>
          </div>
          `;

          col.appendChild(card);
          
}

fetch(url, {
    headers : {
        "Authorization" : `Bearer ${accessToken}`
    }
})
.then(response => {
    if(response.ok){
    return response.json();
}else {
    throw new Error("Errore durante l'invio del prodotto");
  }
})
.then(products => {
    products.forEach(product => {
        createCard(product);
    })
})
.catch(err => console.log(err));

