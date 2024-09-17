import { cart } from "../../data/cart.js";
import { getMatchingDeliveryOption } from "../../data/deliveryOptions.js";
import { getMatchingProduct } from "../../data/products.js";
import { priceCentsToDollers } from "../utils/money.js";

export function renderPaymentSummary() {
  let itemsTotalCents = 0;
  let shippingCostCents = 0;
  cart.forEach((cartItem) => {
    let matchingProduct = getMatchingProduct(cartItem.productId);
    itemsTotalCents += matchingProduct.priceCents * cartItem.quantity;
    let deliveryOption = getMatchingDeliveryOption(cartItem.deliveryOptionId);
    shippingCostCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = itemsTotalCents + shippingCostCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCostCents = totalBeforeTaxCents + taxCents;
  const paymentSummaryHTML = `
  <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${priceCentsToDollers(
              itemsTotalCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${priceCentsToDollers(
              shippingCostCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${priceCentsToDollers(
              totalBeforeTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${priceCentsToDollers(
              taxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${priceCentsToDollers(
              totalCostCents
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
