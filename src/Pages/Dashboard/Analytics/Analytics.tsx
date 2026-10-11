import DashboardContent from "../../../components/Dashboard/common/DashboardContent/DashboardContent";
import { useGetAnalyticsQuery } from "../../../services/dashboardService";
import defaultContent from "../../../content/dashboardAnalytics";
import "./Analytics.scss";
import AnalyticsItem, {
  AnalyticsItemLoader,
} from "../../../components/Dashboard/Analytics/AnalyticsItem/AnalyticsItem";
import YearlyLineChart, {
  YearlyChartLoader,
} from "../../../components/Dashboard/common/Charts/YearlyChart/YearlyChart";
import ChartContainer from "../../../components/Dashboard/common/Charts/ChartContainer/ChartContainer";
import OverviewChart, {
  OverviewChartLoader,
} from "../../../components/Dashboard/common/Charts/OverviewChart/OverviewChart";
import { useEffect } from "react";
import DailyScatterChart, {
  DailyScatterChartLoader,
} from "../../../components/Dashboard/common/Charts/DailyChart/DailyChart";
const Analytics = () => {
  const { data, isFetching } = useGetAnalyticsQuery();

  const years = Object.keys(data?.overviewData?.[0] ?? {}).filter((key) =>
    /^(19\d{2}|20\d{2}|21\d{2})$/.test(key),
  );

  useEffect(() => {
    console.log(years);
  }, [years]);
  return (
    <>
      <DashboardContent header={defaultContent.title}>
        <div className="analytics-header">
          {isFetching ? (
            <>
              {[...Array(4)].map((_, i) => (
                <AnalyticsItemLoader key={i} />
              ))}
            </>
          ) : (
            <>
              {data?.dashboardAnalyticsInfo?.map((d, i) => {
                return (
                  <AnalyticsItem
                    key={`${d.header}-${i}`}
                    header={d.header}
                    amountSpent={d.amountSpent}
                    primarySubHeader={d.primarySubHeader}
                    primarySubValue={d.primarySubValue}
                    secondarySubHeader={d.secondarySubHeader}
                    secondarySubValue={d.secondarySubValue}
                  />
                );
              })}
            </>
          )}
        </div>
        <div className="analytics-charts">
          <ChartContainer header={defaultContent.yearly} isLoading={isFetching}>
            {isFetching ? (
              <YearlyChartLoader />
            ) : (
              <YearlyLineChart yearlyData={data?.yearlyData} />
            )}
          </ChartContainer>
          <ChartContainer
            header={defaultContent.monthly}
            isLoading={isFetching}
          >
            {isFetching ? (
              <OverviewChartLoader addBase={false} />
            ) : (
              <OverviewChart
                overviewData={data?.overviewData}
                yearOne={years?.[0] ?? "2026"}
                yearTwo={years?.[1] ?? false}
                addBase={false}
              />
            )}
          </ChartContainer>
          <ChartContainer header={defaultContent.daily} isLoading={isFetching}>
            {isFetching ? (
              <DailyScatterChartLoader />
            ) : (
              <DailyScatterChart scatterData={data?.scatterData} />
            )}
          </ChartContainer>
        </div>
      </DashboardContent>
    </>
  );
};

export default Analytics;
