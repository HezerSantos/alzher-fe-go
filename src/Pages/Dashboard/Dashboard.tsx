import { Outlet } from "react-router-dom";
import AuthLayer from "../../components/Layers/AuthLayer";
import NavBar from "../../components/Dashboard/common/NavBar/NavBar";
import TransactionModal from "../../components/Dashboard/Activity/TransactionModal/TransactionModal";

const Dashboard = () => {
  return (
    <>
      <AuthLayer>
        <NavBar />
        <Outlet />
        <TransactionModal />
      </AuthLayer>
    </>
  );
};

export default Dashboard;
