export function formatPrice(number: number | null | undefined): string {
  if (!number) {
    return "n/a"; // TODO: revisit/refine this
  }
  // hardcoding en-US/USD for now
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
}
