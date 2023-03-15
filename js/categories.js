const title =document.querySelector("#title")
const container = document.querySelector("#row-p");
const productName = document.querySelector("#product-searched")
const productForm = document.querySelector("#product-form")
const BASE_URL = "http://localhost:9001/"
const idCategory = new URLSearchParams(window.location.search).get("id");
import {renderProduct} from "./utils.js";
import validate from "./validation.js";

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

async function getOneCategory(){
    const response = await fetch(BASE_URL + `api/v1/categories/${idCategory}`, {
        
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            
        }
    });
    const category = await response.json();
    title.innerHTML = `<h2>List of ${category.data.name}</h2>`
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


getProductsByCategory();
getOneCategory();