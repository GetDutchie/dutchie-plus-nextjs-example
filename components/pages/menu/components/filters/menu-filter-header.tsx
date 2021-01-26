import styled from "styled-components";

interface MenuFilterHeaderProps {
  name: string;
  onClick: () => void;
  isExpanded?: boolean;
}

export function MenuFilterHeader(props: MenuFilterHeaderProps): JSX.Element {
  const { name, onClick, isExpanded } = props;
  return (
    <Header onClick={onClick}>
      <span>{name}</span>
      <img src={isExpanded ? "icons/minus.svg" : "icons/plus.svg"} />
    </Header>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 67px;
  user-select: none;
  cursor: pointer;
`;
