import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import {
  useHomePageMenuQuery,
  Category,
} from "api/queries/home-page-menu.graphql";
import { DesktopOnly } from "components/shared/responsive/desktop-only";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { ProductCard } from "components/shared/product/product-card";
import { mediaQueries } from "styles/media-queries";
import { displayNameForCategory } from "utils/enum-to-display-name/category";

export const SHOP_SECTION_CATEGORIES = [
  Category.Flower,
  Category.Vaporizers,
  Category.Concentrates,
  Category.Edibles,
  Category.Tinctures,
  Category.Topicals,
];

type CategorySelectOption = Category | typeof ALL_TOP_PRODUCTS | undefined;

const ALL_TOP_PRODUCTS = "All top products";

export function ShopSection(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<
    CategorySelectOption
  >(ALL_TOP_PRODUCTS);

  const { data } = useHomePageMenuQuery({
    variables: {
      category:
        selectedCategory === ALL_TOP_PRODUCTS ? undefined : selectedCategory,
    },
  });

  return (
    <Section>
      <Header>Shop our best selling cannabis products.</Header>

      <DesktopOnly>
        <CategoryList>
          <CategoryListItem
            isSelected={selectedCategory === ALL_TOP_PRODUCTS}
            onClick={() => setSelectedCategory(ALL_TOP_PRODUCTS)}
          >
            All top products
          </CategoryListItem>
          {SHOP_SECTION_CATEGORIES.map((category) => (
            <CategoryListItem
              key={category}
              isSelected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {displayNameForCategory(category)}
            </CategoryListItem>
          ))}
        </CategoryList>
      </DesktopOnly>

      <MobileCategorySelectContainer>
        <MobileCategorySelect
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value as CategorySelectOption);
          }}
          variant="outlined"
        >
          <MenuItem key="all-top-products" value={ALL_TOP_PRODUCTS}>
            All top products
          </MenuItem>
          {SHOP_SECTION_CATEGORIES.map((category) => (
            <MenuItem key={category} value={category}>
              {displayNameForCategory(category)}
            </MenuItem>
          ))}
        </MobileCategorySelect>
      </MobileCategorySelectContainer>

      <Grid>
        {data?.menu?.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
      <CTAContainer>
        {selectedCategory && selectedCategory !== ALL_TOP_PRODUCTS ? (
          <Link href={`/menu?category=${selectedCategory}`} passHref>
            <CTA>Shop {displayNameForCategory(selectedCategory)}</CTA>
          </Link>
        ) : (
          <Link href="/menu" passHref>
            <CTA>Shop all products</CTA>
          </Link>
        )}
      </CTAContainer>
    </Section>
  );
}

const Section = styled.section`
  padding: 80px 0 100px;

  @media ${mediaQueries.phone} {
    padding: 70px 27px 80px;
  }
`;

const Header = styled.h2`
  font-size: 35px;
  font-weight: 700;
  text-align: center;
  color: #322f46;
  font-family: "Playfair Display";

  width: 340px;
  margin: 0 auto 70px;

  @media ${mediaQueries.phone} {
    font-size: 30px;
    margin-bottom: 36px;
  }
`;

const CategoryList = styled.ul`
  text-align: center;
  padding: 0;
  margin-bottom: 70px;
`;

const CategoryListItem = styled.li<{ isSelected: boolean }>`
  cursor: pointer;
  display: inline;
  margin-right: 55px;
  padding-bottom: 3px;

  &:last-of-type {
    margin-right: 0px;
  }

  ${(props) => props.isSelected && "border-bottom: 3px solid #F4BD33;"}
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 340px 340px 340px;
  gap: 22px;
  justify-content: center;
  margin-bottom: 100px;

  @media ${mediaQueries.largeTablet} {
    grid-template-columns: 340px 340px;
  }

  @media ${mediaQueries.largePhone} {
    grid-template-columns: 100%;
    margin-bottom: 60px;
  }
`;

const CTAContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CTA = styled.a`
  background-color: #5ea4ba;
  color: white;
  padding: 18px 35px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #246e84;
  }
`;

const MobileCategorySelect = styled(Select)`
  width: 100%;
  height: 58px;
  border-radius: 0px !important;
  margin-bottom: 24px;
  max-width: 323px;

  & .MuiSelect-select {
    font-size: 13px;
    padding: 14px 15px;
  }
`;

const MobileCategorySelectContainer = styled(MobileOnly)`
  display: flex;
  justify-content: center;
`;
