import styled from "styled-components";

import { StrainType } from "api/fragments/menu-product.graphql";
import { displayNameForStrainType } from "utils/enum-to-display-name/strain-type";

interface StrainTypeLabelProps {
  strainType?: StrainType | null;
  className?: string;
}

const STRAIN_TYPE_LABEL_COLORS = new Map<
  StrainType,
  { color: string; backgroundColor: string; width: string }
>([
  [
    StrainType.Sativa,
    {
      backgroundColor: "rgba(245, 160, 133, 0.11);",
      color: "#F5A085",
      width: "60px",
    },
  ],
  [
    StrainType.Hybrid,
    {
      backgroundColor: "rgba(94, 186, 169, 0.11)",
      color: "#5EBAA9",
      width: "60px",
    },
  ],
  [
    StrainType.Indica,
    {
      backgroundColor: "rgba(130, 152, 252, 0.11);",
      color: "#8298FC",
      width: "60px",
    },
  ],
  [
    StrainType.HighCbd,
    {
      backgroundColor: "rgba(252, 130, 181, 0.11);",
      color: "#FC82B5",
      width: "78px",
    },
  ],
]);

export function StrainTypeLabel(
  props: StrainTypeLabelProps
): JSX.Element | null {
  const { strainType, className = "" } = props;

  if (!strainType || strainType === StrainType.NotApplicable) {
    return null;
  }

  return (
    <StyledStrainType strainType={strainType} className={className}>
      <Indicator strainType={strainType} />
      {displayNameForStrainType(strainType)}
    </StyledStrainType>
  );
}

const Indicator = styled.div<{ strainType: StrainType }>`
  background-color: ${({ strainType }) =>
    STRAIN_TYPE_LABEL_COLORS.get(strainType)?.color};
  border-radius: 100%;
  height: 7.5px;
  width: 7.5px;
`;

const StyledStrainType = styled.div<{ strainType: StrainType }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 4px;
  height: 20px;
  width: ${({ strainType }) => STRAIN_TYPE_LABEL_COLORS.get(strainType)?.width};

  font-size: 11px;
  font-weight: 700;

  color: ${({ strainType }) => STRAIN_TYPE_LABEL_COLORS.get(strainType)?.color};
  background-color: ${({ strainType }) =>
    STRAIN_TYPE_LABEL_COLORS.get(strainType)?.backgroundColor};
  border-radius: 3px;
  border: 1px solid;
  border-color: ${({ strainType }) =>
    STRAIN_TYPE_LABEL_COLORS.get(strainType)?.color};
`;
