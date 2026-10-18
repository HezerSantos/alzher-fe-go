import { Outlet } from "react-router-dom";
import DashboardContent from "../../../components/Dashboard/common/DashboardContent/DashboardContent";
import "./Budget.scss";

const Budget = () => {
  return (
    <>
      <DashboardContent header="Budget">
        <Outlet />
      </DashboardContent>
    </>
  );
};

export default Budget;
