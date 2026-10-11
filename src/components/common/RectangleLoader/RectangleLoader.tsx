import "./RectangleLoader.scss";

interface RectangleLoaderProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export default function RectangleLoader({
  width = "100%",
  height = "16px",
  borderRadius = "4px",
  className = "",
}: RectangleLoaderProps) {
  return (
    <div
      className={`rectangle-loader ${className}`}
      style={{ width, height, borderRadius }}
    />
  );
}
