interface IconExpandProps {
  width?: string | number;
  height?: string | number;
}

const IconExpand = ({ width = "200px", height = "200px" }: IconExpandProps) => {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8"></path>
      <path d="M3 16.2V21m0 0h4.8M3 21l6-6"></path>
      <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6"></path>
      <path d="M3 7.8V3m0 0h4.8M3 3l6 6"></path>
    </svg>
  );
};

export default IconExpand;
