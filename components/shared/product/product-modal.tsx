import { useState, useContext } from "react";
import styled from "styled-components";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Dialog from "@material-ui/core/Dialog";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import { useAddItemToCheckoutMutation } from "api/mutations/add-item-to-checkout.graphql";
import { MenuProductFragment } from "api/fragments/menu-product.graphql";
import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { CloseButton } from "components/shared/svg/close-button";
import { CartIcon } from "components/shared/svg/cart-icon";
import { CheckoutContext } from "components/shared/checkout-context";
import { LoadingSpinner } from "components/shared/loading-spinner";
import { mediaQueries } from "styles/media-queries";
import { deriveDisplayPrices } from "utils/product";
import { formatPrice } from "utils/number-format";

import { StrainTypeLabel } from "./strain-type-label";

interface ProductModalProps {
  product: MenuProductFragment;
  open: boolean;
  onClose: () => void;
}

const QUANTITIES = [1, 2, 3, 4, 5, 6, 7, 8];

export function ProductModal(props: ProductModalProps): JSX.Element {
  const { product, open, onClose } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { checkout } = useContext(CheckoutContext);

  const [selectedVariant, setSelectedVariant] = useState<string>(
    product.variants[0].option
  );
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [
    addItemToCheckoutMutation,
    { loading: addingToCart },
  ] = useAddItemToCheckoutMutation();

  function handleCloseClick() {
    onClose();
  }

  async function handleAddToCartClick() {
    await addItemToCheckoutMutation({
      variables: {
        checkoutId: checkout?.id || "",
        productId: product.id,
        quantity: selectedQuantity,
        option: selectedVariant,
      },
    });
    onClose();
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={isMobile ? undefined : "lg"}
      fullScreen={isMobile}
    >
      <DialogContent>
        <ImageContainer>
          <Image src={product.image} />
          <MobileOnly>
            <CloseButtonContainer>
              <CloseButton onClick={handleCloseClick} isDark />
            </CloseButtonContainer>
          </MobileOnly>
        </ImageContainer>

        <ContentContainer>
          <DesktopOnly>
            <CloseButtonContainer>
              <CloseButton onClick={handleCloseClick} isDark />
            </CloseButtonContainer>
          </DesktopOnly>

          <StyledStrainTypeLabel strainType={product.strainType} />

          {product.brand?.name && <Brand>{product.brand.name}</Brand>}

          <Name>{product.name}</Name>

          <DisplayPrice>{deriveDisplayPrices(product).rec}</DisplayPrice>

          <Description>{product.description}</Description>

          {product.potencyThc?.formatted && (
            <CanabanoidDetail>
              <CanabanoidLabel>THC:</CanabanoidLabel>{" "}
              {product.potencyThc.formatted}
            </CanabanoidDetail>
          )}
          {product.potencyCbd?.formatted && (
            <CanabanoidDetail>
              <CanabanoidLabel>CBD:</CanabanoidLabel>{" "}
              {product.potencyCbd.formatted}
            </CanabanoidDetail>
          )}
          <FormContainer>
            {product.variants.length > 1 && (
              <VariantSelect
                value={selectedVariant}
                onChange={(e) => {
                  setSelectedVariant(e.target.value as string);
                }}
                variant="outlined"
              >
                {product.variants.map((variant) => (
                  <MenuItem key={variant.option} value={variant.option}>
                    {variant.option} - {formatPrice(variant.priceRec)}
                  </MenuItem>
                ))}
              </VariantSelect>
            )}

            <QuantitySelect
              value={selectedQuantity}
              onChange={(e) => {
                setSelectedQuantity(e.target.value as number);
              }}
              variant="outlined"
            >
              {QUANTITIES.map((quantity) => (
                <MenuItem key={quantity} value={quantity}>
                  {quantity}
                </MenuItem>
              ))}
            </QuantitySelect>
            <StyledButton
              startIcon={<CartIcon />}
              onClick={handleAddToCartClick}
            >
              {addingToCart ? (
                <StyledLoadingSpinner size={16} color="#ffffff" />
              ) : (
                "Add to cart"
              )}
            </StyledButton>
          </FormContainer>
        </ContentContainer>
      </DialogContent>
    </Dialog>
  );
}

