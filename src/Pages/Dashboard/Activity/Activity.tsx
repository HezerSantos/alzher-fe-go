import { useSearchParams } from "react-router-dom";
import { useGetActivityQuery } from "../../../services/dashboardService";
import DashboardContent from "../../../components/Dashboard/common/DashboardContent/DashboardContent";
import defaultContent from "../../../content/dashboardActivity";
import Toolbar from "../../../components/Dashboard/Activity/Toolbar/Toolbar";
import IncomeTable, {
  IncomeTableLoader,
} from "../../../components/Dashboard/Activity/IncomeTable/IncomeTable";
import { useAppDispatch, useAppSelector } from "../../../reducers/hooks";
import { useEffect } from "react";
import { setKeyWordLoading } from "../../../reducers/dashboardSlice";
const Activity = () => {
  const [searchParams] = useSearchParams();
  const pageSize = Number(searchParams.get("pageSize")) ?? 10;
  const page = Number(searchParams.get("page")) ?? 1;
  const dispatch = useAppDispatch();
  const { keyWordLoading } = useAppSelector((s) => s.dashboard.activity);
  const { keyWord, categoryFilter } = useAppSelector(
    (s) => s.dashboard.activity,
  );
  const { data, isFetching } = useGetActivityQuery({
    pageSize,
    page,
    keyWord,
    categoryFilter,
  });

  const transactionKey =
    data?.transactionData?.map((t) => t.transactionId).join("-") ?? "";
  useEffect(() => {
    if (transactionKey || !isFetching) {
      dispatch(setKeyWordLoading(false));
    }
  }, [transactionKey, isFetching]);
  return (
    <>
      <DashboardContent header={defaultContent.title}>
        <Toolbar />
        {isFetching || keyWordLoading ? (
          <IncomeTableLoader />
        ) : (
          <IncomeTable transactionItems={data?.transactionData} />
        )}
      </DashboardContent>
    </>
  );
};

export default Activity;
