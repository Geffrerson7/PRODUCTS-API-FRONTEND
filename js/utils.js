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

export {renderProduct};