import { useGetActivityQuery } from "../../../services/dashboardService";
import DashboardContent from "../../../components/Dashboard/common/DashboardContent/DashboardContent";
import defaultContent from "../../../content/dashboardActivity";
import Toolbar from "../../../components/Dashboard/Activity/Toolbar/Toolbar";
import IncomeTable, {
  IncomeTableLoader,
} from "../../../components/Dashboard/Activity/IncomeTable/IncomeTable";
import { useAppDispatch, useAppSelector } from "../../../reducers/hooks";
import { useEffect } from "react";
import {
  decrementPage,
  incrementPage,
  setKeyWordLoading,
} from "../../../reducers/dashboardSlice";
import Button from "../../../components/common/Button/Button";
import "./Activity.scss";

const Activity = () => {
  const dispatch = useAppDispatch();
  const { keyWordLoading, pageSize, page } = useAppSelector(
    (s) => s.dashboard.activity,
  );
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
        <div className="activity-actions">
          <Button
            className="activity-actions__button"
            text="Prev"
            disabled={!data?.previousPageFlag || isFetching || keyWordLoading}
            onClick={() => dispatch(decrementPage())}
          />
          <Button
            className="activity-actions__button"
            text="Next"
            disabled={!data?.nextPageFlag || isFetching || keyWordLoading}
            onClick={() => dispatch(incrementPage())}
          />
        </div>
      </DashboardContent>
    </>
  );
};

export default Activity;
