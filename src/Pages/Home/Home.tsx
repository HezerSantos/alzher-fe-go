import DefaultFooter from "../../components/common/DefaultFooter/DefaultFooter";
import DefaultNav from "../../components/common/DefaultNav/DefaultNav";
import HomeFeatures from "../../components/Home/HomeFeatures";
import HomeHeader from "../../components/Home/HomeHeader";
import HomeInformation from "../../components/Home/HomeInformation";
import HomeOverview from "../../components/Home/HomeOverview";

const Home = () => {
  return (
    <>
      <DefaultNav />
      <HomeHeader />
      <HomeFeatures />
      <HomeOverview />
      <HomeInformation />
      <DefaultFooter />
    </>
  );
};

export default Home;
