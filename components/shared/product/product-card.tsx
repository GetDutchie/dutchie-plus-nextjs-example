import { useState } from "react";
import styled from "styled-components";

import { MenuProductFragment } from "api/queries/menu.graphql";
import { deriveDisplayPrices } from "utils/product";

import { StrainTypeLabel } from "./strain-type-label";
import { ProductModal } from "./product-modal";

interface ProductCardProps {
  product: MenuProductFragment;
}

export function ProductCard(props: ProductCardProps): JSX.Element {
  const { product } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Container onClick={() => setIsModalOpen(true)}>
        <ProductImage src={product.image} />
        <DisplayPrice>
          {/* TODO: determine when to show med vs rec */}
          {deriveDisplayPrices(product).rec}
        </DisplayPrice>
        {product.brand?.name && <BrandName>{product.brand.name}</BrandName>}
        <ProductName>{product.name}</ProductName>
        <StrainTypeLabel strainType={product.strainType} />
      </Container>
      <ProductModal
        product={product}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

const Container = styled.div`
  background-color: rgba(248, 245, 240, 0.4);
  border: 1px solid rgba(160, 153, 142, 0.4);
  cursor: pointer;
  width: 100%;
  margin: 0 auto;

  padding: 25px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 186px;
  object-fit: contain;
  margin-bottom: 44px;
  mix-blend-mode: darken;
`;

const DisplayPrice = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const BrandName = styled.div`
  font-size: 13px;
  color: #1f2b49;
  opacity: 0.8;
  margin-bottom: 4px;
`;

const ProductName = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: #1f2b49;
  margin-bottom: 13px;
  max-width: 225px;
`;
