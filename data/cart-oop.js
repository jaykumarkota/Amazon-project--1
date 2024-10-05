function Cart(localStorageKey) {
  const cart = {
    cartItems: undefined,

    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "DO1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "DO2",
        },
      ];
    },

    saveCartToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    findMatchingcartItem(productId) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });
      return matchingItem;
    },

    addProductToCart(productId, quantity = 1) {
      let matchingItem = this.findMatchingcartItem(productId);

      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        this.cartItems.push({
          productId,
          quantity,
          deliveryOptionId: "DO1",
        });
      }
      this.saveCartToStorage();
    },

    updateCartQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      return cartQuantity;
    },

    removeFromCart(productId) {
      let newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (productId !== cartItem.productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.updateCartQuantity();
      this.saveCartToStorage();
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem = this.findMatchingcartItem(productId);
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.saveCartToStorage();
    },
  };
  return cart;
}

const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");
cart.loadFromStorage();
businessCart.loadFromStorage();
console.log(cart, businessCart);
