import type React from "react";
import { Link } from "react-router-dom";

import IconLogo from "../Icons/IconLogo/IconLogo";
import PageSection from "../PageSection/PageSection";
import defaultFooter from "../../../content/defaultFooter";

import "./DefaultFooter.scss";

const DefaultFooter: React.FC = () => {
  return (
    <PageSection>
      <footer className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-column__header">
            <IconLogo width={48} height={48} />
            <h3>{defaultFooter.header.title}</h3>
            <p>{defaultFooter.header.copyright}</p>
          </div>

          <div>
            <h3>{defaultFooter.quickLinks.heading}</h3>
            <Link to="/">{defaultFooter.quickLinks.home}</Link>
            <Link to="/">{defaultFooter.quickLinks.aboutUs}</Link>
          </div>

          <div>
            <h3>{defaultFooter.resources.heading}</h3>
            <Link to="/">{defaultFooter.resources.siteMap}</Link>
            <Link to="/">{defaultFooter.resources.security}</Link>
          </div>

          <div>
            <h3>{defaultFooter.additionalInfo.heading}</h3>
            <Link to="/">{defaultFooter.additionalInfo.terms}</Link>
            <Link to="/">{defaultFooter.additionalInfo.privacyPolicy}</Link>
          </div>
        </div>
      </footer>
    </PageSection>
  );
};

export default DefaultFooter;
