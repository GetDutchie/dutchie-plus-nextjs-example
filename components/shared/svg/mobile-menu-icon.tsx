import styled from "styled-components";

interface MobileMenuIconProps {
  height?: number;
  width?: number;
  isDark?: boolean;
  onClick?: () => void;
}

export function MobileMenuIcon(props: MobileMenuIconProps): JSX.Element {
  const { height = 14, width = 36, isDark, onClick } = props;
  const color = isDark ? "#1f2b49" : "#ffffff";

  return (
    <StyledSvg
      width={width}
      height={height}
      viewBox="0 0 36 14"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <rect y="0.12439" width={width} height="1" />
      <rect y="6.12439" width={width} height="1" />
      <rect y="12.1244" width={width} height="1" />
    </StyledSvg>
  );
}

const StyledSvg = styled.svg`
  cursor: pointer;
`;
