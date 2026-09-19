import type React from "react";
import "./PageSection.scss";

interface PageSectionProps {
  children: React.ReactNode;
}
const PageSection = ({ children }: PageSectionProps) => {
  return (
    <>
      <section className="page-section">
        <div className="page-section__child">{children}</div>
      </section>
    </>
  );
};

export default PageSection;
