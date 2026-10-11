import { Outlet } from "react-router-dom";
import AuthLayer from "../../components/Layers/AuthLayer";
import NavBar from "../../components/Dashboard/common/NavBar/NavBar";

const Dashboard = () => {
  return (
    <>
      <AuthLayer>
        <NavBar />
        <Outlet />
      </AuthLayer>
    </>
  );
};

export default Dashboard;
