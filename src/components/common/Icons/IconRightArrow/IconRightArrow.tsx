interface IconRightArrowProps {
  size?: number;
  flip?: boolean;
}

const IconRightArrow = ({ size = 28, flip }: IconRightArrowProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "rotate(180deg)" : "none" }}
    >
      <circle cx="14" cy="14" r="12.25" stroke="#0F172A" strokeWidth="1.5" />

      <path
        d="M9.333 14H18.667M14.583 18.083L18.667 14L14.583 9.917"
        stroke="#0F172A"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconRightArrow;
