import { MenuProductFragment } from "api/fragments/menu-product.graphql";
import { formatPrice } from "./number-format";

interface DisplayPrices {
  med: string;
  rec: string;
}

export function deriveDisplayPrices(
  product: MenuProductFragment
): DisplayPrices {
  if (product.variants?.length === 0) {
    return {
      med: "n/a",
      rec: "n/a",
    };
  }

  const variant =
    product.variants?.length === 1
      ? product.variants[0]
      : product.variants?.find((variant) => variant.option === "1g");

  // TODO: handle specials
  return {
    med: variant?.priceMed ? formatPrice(variant.priceMed) : "n/a",
    rec: variant?.priceRec ? formatPrice(variant.priceRec) : "n/a",
  };
}
