import DashboardContent from "../../components/Dashboard/common/DashboardContent/DashboardContent";
import defaultContent from "../../content/dashboardOverview";
import { useGetOverviewQuery } from "../../services/dashboardService";
const Overview = () => {
  const { data } = useGetOverviewQuery({ semester: 1, year: 2026 });
  return (
    <>
      <DashboardContent header={defaultContent.title}></DashboardContent>
    </>
  );
};

export default Overview;
