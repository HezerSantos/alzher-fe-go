import type { UnknownAction } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../../reducers/hooks";
import "./ToastMessage.scss";

import { useEffect } from "react";
import { clearToast } from "../../../reducers/toastSlice";
import IconClear from "../Icons/IconClear/IconClear";

interface ToastMessageProps {
  message: string;
  color: "red" | "green";
  width?: string;
  dispatchFn: () => UnknownAction;
}

const ToasMessage = ({
  message,
  color,
  width,
  dispatchFn,
}: ToastMessageProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(dispatchFn());
    }, 5000);

    return () => clearTimeout(timeout);
  }, [dispatch, message, color]);
  return (
    <div
      className={`toast-message toast-message--${color}`}
      style={{ width: width ?? "100%" }}
    >
      <p>{message}</p>

      <button onClick={() => dispatch(dispatchFn())}>
        <IconClear size={"1rem"} />
      </button>

      <div className="toast-message__timer" />
    </div>
  );
};

export const ToastWrapper = () => {
  const toast = useAppSelector((s) => s.toast);

  return (
    <div className="toast-wrapper">
      <ToasMessage
        message={toast.message}
        color={toast.color}
        dispatchFn={() => clearToast()}
      />
    </div>
  );
};

export default ToasMessage;
