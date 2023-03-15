const container = document.querySelector("#row-p");
const BASE_URL = "http://localhost:9001/"
const idCategory = new URLSearchParams(window.location.search).get("id");

function renderProduct(product) {
    return `
        <div class="card text-center col-md-2 shadow" id="payment">
          <img src="${product.url_image}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">Name: ${product.name}</h5>
            <p class="card-text">Price: s/. ${product.price}</p>
          </div>
        </div>
    `;
  }

async function getProductsByCategory() {
    const response = await fetch(BASE_URL + `api/v1/products/category/${idCategory}`, {
        
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            
        }
    });
    const productsList = await response.json();
    productsList.data.forEach((product) => {
        container.innerHTML += renderProduct(product);
      });
}

getProductsByCategory();