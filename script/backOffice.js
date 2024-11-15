const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MTMzNDhhZDEyOTAwMTU4NzZiZDciLCJpYXQiOjE3MzE2NjI2NDQsImV4cCI6MTczMjg3MjI0NH0.iar7zziLmVRyRqmdSgjZ6-Ji2Dg2uhXenLivQFpwlBY";
//accessToken è la apiKey--- Chiave di autorizzazione

const url = "https://striveschool-api.herokuapp.com/api/product/";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");


if (productId) {
  
  //se productId ottiene un valore, con questo blocco di codice potrò modificare un oggetto già esistente
  fetch(`${url}${productId}`, {
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  })
  .then(response => {
    if(response.ok){
    return response.json();
}else {
    throw new Error("Errore durante l'invio del prodotto");
  }
})
    .then(product => {
      document.getElementById("name").value = product.name;
      document.getElementById("description").value = product.description;
      document.getElementById("brand").value = product.brand;
      document.getElementById("imageUrl").value = product.imageUrl;
      document.getElementById("price").value = product.price;
    })
    .catch(error => console.error("Errore nel caricamento del prodotto:", error));
}

//verrà eseguito ogni volta che l'utente invia il form
document.getElementById("productForm").addEventListener("submit", function (event) {
  event.preventDefault();  //evita il refresh della pagina


  //raccolta dei dati dal form per "montare l'oggetto productData sotto"
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const price = parseFloat(document.getElementById("price").value);

  const productData = { name, description, brand, imageUrl, price };

  let requestMethod = "POST";  
  let requestUrl = url; 

  //se non è presente una id la richiesta utilizzerà il metodo "POST" ossia il predefinito in questo caso
  //se trova un id invece utilizzerà il metodo "PUT" concatenando nella url il productId con la quale potrò arrivare all'oggetto
  if (productId) {
    requestMethod = "PUT"; 
    requestUrl = `${url}${productId}`;  
  }

  //richiesta http
  fetch(requestUrl, {
    method: requestMethod,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
    //il corpo di body conterrà i dati dell'oggetto in formato json
    body: JSON.stringify(productData)
  })
  //controllo della richiesta
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore durante l'invio del prodotto");
      }
    })
    .then(data => {
      //arrow function per la modifica del messaggio in base al valore/non valore di productId
      const action = productId ? "Modificato" : "Creato";  
      document.getElementById("result").innerHTML = `
        <p>Prodotto ${action} con successo! ID: ${data._id}</p>
      `;
     //reindirizzo alla pagina index 
    window.location.href = "index.html";  
    })
    .catch(err => console.log(err));
});

//aggiunge gestore evento click sul button delete
document.getElementById("deleteButton").addEventListener("click", function () {

  //verifica l'esistenza dell'oggetto dato il suo id, se non esiste procede con l'alert
  if (!productId) {
    
    showAlert("Nessun prodotto da eliminare!", "danger");
    return;
  }

  //fetch con il metodo "DELETE"
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

//Funzione per la gestione degli alert - Message(il messaggio che voglio che venga inserito) - type (il tipo di alert)
function showAlert(message, type) {
  const alertContainer = document.getElementById("alertContainer");
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}