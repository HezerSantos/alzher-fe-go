import type { ReactNode } from "react";
import "./ChartContainer.scss";
import RectangleLoader from "../../../../common/RectangleLoader/RectangleLoader";

interface ChartContainerProps {
  header: string;
  children: ReactNode;
  isLoading: boolean;
}

const ChartContainer = ({
  header,
  children,
  isLoading,
}: ChartContainerProps) => {
  return (
    <section className="chart-container">
      {isLoading ? (
        <RectangleLoader width="6rem" height="1.5rem" />
      ) : (
        <header className="chart-container__header">
          <span className="chart-container__accent" />
          <h2>{header}</h2>
        </header>
      )}

      <div className="chart-container__content">{children}</div>
    </section>
  );
};

export default ChartContainer;
