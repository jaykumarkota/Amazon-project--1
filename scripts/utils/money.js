export function priceCentsToDollers(priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}
//toFixed() method converts numbers into strings
