import { priceCentsToDollers } from "../../../scripts/utils/money.js";

describe("Test suite: format currency", () => {
  it("Converts cents into dollers", () => {
    expect(priceCentsToDollers(0)).toEqual("0.00");
  });
  it("Rounds up to the nearst integer", () => {
    expect(priceCentsToDollers(2000.5)).toEqual("20.01");
  });
  it("Converts cents into dollers", () => {
    expect(priceCentsToDollers(7099)).toEqual("70.99");
  });
});
