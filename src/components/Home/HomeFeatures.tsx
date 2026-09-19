import type React from "react";
import { FaFileUpload } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";

import PageSection from "../common/PageSection/PageSection";
import HomeFeature from "./HomeFeature";
import home from "../../content/home";
import "./Home.scss";
const HomeFeatures: React.FC = () => {
  return (
    <PageSection>
      <div className="home-features">
        <h1>{home.features.heading}</h1>

        <div className="home-features__container">
          <HomeFeature
            featureComponent={<FaFileUpload />}
            featureName={home.features.items.uploadStatements}
          />

          <HomeFeature
            featureComponent={<MdOutlineDashboard />}
            featureName={home.features.items.organizedDashboards}
          />

          <HomeFeature
            featureComponent={<FaMoneyBillWave />}
            featureName={home.features.items.smarterSpending}
          />
        </div>
      </div>
    </PageSection>
  );
};

export default HomeFeatures;
