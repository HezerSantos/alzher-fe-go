import type React from "react";
import "./Home.scss";
interface HomeInformationElementProps {
  imageUrl: string;
  chartUrl: string;
  heading: string;
  text: string;
  reverse?: boolean;
}

const HomeInformationElement: React.FC<HomeInformationElementProps> = ({
  imageUrl,
  chartUrl,
  heading,
  text,
  reverse,
}) => {
  const image = (
    <div
      className="home-information__element-image"
      style={{
        background: `url(${imageUrl}) no-repeat center/cover`,
      }}
    >
      <h1>{heading}</h1>

      <p>{text}</p>

      <img src={chartUrl} alt="" className="responsive-chart-image" />
    </div>
  );

  const chart = (
    <div className="home-information__element-chart">
      <img src={chartUrl} alt="" />
    </div>
  );

  return (
    <div className="home-information__element">
      {reverse ? (
        <>
          {chart}
          {image}
        </>
      ) : (
        <>
          {image}
          {chart}
        </>
      )}
    </div>
  );
};

export default HomeInformationElement;
