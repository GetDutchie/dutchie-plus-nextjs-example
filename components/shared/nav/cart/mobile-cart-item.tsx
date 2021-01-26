import styled from "styled-components";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { CheckoutItemFragment } from "api/fragments/checkout-item.graphql";
import { formatPrice } from "utils/number-format";

interface MobileCartItemProps {
  item: CheckoutItemFragment;
  handleCheckoutQuantityUpdate: (
    item: CheckoutItemFragment,
    newQuantity: number
  ) => void;
  handleRemoveItemFromCheckout: (item: CheckoutItemFragment) => void;
  costOfCheckoutItem: (item: CheckoutItemFragment) => number;
}

const QUANTITIES = [1, 2, 3, 4, 5, 6, 7, 8];

export function MobileCartItem(props: MobileCartItemProps): JSX.Element {
  const {
    item,
    handleCheckoutQuantityUpdate,
    handleRemoveItemFromCheckout,
    costOfCheckoutItem,
  } = props;

  return (
    <CheckoutItem>
      <CheckoutItemImageContainer>
        <CheckoutItemImage src={item.product.image} />
      </CheckoutItemImageContainer>
      <Center>
        {item.product.brand?.name && <Brand>{item.product.brand.name}</Brand>}
        <ItemName>{item.product.name}</ItemName>
        <QuantityAndCloseContainer>
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
          <CloseButton onClick={() => handleRemoveItemFromCheckout(item)}>
            Remove
          </CloseButton>
        </QuantityAndCloseContainer>
      </Center>
      <Price>{formatPrice(costOfCheckoutItem(item))}</Price>
    </CheckoutItem>
  );
}

const CheckoutItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  // TODO: checkout item shouldn't be concerned w/ spacing
  margin-bottom: 32px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
`;

const Brand = styled.div`
  font-size: 12px;
  margin-bottom: 5px;
`;

const ItemName = styled.div`
  font-size: 14px;
  font-weight: 500;
  max-width: 190px;
  margin-bottom: 7px;
`;

const Price = styled.div`
  font-size: 14px;
  text-align: center;
  margin-left: 20px;
`;

const CloseButton = styled.button`
  color: #4a8ca0;
  background-color: transparent;
  text-decoration: underline;
  font-size: 11px;
  cursor: pointer;
  border: none;
`;

const QuantityAndCloseContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CheckoutItemImageContainer = styled.div`
  height: 65px;
  width: 65px;
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
  width: 42px;
  height: 23px;
  border-radius: 0px !important;
  margin-right: 17px;

  & .MuiSelect-select {
    font-size: 13px;
    padding: 14px 7px;
    display: flex;
    align-items: center;

    :focus {
      background-color: transparent !important;
    }
  }

  & .MuiSelect-iconOutlined {
    right: 0 !important;
  }

  & .MuiSvgIcon-root {
    height: 21px;
    width: 21px;
  }
`;
