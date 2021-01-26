import styled from "styled-components";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { CheckoutItemFragment } from "api/fragments/checkout-item.graphql";
import { CloseButton } from "components/shared/svg/close-button";
import { formatPrice } from "utils/number-format";

interface DesktopCartItemProps {
  item: CheckoutItemFragment;
  handleCheckoutQuantityUpdate: (
    item: CheckoutItemFragment,
    newQuantity: number
  ) => void;
  handleRemoveItemFromCheckout: (item: CheckoutItemFragment) => void;
  costOfCheckoutItem: (item: CheckoutItemFragment) => number;
}

const QUANTITIES = [1, 2, 3, 4, 5, 6, 7, 8];

export function DesktopCartItem(props: DesktopCartItemProps): JSX.Element {
  const {
    item,
    handleCheckoutQuantityUpdate,
    handleRemoveItemFromCheckout,
    costOfCheckoutItem,
  } = props;

  return (
    <CheckoutItem>
      <LeftSide>
        <CheckoutItemImageContainer>
          <CheckoutItemImage src={item.product.image} />
        </CheckoutItemImageContainer>
        <div>
          {item.product.brand?.name && <Brand>{item.product.brand.name}</Brand>}
          <ItemName>{item.product.name}</ItemName>
        </div>
      </LeftSide>

      <RightSide>
        <QuantitySelect
          value={item.quantity}
          onChange={(e) => {
            handleCheckoutQuantityUpdate(item, e.target.value as number);
          }}
          variant="outlined"
        >
          {QUANTITIES.map((quantity) => (
            <MenuItem key={quantity} value={quantity}>
              {quantity}
            </MenuItem>
          ))}
        </QuantitySelect>
        <Price>{formatPrice(costOfCheckoutItem(item))}</Price>
        <CloseButton
          height={20}
          width={20}
          onClick={() => handleRemoveItemFromCheckout(item)}
          isDark
        />
      </RightSide>
    </CheckoutItem>
  );
}

const CheckoutItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
`;

const Brand = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`;

const ItemName = styled.div`
  font-size: 14px;
  font-weight: 500;
  max-width: 190px;
`;

const Price = styled.div`
  font-size: 14px;
  width: 77px;
  text-align: center;
`;

const CheckoutItemImageContainer = styled.div`
  height: 70px;
  width: 70px;
  border: 1px solid rgba(160, 153, 142, 0.4);
  background-color: rgba(248, 245, 240, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 17px;
`;

const CheckoutItemImage = styled.img`
  height: 55px;
  width: 55px;
  object-fit: contain;
  mix-blend-mode: darken;
`;

// TODO: make a proper shared select component. currently the dropdown does not match specs.
const QuantitySelect = styled(Select)`
  width: 58px;
  height: 39px;
  border-radius: 0px !important;

  & .MuiSelect-select {
    font-size: 13px;
    padding: 14px 15px;
  }
`;
