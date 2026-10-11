import { useEffect } from "react";
import DashboardContent from "../../components/Dashboard/common/DashboardContent/DashboardContent";
import HeaderCard, {
  HeaderCardControl,
  HeaderCardControlLoader,
  HeaderCardLoader,
} from "../../components/Dashboard/Overview/HeaderCard/HeaderCard";
import defaultContent from "../../content/dashboardOverview";
import { useAppSelector } from "../../reducers/hooks";
import { useGetOverviewQuery } from "../../services/dashboardService";
import "./Overview.scss";
import MonthItem, {
  MonthItemLoader,
} from "../../components/Dashboard/Overview/MonthItem/MonthItem";
import OverviewChart, {
  OverviewChartLoader,
} from "../../components/Dashboard/common/Charts/OverviewChart/OverviewChart";

const Overview = () => {
  const { semester, year } = useAppSelector((s) => s.dashboard.overview);
  const { data, isFetching, refetch } = useGetOverviewQuery({ semester, year });

  useEffect(() => {
    refetch();
  }, [semester, year]);
  return (
    <>
      <DashboardContent header={defaultContent.title}>
        <div className="overview-header">
          {isFetching ? (
            <>
              <HeaderCardControlLoader />
              {[...Array(3)].map((_, i) => (
                <HeaderCardLoader key={i} />
              ))}
            </>
          ) : (
            <>
              <HeaderCardControl yearList={data?.yearList} />
              {data?.overviewDetailsItems.map((d, i) => {
                return (
                  <HeaderCard
                    key={i}
                    header={d.header}
                    price={d.price}
                    details={d.details}
                  />
                );
              })}
            </>
          )}
        </div>
        <div className="overview-charts">
          <div className="overview-charts__month-items">
            {isFetching ? (
              <>
                {[...Array(6)].map((_, i) => (
                  <MonthItemLoader key={i} />
                ))}
              </>
            ) : (
              <>
                {data?.monthItems?.map((mi, i) => {
                  return (
                    <MonthItem
                      key={i}
                      month={mi.month}
                      year={mi.year}
                      lowestCategory={mi.lowestCategory}
                      highestCategory={mi.highestCategory}
                      totalSpent={mi.totalSpent}
                    />
                  );
                })}
              </>
            )}
          </div>
          {isFetching ? (
            <>
              <OverviewChartLoader />
            </>
          ) : (
            <>
              <OverviewChart
                overviewData={data?.chartData}
                yearOne={data?.year ?? "2026"}
                yearTwo={false}
              />
            </>
          )}
        </div>
      </DashboardContent>
    </>
  );
};

export default Overview;
