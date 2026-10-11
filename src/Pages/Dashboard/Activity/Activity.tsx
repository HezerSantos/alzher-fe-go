import { useSearchParams } from "react-router-dom";
import { useGetActivityQuery } from "../../../services/dashboardService";
import DashboardContent from "../../../components/Dashboard/common/DashboardContent/DashboardContent";
import defaultContent from "../../../content/dashboardActivity";
import Toolbar from "../../../components/Dashboard/Activity/Toolbar/Toolbar";
import IncomeTable from "../../../components/Dashboard/Activity/IncomeTable/IncomeTable";
const Activity = () => {
  const [searchParams] = useSearchParams();
  const pageSize = Number(searchParams.get("pageSize")) ?? 10;
  const page = Number(searchParams.get("page")) ?? 1;
  const { data } = useGetActivityQuery({ pageSize, page });

  return (
    <>
      <DashboardContent header={defaultContent.title}>
        <Toolbar />
        <IncomeTable transactionItems={data?.transactionData} />
      </DashboardContent>
    </>
  );
};

export default Activity;
