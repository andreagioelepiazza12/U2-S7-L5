const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTMzNDhhZDEyOTAwMTU4NzZiZDciLCJpYXQiOjE3MzE2NjI2NDQsImV4cCI6MTczMjg3MjI0NH0.iar7zziLmVRyRqmdSgjZ6-Ji2Dg2uhXenLivQFpwlBY";
//accessToken è la apiKey--- Chiave di autorizzazione

const url = "https://striveschool-api.herokuapp.com/api/product/";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");


if (productId) {
  
  fetch(`${url}${productId}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  })
    .then(response => response.json()
  )
    .then(product => {
      document.getElementById("name").value = product.name;
      document.getElementById("description").value = product.description;
      document.getElementById("brand").value = product.brand;
      document.getElementById("imageUrl").value = product.imageUrl;
      document.getElementById("price").value = product.price;
    })
    .catch(error => console.error("Errore nel caricamento del prodotto:", error));
}


document.getElementById("productForm").addEventListener("submit", function (event) {
  event.preventDefault();  

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const price = parseFloat(document.getElementById("price").value);

  const productData = { name, description, brand, imageUrl, price };

  let requestMethod = "POST";  
  let requestUrl = url; 

  if (productId) {
    requestMethod = "PUT"; 
    requestUrl = `${url}${productId}`;  
  }

  fetch(requestUrl, {
    method: requestMethod,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify(productData)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore durante l'invio del prodotto");
      }
    })
    .then(data => {
      const action = productId ? "Modificato" : "Creato";  
      document.getElementById("result").innerHTML = `
        <p>Prodotto ${action} con successo! ID: ${data._id}</p>
      `;
      
    window.location.href = "index.html";  
    })
    .catch(err => console.log(err));
});


document.getElementById("deleteButton").addEventListener("click", function () {
  if (!productId) {
    
    showAlert("Nessun prodotto da eliminare!", "danger");
    return;
  }

  fetch(`${url}${productId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    },
  })
    .then(response => {
      if (response.ok) {
        
        showAlert("Prodotto eliminato con successo!", "success");
        setTimeout(() => {
          window.location.href = "index.html"; 
        }, 2000);
      } else {
        throw new Error("Errore durante l'eliminazione del prodotto");
      }
    })
    .catch(err => {
      console.error("Errore:", err);
      showAlert("Errore durante l'eliminazione del prodotto!", "danger");
    });
});


function showAlert(message, type) {
  const alertContainer = document.getElementById("alertContainer");
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}