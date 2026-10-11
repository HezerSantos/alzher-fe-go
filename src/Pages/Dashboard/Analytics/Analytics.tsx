import DashboardContent from "../../../components/Dashboard/common/DashboardContent/DashboardContent";
import { useGetAnalyticsQuery } from "../../../services/dashboardService";
import defaultContent from "../../../content/dashboardAnalytics";
import "./Analytics.scss";
import AnalyticsItem, {
  AnalyticsItemLoader,
} from "../../../components/Dashboard/Analytics/AnalyticsItem/AnalyticsItem";
import YearlyLineChart from "../../../components/Dashboard/common/Charts/YearlyChart/YearlyChart";
import ChartContainer from "../../../components/Dashboard/common/Charts/ChartContainer/ChartContainer";
const Analytics = () => {
  const { data, isFetching } = useGetAnalyticsQuery();
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
          <ChartContainer header={defaultContent.yearly}>
            <YearlyLineChart yearlyData={data?.yearlyData} />
          </ChartContainer>
        </div>
      </DashboardContent>
    </>
  );
};

export default Analytics;
