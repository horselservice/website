export function formatSek(amount) {
  return new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK" }).format(amount);
}

export function getDisplayPrice({ priceExVat, vatRate }, customerType) {
  const ex = Number(priceExVat);
  const rate = vatRate ?? 0.25;

  const amount = customerType === "private" ? ex * (1 + rate) : ex;
  const label = customerType === "private" ? "inkl. moms" : "exkl. moms";

  return `${formatSek(Math.round(amount))} ${label}`;
}

export function getOfferPriceNumber({ priceExVat, vatRate }, customerType) {
  const ex = Number(priceExVat);
  const rate = vatRate ?? 0.25;
  return customerType === "private" ? ex * (1 + rate) : ex;
}

export function getRentDisplayPrice(product, customerType) {
  if (typeof product.rentPriceExVat !== "number") return null;

  const vatRate = typeof product.vatRate === "number" ? product.vatRate : 0.25;
  const ex = product.rentPriceExVat;

  const amount =
    customerType === "private" ? ex * (1 + vatRate) : ex;

  const formatted = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
    maximumFractionDigits: 0,
  }).format(amount);

  return `${formatted} / månad ${
    customerType === "private" ? "inkl. moms" : "exkl. moms"
  }`;
}