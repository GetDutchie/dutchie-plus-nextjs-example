import { useEffect, useState } from "react";

import { Checkout } from "api/fragments/checkout.graphql";
import { useCheckoutLazyQuery } from "api/queries/checkout.graphql";
import {
  useCreateCheckoutMutation,
  OrderType,
  PricingType,
} from "api/mutations/create-checkout.graphql";

import { useLocalStorage } from "./use-local-storage";

export interface UseCheckoutResult {
  checkout: Checkout | undefined;
  loading: boolean;
}

export function useCheckout(): UseCheckoutResult {
  // keep checkout id in local storage
  const [checkoutId, setCheckoutId] = useLocalStorage<string>(
    "dutchie-plus--checkout-id"
  );

  // mutation/query
  const [
    createCheckoutMutation,
    { data: createCheckoutData, loading: createCheckoutLoading },
  ] = useCreateCheckoutMutation();
  const [
    getCheckout,
    {
      data: getCheckoutData,
      error: getCheckoutError,
      loading: getCheckoutLoading,
    },
  ] = useCheckoutLazyQuery();

  const [checkout, setCheckout] = useState<Checkout>();

  useEffect(
    function fetchCheckout() {
      getCheckout({
        variables: {
          id: checkoutId,
        },
      });
    },
    [checkoutId, getCheckout]
  );

  useEffect(
    function createCheckoutIfNotFound() {
      async function createCheckout() {
        await createCheckoutMutation({
          variables: {
            // defaulting these for now
            orderType: OrderType.Delivery,
            pricingType: PricingType.Recreational,
          },
        });
      }

      // Create a new checkout if loading one was unsuccessful
      if (getCheckoutError) {
        createCheckout();
      }
    },
    [createCheckoutMutation, getCheckoutError]
  );

  useEffect(
    function setLoadedCheckout() {
      if (getCheckoutData?.checkout) {
        setCheckout(getCheckoutData?.checkout as Checkout);
      }
    },
    [getCheckoutData?.checkout, setCheckout]
  );

  useEffect(
    function setCreatedCheckout() {
      if (createCheckoutData?.createCheckout) {
        setCheckoutId(createCheckoutData?.createCheckout?.id || "");
      }
    },
    [createCheckoutData?.createCheckout, setCheckoutId]
  );

  return {
    checkout,
    loading: getCheckoutLoading || createCheckoutLoading,
  };
}
