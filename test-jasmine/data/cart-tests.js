import { addProductToCart, cart } from "../../data/cart.js";

describe("Test suite: adding a product to cart", () => {
  it("adds a new product to cart 1", () => {
    let cartLength = cart.length;
    console.log(cartLength);
    addProductToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.length).toEqual(cartLength + 1);
  });

  // it('adds new product')
});
