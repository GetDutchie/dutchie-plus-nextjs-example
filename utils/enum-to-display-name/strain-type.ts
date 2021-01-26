// TODO: generate enums that we can use generally instead of importing from specific queries like this
import { StrainType } from "api/fragments/menu-product.graphql";

const STRAIN_TYPE_DISPLAY_NAME_MAP = new Map<StrainType, string>([
  [StrainType.Sativa, "Sativa"],
  [StrainType.Hybrid, "Hybrid"],
  [StrainType.Indica, "Indica"],
  [StrainType.HighCbd, "High CBD"],
]);

export function displayNameForStrainType(strainType: StrainType): string {
  return STRAIN_TYPE_DISPLAY_NAME_MAP.get(strainType) || "unknown";
}
