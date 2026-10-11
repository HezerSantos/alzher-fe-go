import type { ReactNode } from "react";
import "./CategoryOverview.scss";

interface CategoryOverviewProps {
  children: ReactNode;
}
const CategoryOverview = ({ children }: CategoryOverviewProps) => {
  return <div className="category-overview">{children}</div>;
};

export default CategoryOverview;
