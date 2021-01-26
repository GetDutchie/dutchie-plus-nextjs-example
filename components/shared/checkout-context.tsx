import { createContext } from "react";
import { UseCheckoutResult } from "hooks/use-checkout";

export const CheckoutContext = createContext<UseCheckoutResult>({
  checkout: undefined,
  loading: false,
});
