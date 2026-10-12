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
        <TransactionModal
          id="6918af3f-b2c6-4373-b190-a145f0fb1c8c"
          category="Merchandise"
          description="AMZN MKTP US*RW7Y73X51"
          date="2/27/2024"
          amount="184.54"
        />
      </AuthLayer>
    </>
  );
};

export default Dashboard;
