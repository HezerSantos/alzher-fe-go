import DashboardContent from "../../../components/Dashboard/common/DashboardContent/DashboardContent";
import FileUpload from "../../../components/Dashboard/Scan/FileUpload/FileUpload";
import "./Scan.scss";
const Scan = () => {
  return (
    <>
      <DashboardContent header="Scan">
        <FileUpload />
      </DashboardContent>
    </>
  );
};

export default Scan;
