import { OrderType } from "api/queries/checkout.graphql";

const CHECKOUT_ORDER_TYPE_DISPLAY_NAME_MAP = new Map<OrderType, string>([
  [OrderType.Delivery, "Delivery"],
  [OrderType.Pickup, "Pickup"],
]);

export function displayNameForCheckoutOrderType(
  CheckoutOrderType: OrderType
): string {
  return (
    CHECKOUT_ORDER_TYPE_DISPLAY_NAME_MAP.get(CheckoutOrderType) || "unknown"
  );
}
