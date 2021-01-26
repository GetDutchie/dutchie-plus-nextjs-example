interface ListCheckboxProps {
  isSelected?: boolean;
}

export function ListCheckbox(props: ListCheckboxProps): JSX.Element {
  const { isSelected } = props;
  return isSelected ? (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="11" fill="#F4BD33" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 11.0665L7.37441 8.57501L9.51291 11.0125L15.2778 6L17 7.83508L9.46049 15.75L5 11.0665Z"
        fill="white"
      />
    </svg>
  ) : (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="11" cy="11" r="11" fill="#F4F2EC" />
    </svg>
  );
}
