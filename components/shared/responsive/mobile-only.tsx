import { MediaQuery } from "./media-query";

interface MobileOnlyProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileOnly(props: MobileOnlyProps): JSX.Element {
  const { children, className = "" } = props;
  return (
    <MediaQuery breakpoint="sm" direction="down" className={className}>
      {children}
    </MediaQuery>
  );
}
