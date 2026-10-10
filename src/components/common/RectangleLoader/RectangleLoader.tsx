import "./RectangleLoader.scss";

interface RectangleLoaderProps {
  width?: string;
  height?: string;
  className?: string;
}

export default function RectangleLoader({
  width = "100%",
  height = "16px",
  className = "",
}: RectangleLoaderProps) {
  return (
    <div
      className={`rectangle-loader ${className}`}
      style={{ width, height }}
    />
  );
}
