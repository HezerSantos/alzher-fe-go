import type React from "react";

import informationImageOne from "../../assets/images/information-image-two.webp";
import chartTwo from "../../assets/images/chart-example-two.webp";

import informationImageTwo from "../../assets/images/information-image-one.webp";
import chartOne from "../../assets/images/chart-example-one.webp";

import PageSection from "../common/PageSection/PageSection";
import HomeInformationElement from "./HomeInformationElement";
import home from "../../content/home";
import "./Home.scss";

const HomeInformation: React.FC = () => {
  return (
    <PageSection>
      <div className="home-information">
        <HomeInformationElement
          imageUrl={informationImageOne}
          chartUrl={chartTwo}
          heading={home.information.visualizeFinances.heading}
          text={home.information.visualizeFinances.text}
        />

        <HomeInformationElement
          imageUrl={informationImageTwo}
          chartUrl={chartOne}
          heading={home.information.trackWhatMatters.heading}
          text={home.information.trackWhatMatters.text}
          reverse
        />
      </div>
    </PageSection>
  );
};

export default HomeInformation;
