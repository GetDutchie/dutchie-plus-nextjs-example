import styled from "styled-components";

interface CloseButtonProps {
  height?: number;
  width?: number;
  isDark?: boolean;
  onClick?: () => void;
}

export function CloseButton(props: CloseButtonProps): JSX.Element {
  const { height = 36, width = 36, isDark, onClick } = props;
  const color = isDark ? "#1f2b49" : "#ffffff";

  return (
    <StyledSvg
      width={width}
      height={height}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <circle cx="18" cy="18" r="17.5" stroke={color} />
      <path
        d="M22.8536 13.8539C23.0496 13.6578 23.0487 13.3407 22.8515 13.1456C22.6542 12.9506 22.3354 12.9516 22.1394 13.1477L13.1464 22.1461C12.9504 22.3422 12.9513 22.6593 13.1485 22.8544C13.3458 23.0494 13.6646 23.0484 13.8606 22.8523L22.8536 13.8539Z"
        fill={color}
      />
      <path
        d="M13.1464 13.8539C12.9504 13.6578 12.9513 13.3407 13.1485 13.1456C13.3458 12.9506 13.6646 12.9516 13.8606 13.1477L22.8536 22.1461C23.0496 22.3422 23.0487 22.6593 22.8515 22.8544C22.6542 23.0494 22.3354 23.0484 22.1394 22.8523L13.1464 13.8539Z"
        fill={color}
      />
    </StyledSvg>
  );
}

const StyledSvg = styled.svg`
  cursor: pointer;
`;
