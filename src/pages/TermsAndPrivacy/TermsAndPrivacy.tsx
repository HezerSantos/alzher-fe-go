import type React from "react";

import DefaultNav from "../../components/common/DefaultNav/DefaultNav";
import PageSection from "../../components/common/PageSection/PageSection";
import termsAndPrivacy from "../../content/termsAndPrivacy";

import "./TermsAndPrivacy.scss";
import DefaultFooter from "../../components/common/DefaultFooter/DefaultFooter";

const TermsAndPrivacy: React.FC = () => {
  return (
    <>
      <DefaultNav />

      <PageSection>
        <main className="tap-main">
          {termsAndPrivacy.map((term) => (
            <section className="tap-item" key={term.header}>
              <h1>{term.header}</h1>

              {term.descriptions.map((description, index) => (
                <p key={index}>{description}</p>
              ))}
            </section>
          ))}
        </main>
      </PageSection>
      <DefaultFooter />
    </>
  );
};

export default TermsAndPrivacy;
