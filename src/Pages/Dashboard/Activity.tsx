import { useSearchParams } from "react-router-dom";
import { useGetActivityQuery } from "../../services/dashboardService";

const Activity = () => {
  const [searchParams] = useSearchParams();
  const pageSize = Number(searchParams.get("pageSize")) ?? 10;
  const page = Number(searchParams.get("page")) ?? 1;
  const { data } = useGetActivityQuery({ pageSize, page });

  return <></>;
};

export default Activity;
