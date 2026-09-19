import type React from "react";
import type { ReactElement } from "react";
import "./Home.scss";
interface HomeFeatureProps {
  featureComponent: ReactElement;
  featureName: string;
}

const HomeFeature: React.FC<HomeFeatureProps> = ({
  featureComponent,
  featureName,
}) => {
  return (
    <div className="home-feature">
      {featureComponent}

      <p>{featureName}</p>
    </div>
  );
};

export default HomeFeature;
