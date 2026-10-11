import type { ReactNode } from "react";
import { useAppSelector } from "../../../../reducers/hooks";
import "./DashboardContent.scss";

interface DashboardContentProps {
  children: ReactNode;
  header: string;
}
const DashboardContent = ({ header, children }: DashboardContentProps) => {
  const navOpen = useAppSelector((s) => s.dashboard.navOpen);
  return (
    <main
      className={`dashboard-content ${navOpen ? "dashboard-content--open" : "dashboard-content--closed"}`}
    >
      <h1>{header}</h1>
      {children}
    </main>
  );
};

export default DashboardContent;
