import { addProductToCart, cart, loadFromStorage } from "../../data/cart.js";

describe("Test suite: adding a product to cart", () => {
  // it("adds a new product to cart 1", () => {
  //   let cartLength = cart.length;
  //   console.log(cartLength);
  //   addProductToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
  //   expect(cart.length).toEqual(cartLength + 1);
  // });

  it("adds new product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    addProductToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
  it("adds an existing product to the cart", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "DO1",
        },
      ]);
    });
    loadFromStorage();
    addProductToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(3);
  });
});
