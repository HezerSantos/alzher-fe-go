import type React from "react";
import { Link } from "react-router-dom";

import PageSection from "../common/PageSection/PageSection";
import home from "../../content/home";

const HomeHeader: React.FC = () => {
  return (
    <PageSection>
      <div className="home-header-wrapper">
        <header className="home-header">
          <div className="home-header__info">
            <h1>{home.header.heading}</h1>
            <p>{home.header.text}</p>

            <Link to="">{home.header.button}</Link>
          </div>
        </header>
      </div>
    </PageSection>
  );
};

export default HomeHeader;
