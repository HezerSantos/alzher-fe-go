import "./RectangleLoader.scss";
interface RectangleLoaderProps {
  width: number;
  height: number;
}

const RectangleLoader = ({ width, height }: RectangleLoaderProps) => {
  return (
    <div
      className="rectangle-loader"
      style={{ width: `${width}rem`, height: `${height}rem` }}
    ></div>
  );
};

export default RectangleLoader;
