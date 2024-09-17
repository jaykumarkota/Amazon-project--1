import {
  addProductToCart,
  cart,
  removeFromCart,
  saveCartToStorage,
  updateCartQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import { priceCentsToDollers } from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export function renderOrderSummary() {
  let cartHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (productId === product.id) {
        matchingProduct = product;
      }
    });
    let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (cartItem.deliveryOptionId === option.id) {
        deliveryOption = option;
      }
    });
    let todayDate = dayjs();
    let deliveryDate = todayDate.add(deliveryOption.deliveryDays, "days");
    let dateFormatted = deliveryDate.format("dddd, MMMM D");

    cartHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateFormatted}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${priceCentsToDollers(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${
                      cartItem.productId
                    }">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity" data-cart-item-id="${
                    cartItem.productId
                  }">
                    Update
                  </span>
                  <input type="number" class="quantity-input js-quantity-input-${
                    cartItem.productId
                  }" min="1" max="10">
                  <span class="save-quantity-link link-primary js-save-quantity-link" data-cart-item-id="${
                    cartItem.productId
                  }">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${
                    cartItem.productId
                  }">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
  `;
  });

  document.querySelector(".order-summary").innerHTML = cartHTML;
  updateCartQuantityForCheckout();
  const deleteQuantityBtn = document.querySelectorAll(
    ".js-delete-quantity-link"
  );
  const updateQuantityBtn = document.querySelectorAll(".js-update-quantity");
  const saveCartBtn = document.querySelectorAll(".js-save-quantity-link");

  //cart items refresher
  function updateCartQuantityForCheckout() {
    let cartQuantityCheckout = (document.querySelector(
      ".js-cart-quantity-checkout-page"
    ).innerHTML = `${updateCartQuantity()} items`);
  }

  //delete cart button
  deleteQuantityBtn.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      removeFromCart(productId);
      updateCartQuantityForCheckout();
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
    });
  });

  //update cart button
  updateQuantityBtn.forEach((button) => {
    button.addEventListener("click", () => {
      let cartItemId = button.dataset.cartItemId;
      let cartItemContainer = document.querySelector(
        `.js-cart-item-container-${cartItemId}`
      );
      cartItemContainer.classList.add("is-editing-quantity");
    });
  });

  //save new cart button
  saveCartBtn.forEach((button) => {
    button.addEventListener("click", () => {
      let cartItemId = button.dataset.cartItemId;
      let cartItemContainer = document.querySelector(
        `.js-cart-item-container-${cartItemId}`
      );
      let quantityInput = document.querySelector(
        `.js-quantity-input-${cartItemId}`
      );

      let quantity = Number(quantityInput.value);

      if (0 < quantity && quantity <= 10) {
        cart.forEach((cartItem) => {
          if (cartItemId === cartItem.productId) {
            cartItem.quantity = quantity;
            document.querySelector(
              `.js-quantity-label-${cartItemId}`
            ).innerHTML = quantity;
            saveCartToStorage();
          }
        });
      } else {
        alert("cart quantity should be between 0 to 10");
      }
      quantityInput.value = "";
      cartItemContainer.classList.remove("is-editing-quantity");
      updateCartQuantityForCheckout();
    });
  });

  //adding date to the delivery option
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let DOHTML = "";
    deliveryOptions.forEach((deliveryOption) => {
      let todayDate = dayjs();
      let deliveryDate = todayDate.add(deliveryOption.deliveryDays, "days");
      let dateFormatted = deliveryDate.format("dddd, MMMM D");
      let deliveryPrice =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${priceCentsToDollers(deliveryOption.priceCents)} -`;
      let isChecked =
        cartItem.deliveryOptionId === deliveryOption.id ? "checked" : "";

      DOHTML += `
      <div class="delivery-option js-delivery-option" data-cart-item-id="${cartItem.productId}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateFormatted}
          </div>
          <div class="delivery-option-price">
            ${deliveryPrice} Shipping
          </div>
          </div>
      </div>
    `;
    });
    return DOHTML;
  }
  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      const { cartItemId, deliveryOptionId } = option.dataset;
      updateDeliveryOption(cartItemId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}
