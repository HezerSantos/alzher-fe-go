import type React from "react";
import "./PageSection.scss";

interface PageSectionProps {
  children: React.ReactNode;
  fixed?: boolean;
}
const PageSection = ({ children, fixed }: PageSectionProps) => {
  return (
    <>
      <section className={`page-section ${fixed ? "page-section--fixed" : ""}`}>
        <div className="page-section__child">{children}</div>
      </section>
    </>
  );
};

export default PageSection;
