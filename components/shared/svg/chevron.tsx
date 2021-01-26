import styled from "styled-components";

export enum ChevronDirection {
  Up = "up",
  Down = "down",
  Left = "left",
  Right = "right",
}

interface ChevronProps {
  direction?: ChevronDirection;
  color?: string;
  height?: number;
  width?: number;
}

function handleDirectionType(direction: ChevronDirection) {
  switch (direction) {
    case ChevronDirection.Up:
      return "transform: rotate(180deg)";
    case ChevronDirection.Left:
      return "transform: rotate(90deg)";
    case ChevronDirection.Right:
      return "transform: rotate(270deg)";
    case ChevronDirection.Down:
    default:
      return "";
  }
}

export function Chevron(props: ChevronProps): JSX.Element {
  const {
    direction = ChevronDirection.Down,
    color = "#ffffff",
    height = 9,
    width = 9,
  } = props;

  return (
    <StyledSvg
      direction={direction}
      width={width}
      height={height}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.37523 1.89748C7.61105 1.64801 7.99268 1.64801 8.22851 1.89748C8.46121 2.1403 8.46468 2.53757 8.23581 2.78482C8.23338 2.78722 8.23094 2.78981 8.22851 2.79239L4.83101 6.3259C4.59519 6.57187 4.21721 6.57187 3.98121 6.3259L0.58197 2.79239C0.349272 2.54956 0.34597 2.1523 0.574671 1.90523C0.577104 1.90246 0.579537 1.90006 0.58197 1.89748C0.817623 1.65059 1.1963 1.65059 1.43178 1.89748L4.40524 4.79625L7.37523 1.89748Z"
        fill={color}
      />
    </StyledSvg>
  );
}

const StyledSvg = styled.svg<{ direction: ChevronDirection }>`
  ${(props) => handleDirectionType(props.direction)}
`;
