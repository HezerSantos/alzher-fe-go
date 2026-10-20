import { useEffect } from "react";
import Button from "../Button/Button";
import "./PopupModal.scss";

interface PopupModalProps {
  text: string;
  onAcceptText: string;
  onCancelText: string;
  onAccept: () => void;
  onCancel: () => void;
}

const PopupModal = ({
  text,
  onAccept,
  onCancel,
  onAcceptText,
  onCancelText,
}: PopupModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div
      className="popup-modal"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <div
        className="popup-modal__content"
        role="dialog"
        aria-modal="true"
        aria-label={text}
      >
        <div className="popup-modal__icon" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
            <path d="M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z" />
          </svg>
        </div>

        <p className="popup-modal__text">{text}</p>

        <div className="popup-modal__actions">
          <Button
            text={onCancelText}
            onClick={onCancel}
            className="popup-modal__cancel"
          />
          <Button
            text={onAcceptText}
            onClick={() => {
              onAccept();
              setTimeout(() => {
                onCancel();
              }, 0);
            }}
            className="popup-modal__accept"
          />
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
