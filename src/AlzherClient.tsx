import { Outlet } from "react-router-dom";
import ErrorLayer from "./components/Layers/ErrorLayer";
import { useAppSelector } from "./reducers/hooks";
import { ToastWrapper } from "./components/common/ToastMessage/ToastMessage";

function AlzherClient() {
  const toast = useAppSelector((s) => s.toast);

  return (
    <>
      <ErrorLayer>
        {toast.isToast && <ToastWrapper />}
        <div id="popup-wrapper"></div>
        <Outlet />
      </ErrorLayer>
    </>
  );
}

export default AlzherClient;
