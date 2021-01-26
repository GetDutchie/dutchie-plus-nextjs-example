import { StrainType } from "api/fragments/menu-product.graphql";

import { StrainTypeLabel } from "./strain-type-label";

export default {
  title: "Strain Type Label",
};

export const Sativa = (): JSX.Element => (
  <StrainTypeLabel strainType={StrainType.Sativa} />
);
export const Indica = (): JSX.Element => (
  <StrainTypeLabel strainType={StrainType.Indica} />
);
export const Hybrid = (): JSX.Element => (
  <StrainTypeLabel strainType={StrainType.Hybrid} />
);
export const HighCBD = (): JSX.Element => (
  <StrainTypeLabel strainType={StrainType.HighCbd} />
);
