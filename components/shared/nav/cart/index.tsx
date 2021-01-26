import { Fragment, useContext } from "react";
import styled from "styled-components";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

import Button from "@material-ui/core/Button";

import { OrderType, PricingType } from "api/queries/checkout.graphql";
import { CheckoutItemFragment } from "api/fragments/checkout-item.graphql";
import { useRemoveItemFromCheckoutMutation } from "api/mutations/remove-item-from-checkout.graphql";
import { useUpdateCheckoutItemQuantityMutation } from "api/mutations/update-checkout-item-quantity.graphql";
import { useUpdateCheckoutMutation } from "api/mutations/update-checkout.graphql";
import { Logo } from "components/shared/svg/logo";
import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { CheckoutContext } from "components/shared/checkout-context";
import { mediaQueries } from "styles/media-queries";
import { formatPrice } from "utils/number-format";
import { displayNameForCheckoutOrderType } from "utils/enum-to-display-name/checkout-order-type";

import { DesktopCartItem } from "./desktop-cart-item";
import { MobileCartItem } from "./mobile-cart-item";
import { LoadingSpinner } from "components/shared/loading-spinner";

interface CartProps {
  onClose: () => void;
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

export function Cart(props: CartProps): JSX.Element {
  const { onClose } = props;
  const { checkout, loading: isCheckoutLoading } = useContext(CheckoutContext);

  const checkoutId = checkout?.id || "";
  const checkoutItems = checkout?.items;
  const checkoutOrderType = checkout?.orderType || OrderType.Delivery;
  const otherOrderType =
    checkoutOrderType === OrderType.Delivery
      ? OrderType.Pickup
      : OrderType.Delivery;
  const checkoutPricingType = checkout?.pricingType;

  // MUTATIONS
  const [
    removeItemFromCheckout,
    { loading: isRemoveItemLoading },
  ] = useRemoveItemFromCheckoutMutation();
  async function handleRemoveItemFromCheckout(item: CheckoutItemFragment) {
    await removeItemFromCheckout({
      variables: {
        checkoutId,
        itemId: item.id,
      },
    });
  }

  const [
    updateCheckoutItemQuantity,
    { loading: isUpdateQuantityLoading },
  ] = useUpdateCheckoutItemQuantityMutation();
  async function handleCheckoutQuantityUpdate(
    item: CheckoutItemFragment,
    newQuantity: number
  ) {
    await updateCheckoutItemQuantity({
      variables: {
        checkoutId,
        itemId: item.id,
        quantity: newQuantity,
      },
    });
  }

  const [
    updateCheckout,
    { loading: isUpdateCheckoutLoading },
  ] = useUpdateCheckoutMutation();
  async function handleCheckoutOrderTypeToggle() {
    await updateCheckout({
      variables: {
        checkoutId,
        pricingType: checkoutPricingType || PricingType.Recreational,
        orderType: otherOrderType,
      },
    });
  }

  const isCheckoutOperationLoading =
    isCheckoutLoading ||
    isRemoveItemLoading ||
    isUpdateQuantityLoading ||
    isUpdateCheckoutLoading;

  const deliveryPickupToggle = (
    <DeliveryPickupToggle onClick={handleCheckoutOrderTypeToggle}>
      {`Switch to ${displayNameForCheckoutOrderType(otherOrderType)}`}
    </DeliveryPickupToggle>
  );

  const headerAndDeliveryInfo = (
    <>
      <Header>
        <HeaderLabel>
          Shopping Cart
          {isCheckoutOperationLoading && (
            <CheckoutLoadingSpinner isInline size={18} />
          )}
        </HeaderLabel>
        <HeaderCloseButton onClick={onClose}>Close</HeaderCloseButton>
      </Header>
      <DeliveryPickupSection>
        <DeliveryPickupInfo>
          <Logo height={49} width={98} isDark />
          <OrderTypeSection>
            <CompanyName>North Cannabis Co</CompanyName>
            <OrderTypeName>
              {displayNameForCheckoutOrderType(checkoutOrderType)}
              <MobileOnly>{deliveryPickupToggle}</MobileOnly>
            </OrderTypeName>
          </OrderTypeSection>
        </DeliveryPickupInfo>
        <DesktopOnly>{deliveryPickupToggle}</DesktopOnly>
      </DeliveryPickupSection>
    </>
  );

  if (!checkoutItems || checkoutItems.length === 0) {
    return (
      <Container>
        {headerAndDeliveryInfo}
        <EmptyCart>This cart is empty</EmptyCart>
      </Container>
    );
  }

  // These calculations will eventually come from the API
  function costOfCheckoutItem(item: CheckoutItemFragment): number {
    const itemPrice =
      item.product.variants.find((variant) => variant.option === item.option)
        ?.priceRec || 0;
    return itemPrice * item.quantity;
  }

  function totalCostDisplayValue(items: CheckoutItemFragment[]): string {
    const totalPrice = items.reduce((acc, item) => {
      return acc + costOfCheckoutItem(item);
    }, 0);
    return formatPrice(totalPrice);
  }

  return (
    <Container>
      {headerAndDeliveryInfo}

      <CheckoutItems>
        {checkoutItems.map((item) => (
          <Fragment key={item.id}>
            <DesktopCartItemContainer>
              <DesktopCartItem
                item={item}
                handleCheckoutQuantityUpdate={handleCheckoutQuantityUpdate}
                handleRemoveItemFromCheckout={handleRemoveItemFromCheckout}
                costOfCheckoutItem={costOfCheckoutItem}
              />
            </DesktopCartItemContainer>
            <MobileCartItemContainer>
              <MobileCartItem
                item={item}
                handleCheckoutQuantityUpdate={handleCheckoutQuantityUpdate}
                handleRemoveItemFromCheckout={handleRemoveItemFromCheckout}
                costOfCheckoutItem={costOfCheckoutItem}
              />
            </MobileCartItemContainer>
          </Fragment>
        ))}
      </CheckoutItems>

      <ButtonContainer>
        <StyledButton href={checkout?.redirectUrl}>
          Proceed to checkout - {totalCostDisplayValue(checkoutItems)}
        </StyledButton>
      </ButtonContainer>
    </Container>
  );
}

const CheckoutItems = styled.div`
  padding: 40px 30px 40px 25px;
`;

const Container = styled.div`
  width: 550px;

  @media ${mediaQueries.phone} {
    width: 100%;
  }
`;

const Header = styled.div`
  height: 87px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 25px 25px 29px;
  border-bottom: 1px solid rgba(160, 153, 142, 0.4);
`;

const HeaderLabel = styled.div`
  font-family: "Playfair Display";
  font-size: 20px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

const HeaderCloseButton = styled.button`
  border: 1px solid #d9d6d2;
  background-color: #ffffff;
  color: rgb(166, 161, 155);
  padding: 10px 29px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
`;

const DeliveryPickupSection = styled.div`
  height: 80px;
  padding: 13px 25px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(217, 214, 210, 0.5);
`;

const OrderTypeSection = styled.div`
  margin-left: 23px;
`;

const CompanyName = styled.div`
  font-weight: 500;
  font-size: 13px;
`;

const OrderTypeName = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: rgba(31, 43, 73, 0.6);
  display: inline;
`;

const DeliveryPickupInfo = styled.div`
  display: flex;
  align-items: end;
`;

const DeliveryPickupToggle = styled.button`
  color: #4a8ca0;
  background-color: transparent;
  text-decoration: underline;
  font-size: 12px;
  cursor: pointer;
  border: none;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 40px;
`;

const ButtonContainer = styled.div`
  margin: 0 25px;
`;

const StyledButton = styled(Button)`
  border-radius: 0px !important;
  text-transform: none !important;
  background-color: #5ea4ba !important;
  width: 100%;
  height: 58px;
  box-sizing: border-box;

  & .MuiButton-label {
    color: #ffffff !important;
  }

  &:hover {
    background-color: #246e84 !important;
  }
`;

const DesktopCartItemContainer = styled(DesktopOnly)`
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const MobileCartItemContainer = styled(MobileOnly)`
  margin-bottom: 32px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const CheckoutLoadingSpinner = styled(LoadingSpinner)`
  margin-left: 8px;
`;
