import { MediaQuery } from "./media-query";

interface MobileOnlyProps {
  children: React.ReactNode;
  className?: string;
}

export function DesktopOnly(props: MobileOnlyProps): JSX.Element {
  const { children, className = "" } = props;
  return (
    <MediaQuery breakpoint="md" direction="up" className={className}>
      {children}
    </MediaQuery>
  );
}
