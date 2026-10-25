import RectangleLoader from "../../../common/RectangleLoader/RectangleLoader";
import "./BudgetViewLoader.scss";

interface BudgetViewLoaderProps {
  sections?: number;
  itemsPerSection?: number;
}

const BudgetViewLoader = ({
  sections = 3,
  itemsPerSection = 2,
}: BudgetViewLoaderProps) => {
  return (
    <div className="budget-view-loader">
      <div className="budget-view-loader__title">
        <RectangleLoader width="40%" height="2.5rem" borderRadius="0.85rem" />
      </div>

      <div className="budget-view-loader__income-container">
        <RectangleLoader width="340px" height="3.2rem" borderRadius="0.85rem" />

        <div className="budget-view-loader__income-info">
          <RectangleLoader width="12rem" height="0.85rem" />
          <RectangleLoader width="9rem" height="1.75rem" />
        </div>
      </div>

      <div className="budget-view-loader__sections">
        {Array.from({ length: sections }).map((_, sectionIndex) => (
          <section className="budget-view-loader__section" key={sectionIndex}>
            <div className="budget-view-loader__section-header">
              <div className="budget-view-loader__section-heading">
                <RectangleLoader
                  width="10px"
                  height="10px"
                  borderRadius="50%"
                />
                <RectangleLoader
                  width="35%"
                  height="2.4rem"
                  borderRadius="0.65rem"
                />
              </div>

              <RectangleLoader
                width="32px"
                height="32px"
                borderRadius="0.65rem"
              />
            </div>

            <div className="budget-view-loader__items">
              {Array.from({ length: itemsPerSection }).map((_, itemIndex) => (
                <div className="budget-view-loader__item" key={itemIndex}>
                  <RectangleLoader
                    width="100%"
                    height="2.5rem"
                    borderRadius="0.65rem"
                  />

                  <div className="budget-view-loader__amount">
                    <RectangleLoader
                      width="100%"
                      height="2.5rem"
                      borderRadius="0.65rem"
                    />
                  </div>

                  <RectangleLoader
                    width="30px"
                    height="30px"
                    borderRadius="0.6rem"
                  />
                </div>
              ))}
            </div>

            <div className="budget-view-loader__section-footer">
              <RectangleLoader
                width="100%"
                height="44px"
                borderRadius="0.8rem"
              />
            </div>
          </section>
        ))}

        <RectangleLoader width="100%" height="50px" borderRadius="0.95rem" />
      </div>

      <div className="budget-view-loader__actions">
        <RectangleLoader width="100%" height="52px" borderRadius="0.95rem" />
      </div>
    </div>
  );
};

export default BudgetViewLoader;
