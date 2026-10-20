import { Outlet } from "react-router-dom";
import ErrorLayer from "./components/Layers/ErrorLayer";
import { useAppSelector } from "./reducers/hooks";
import { ToastWrapper } from "./components/common/ToastMessage/ToastMessage";
import PopupModal from "./components/common/PopupModal/PopupModal";

function AlzherClient() {
  const toast = useAppSelector((s) => s.toast);
  const popup = useAppSelector((s) => s.popup);

  return (
    <>
      <ErrorLayer>
        {toast.isToast && <ToastWrapper />}
        {popup.isPopup && (
          <PopupModal
            text={popup.text}
            onAccept={popup.onAccept}
            onCancel={popup.onCancel}
            onAcceptText={popup.onAcceptText}
            onCancelText={popup.onCancelText}
          />
        )}
        <Outlet />
      </ErrorLayer>
    </>
  );
}

export default AlzherClient;
