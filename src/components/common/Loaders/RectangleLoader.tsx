import "./RectangleLoader.scss";

interface RectangleLoaderProps {
  width: number | "100%";
  height: number | "100%";
}

const RectangleLoader = ({ width, height }: RectangleLoaderProps) => {
  return (
    <div
      className="rectangle-loader"
      style={{
        width: width === "100%" ? "100%" : `${width}rem`,
        height: height === "100%" ? "100%" : `${height}rem`,
      }}
    />
  );
};

export default RectangleLoader;
