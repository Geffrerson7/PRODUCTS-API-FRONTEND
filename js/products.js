import validate from "./validation.js";
const container = document.querySelector("#row-p");
const productName = document.querySelector("#product-searched")
const productForm = document.querySelector("#product-form")
const categoriesOption = document.querySelector("#categories-list")
const BASE_URL="http://localhost:9001/"

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

async function getProducts(){
    const response = await fetch(BASE_URL+"api/v1/products", {
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

async function getCategories(){
    const response = await fetch(BASE_URL + "api/v1/categories", {
        
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });
    const categoriesList = await response.json();
    categoriesList.data.forEach((category) => {

        categoriesOption.innerHTML += `<li><a class="dropdown-item" href="./html/categories.html?id=${category.id}">${category.name}</a></li>`

    });
}

async function searchProducts(name) {
    try {
        
        const response = await fetch(BASE_URL+`api/v1/products/name/${name}`, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          })
        const productsList = await response.json();
        
        productsList.data.forEach((product) => {
                container.innerHTML += renderProduct(product);
        });
        
    } catch (error) {
        
    }
}

productForm.addEventListener('submit', (event) => {
    container.innerHTML =``
    event.preventDefault();
    formValidation();
    
});

async function formValidation () {
    let validated = validate([productName.value]);
    
    if (validated) {
        searchProducts(productName.value);
    }
};


getCategories();
getProducts();