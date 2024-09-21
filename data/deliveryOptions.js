import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: "DO1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "DO2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "DO3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getMatchingDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (deliveryOptionId === option.id) {
      deliveryOption = option;
    }
  });
  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
  let todayDate = dayjs();
  let deliveryDate = todayDate.add(deliveryOption.deliveryDays, "days");
  deliveryDate === "Saturday";
  let dateFormatted = deliveryDate.format("dddd, MMMM D");

  return dateFormatted;
}