const StyledLoadingSpinner = styled(LoadingSpinner)`
  margin-right: 34px;
  margin-left: 34px;
`;
const StyledStrainTypeLabel = styled(StrainTypeLabel)`
  margin-bottom: 13px;

  @media ${mediaQueries.phone} {
    margin-bottom: 11px;
  }
`;

const StyledButton = styled(Button)`
  border-radius: 0px !important;
  text-transform: none !important;
  background-color: #5ea4ba !important;
  width: 165px;
  height: 58px;

  & .MuiButton-label {
    color: #ffffff !important;
  }

  @media ${mediaQueries.phone} {
    width: 100%;
    flex-shrink: 0;
  }

  &:hover {
    background-color: #246e84 !important;
  }
`;

const FormContainer = styled.div`
  height: 58px;
  display: flex;
  justify-content: stretch;
  margin-bottom: 61px;

  @media ${mediaQueries.phone} {
    height: 116px;
    display: block;
    margin-bottom: 0;
  }
`;

// TODO: make a proper shared select component. currently the dropdown does not match specs.
const StyledSelect = styled(Select)`
  border-radius: 0px !important;
  margin-right: 12px;
  height: 58px;

  & .MuiSelect-select {
    font-size: 13px;
    padding: 14px 18px;
  }

  @media ${mediaQueries.phone} {
    margin-bottom: 13px;
  }
`;

const VariantSelect = styled(StyledSelect)`
  width: 197px;
`;

const QuantitySelect = styled(StyledSelect)`
  width: 106px;

  @media ${mediaQueries.phone} {
    margin-right: 0;
  }
`;

const DialogContent = styled.div`
  display: flex;
  max-height: 700px;

  @media ${mediaQueries.phone} {
    flex-direction: column;
    max-height: auto;
  }
`;

const ImageContainer = styled.div`
  width: 450px;
  padding: 29px;
  flex-shrink: 0;
  background-color: rgba(248, 245, 240, 0.4);
  border-right: 1px solid rgba(160, 154, 142, 0.4);

  @media ${mediaQueries.phone} {
    padding: 0;
    width: 100%;
    border-right: none;
    border-bottom: 1px solid rgba(160, 154, 142, 0.4);
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  mix-blend-mode: darken;

  @media ${mediaQueries.phone} {
    height: 288px;
  }
`;

const ContentContainer = styled.div`
  width: 600px;
  flex-shrink: 0;
  padding: 80px 61px 47px;
  position: relative;
  overflow-y: auto;

  @media ${mediaQueries.phone} {
    width: 100%;
    padding: 27px 30px;
  }
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 20px;
`;

const Brand = styled.div`
  color: #1f2b49;
  font-size: 16px;

  @media ${mediaQueries.phone} {
    font-size: 14px;
  }
`;

const Name = styled.div`
  font-family: "Playfair Display";
  font-weight: 700;
  font-size: 30px;
  margin-bottom: 20px;

  @media ${mediaQueries.phone} {
    font-size: 23px;
  }
`;

const DisplayPrice = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 14px;
  margin-bottom: 34px;
  line-height: 27px;
  font-weight: 300;

  @media ${mediaQueries.phone} {
    font-size: 13px;
    line-height: 23px;
  }
`;

const CanabanoidDetail = styled.div`
  font-size: 13px;
  margin-bottom: 13px;

  & + & {
    margin-bottom: 50px;
  }

  @media ${mediaQueries.phone} {
    display: inline-block;
    margin-right: 24px;
    margin-bottom: 23px;

    & + & {
      margin-right: 0px;
      margin-bottom: 23px;
    }
  }
`;

const CanabanoidLabel = styled.span`
  font-weight: 600;
`;
