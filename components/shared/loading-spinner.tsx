import styled, { keyframes } from "styled-components";

interface LoadingSpinnerProps {
  size?: number;
  isInline?: boolean;
  color?: string;
  className?: string;
}

export function LoadingSpinner(props: LoadingSpinnerProps): JSX.Element {
  const {
    size = 32,
    isInline = false,
    color = "#f4bd33",
    className = "",
  } = props;
  return (
    <Outer size={size} isInline={isInline} className={className}>
      <Inner size={size} color={color} />
    </Outer>
  );
}

const rotate = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Outer = styled.div<{ size: number; isInline: boolean }>`
  display: ${(props) => (props.isInline ? "inline-block" : "block")};
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  animation: ${rotate} 1.5s linear infinite;
`;

const Inner = styled.span<{ size: number; color: string }>`
  height: ${(props) => props.size}px;
  width: ${(props) => props.size}px;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  clip: rect(
    ${(props) => props.size / 2}px,
    ${(props) => props.size}px,
    ${(props) => props.size}px,
    0
  );
  animation: ${rotate} 1s cubic-bezier(0.77, 0, 0.175, 1) infinite;

  &::before {
    box-sizing: border-box;
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: ${(props) => props.size}px;
    width: ${(props) => props.size}px;
    border: 3px solid transparent;
    border-top: 2px solid ${(props) => props.color};
    border-radius: 50%;
    animation: ${rotate} 1s cubic-bezier(0.77, 0, 0.175, 1) infinite;
  }

  &::after {
    box-sizing: border-box;
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    height: ${(props) => props.size}px;
    width: ${(props) => props.size}px;
    border: 2px solid ${(props) => props.color};
    border-radius: 50%;
  }
`;
