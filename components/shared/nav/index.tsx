import { Category } from "api/queries/menu.graphql";
import { MobileOnly } from "components/shared/responsive/mobile-only";
import { DesktopOnly } from "components/shared/responsive/desktop-only";

import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

export interface NavProps {
  darkBackground?: boolean;
  page?: "menu"; // as more pages are added, add | page | page2 | etc;
  selectSingleCategory?: (category?: Category) => void;
}

export function Nav(props: NavProps): JSX.Element {
  return (
    <>
      <DesktopOnly>
        <DesktopNav {...props} />
      </DesktopOnly>
      <MobileOnly>
        <MobileNav {...props} />
      </MobileOnly>
    </>
  );
}
