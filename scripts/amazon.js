let productsHTML = ``;

products.forEach((product) => {
  productsHTML += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id = "${
            product.id
          }">
            Add to Cart
          </button>
        </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productsHTML;

const AddToCartButton = document.querySelectorAll(".js-add-to-cart-button");

let addedToCart = document.querySelectorAll(".added-to-cart");

let timeoutId;

AddToCartButton.forEach((button,i) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    const quantitySelectButton = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantityNum = Number(quantitySelectButton.value);
    let matchingItem;

    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantityNum;
    } else {
      cart.push({
        productId,
        quantity: quantityNum,
      });
    }

    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector(".cart-quantity").innerHTML = cartQuantity;

    clearTimeout(timeoutId);

    addedToCart[i].style.opacity = 1;
      timeoutId = setTimeout(() => {
      addedToCart[i].style.opacity = 0;
    },1000);

  });
});


