import type React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

import PageSection from "../common/PageSection/PageSection";
import home from "../../content/home";
import "./Home.scss";
const HomeOverview: React.FC = () => {
  return (
    <PageSection>
      <div className="home-overview">
        <div>
          <h1>{home.overview.heading}</h1>

          <p>{home.overview.text}</p>

          <Link to="">
            {home.overview.button}
            <FaLongArrowAltRight />
          </Link>
        </div>
      </div>
    </PageSection>
  );
};

export default HomeOverview;
