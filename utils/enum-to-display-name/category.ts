// TODO: generate enums that we can use generally instead of importing from specific queries like this
import { Category } from "api/fragments/menu-product.graphql";

const CATEGORY_DISPLAY_NAME_MAP = new Map<Category, string>([
  [Category.Flower, "Flower"],
  [Category.Vaporizers, "Vapes"],
  [Category.Concentrates, "Extracts"],
  [Category.Edibles, "Edibles"],
  [Category.Tinctures, "Tinctures"],
  [Category.Topicals, "Topicals"],
  [Category.Accessories, "Accessories"],
  [Category.Apparel, "Apparel"],
  [Category.Cbd, "CBD"],
  [Category.Clones, "Clones"],
  [Category.PreRolls, "Pre rolls"],
  [Category.Seeds, "Seeds"],
  [Category.NotApplicable, "Not applicable"],
]);

export function displayNameForCategory(category: Category): string {
  return CATEGORY_DISPLAY_NAME_MAP.get(category) || "unknown";
}
