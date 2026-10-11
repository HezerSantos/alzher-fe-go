import type { ReactNode } from "react";
import "./ChartContainer.scss";

interface ChartContainerProps {
  header: string;
  children: ReactNode;
}

const ChartContainer = ({ header, children }: ChartContainerProps) => {
  return (
    <section className="chart-container">
      <header className="chart-container__header">
        <span className="chart-container__accent" />
        <h2>{header}</h2>
      </header>

      <div className="chart-container__content">{children}</div>
    </section>
  );
};

export default ChartContainer;
