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
      </DashboardContent>
    </>
  );
};

export default Overview;
