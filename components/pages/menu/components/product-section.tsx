import styled from "styled-components";

import { Category, useMenuQuery } from "api/queries/menu.graphql";
import { ProductCard } from "components/shared/product/product-card";
import { mediaQueries } from "styles/media-queries";
import { displayNameForCategory } from "utils/enum-to-display-name/category";

interface ProductSectionProps {
  category: Category;
}

export function ProductSection(props: ProductSectionProps): JSX.Element {
  const { category } = props;

  const { data } = useMenuQuery({
    variables: {
      category: category,
    },
  });

  return (
    <Section>
      <SectionHeader>{displayNameForCategory(category)}</SectionHeader>
      <Grid>
        {(data?.menu?.products || []).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Section>
  );
}

const Section = styled.section`
  margin-bottom: 64px;

  @media ${mediaQueries.phone} {
    margin-bottom: 50px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 22px;

  @media ${mediaQueries.phone} {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const SectionHeader = styled.h2`
  font-family: "Playfair Display";
`;
