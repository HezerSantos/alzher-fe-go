import { Outlet } from "react-router-dom";
import AuthLayer from "../../components/Layers/AuthLayer";

const Dashboard = () => {
  return (
    <>
      <AuthLayer>
        <Outlet />
      </AuthLayer>
    </>
  );
};

export default Dashboard;
