import styled from "styled-components";

interface UserIconProps {
  height?: number;
  width?: number;
  isDark?: boolean;
  className?: string;
  onClick?: () => void;
}

export function UserIcon(props: UserIconProps): JSX.Element {
  const { isDark, height = 23, width = 22, className = "", onClick } = props;
  const color = isDark ? "#1F2B49" : "#ffffff";
  return (
    <StyledSvg
      width={width}
      height={height}
      className={className}
      viewBox="0 0 22 23"
      fill={color}
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.9117 5.11013C15.9117 2.29172 13.619 -0.000976562 10.8006 -0.000976562C7.98215 -0.000976562 5.68945 2.29172 5.68945 5.11013C5.68945 7.92855 7.98215 10.2212 10.8006 10.2212C13.619 10.2212 15.9117 7.92855 15.9117 5.11013ZM7.14977 5.11013C7.14977 3.09855 8.78898 1.45934 10.8006 1.45934C12.8122 1.45934 14.4514 3.09855 14.4514 5.11013C14.4514 7.12172 12.8122 8.76093 10.8006 8.76093C8.78898 8.76093 7.14977 7.12172 7.14977 5.11013Z" />
      <path d="M0.578125 19.9469V22.2689C0.578125 22.6704 0.906696 22.999 1.30828 22.999H20.2924C20.694 22.999 21.0226 22.6704 21.0226 22.2689V19.9469C21.0226 15.5916 17.4776 12.0466 13.1223 12.0466H8.47844C4.12305 12.0466 0.578125 15.5916 0.578125 19.9469ZM8.47844 13.5069H13.1223C16.6745 13.5069 19.5623 16.3947 19.5623 19.9469V21.5387H2.03844V19.9469C2.03844 16.3947 4.92622 13.5069 8.47844 13.5069Z" />
    </StyledSvg>
  );
}

const StyledSvg = styled.svg`
  cursor: ${({ onClick }) => (onClick ? "pointer" : "auto")};
`;
