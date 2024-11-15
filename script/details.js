const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTMzNDhhZDEyOTAwMTU4NzZiZDciLCJpYXQiOjE3MzE2NjI2NDQsImV4cCI6MTczMjg3MjI0NH0.iar7zziLmVRyRqmdSgjZ6-Ji2Dg2uhXenLivQFpwlBY";

const url = "https://striveschool-api.herokuapp.com/api/product/";

const params = new URLSearchParams(window.location.search);//mi serve per prendere l'id dell'oggetto dall'url

const productId = params.get("id")
console.log(productId)

const productDetails = document.getElementById("productDetails");

function loadDetails() {
    fetch(`${url}${productId}`, {
        headers: {
            "Authorization" : `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }else {
            throw new Error("Errore nel recupero del prodotto");
        }
    })
    .then(product => {
        productDetails.innerHTML =  `
        <img src="${product.imageUrl}" class="card-img-top mb-3" alt="${product.name}">
        <h3>${product.name}</h3>
        <p><strong>Brand:</strong> ${product.brand}</p>
        <p><strong>Price:</strong> €${product.price.toFixed(2)}</p>
        <p><strong>Description:</strong> ${product.description}</p>
        <a href="index.html" class="btn btn-primary">Torna alla lista</a>
      `;
    })
    .catch(err => console.log(err));
}

loadDetails();
  