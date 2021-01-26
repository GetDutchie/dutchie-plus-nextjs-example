import { useState } from "react";
import styled from "styled-components";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { Category } from "api/queries/menu.graphql";
import { ListCheckbox } from "components/shared/svg/list-checkbox";
import { displayNameForCategory } from "utils/enum-to-display-name/category";

import { MenuFilterHeader } from "./menu-filter-header";

const CATEGORIES = [
  Category.Flower,
  Category.Vaporizers,
  Category.Concentrates,
  Category.Edibles,
  Category.Tinctures,
  Category.Topicals,
  Category.Accessories,
  Category.PreRolls,
];

interface CategoryFilterProps {
  selectedCategories: Set<Category>;
  onCategorySelect: (category: Category) => void;
}

export function CategoryFilter(props: CategoryFilterProps): JSX.Element {
  const { selectedCategories, onCategorySelect } = props;
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(true);

  return (
    <Container>
      <MenuFilterHeader
        name="CATEGORY"
        onClick={() => setIsCategoryExpanded(!isCategoryExpanded)}
        isExpanded={isCategoryExpanded}
      />
      {isCategoryExpanded && (
        <StyledList>
          {CATEGORIES.map((category) => (
            <ListItem key={category} onClick={() => onCategorySelect(category)}>
              <ListItemIcon>
                <ListCheckbox isSelected={selectedCategories.has(category)} />
              </ListItemIcon>
              <ListItemText primary={displayNameForCategory(category)} />
            </ListItem>
          ))}
        </StyledList>
      )}
    </Container>
  );
}

const Container = styled.div`
  border-bottom: 1px solid #ddd9d2;

  &:last-of-type {
    border: none;
  }
`;

const StyledList = styled(List)`
  padding: 0px !important;

  & .MuiListItem-root {
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 0;
    cursor: pointer;
  }

  & .MuiTypography-root {
    font-size: 13px;
  }

  & .MuiListItemIcon-root {
    min-width: 35px;
  }
`;
