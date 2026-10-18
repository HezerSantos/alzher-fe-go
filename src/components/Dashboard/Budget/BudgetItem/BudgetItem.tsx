import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../common/Button/Button";
import IconBudget from "../../../common/Icons/IconBudget/IconBudget";
import IconTrash from "../../../common/Icons/IconTrash/IconTrash";
import "./BudgetItem.scss";
import { useAppDispatch } from "../../../../reducers/hooks";
import { setSelectedBudgetId } from "../../../../reducers/dashboardSlice";
import RectangleLoader from "../../../common/RectangleLoader/RectangleLoader";

interface BudgetItemProps {
  id: string;
  name: string;
  grossIncome: number;
  isActive: boolean;
  onToggleActive?: (id: string, isActive: boolean) => void;
  onDelete?: (id: string) => void;
}

interface BudgetStatusProps {
  isActive: boolean;
}

const BudgetStatus = ({ isActive }: BudgetStatusProps) => (
  <span
    className={`budget-status ${
      isActive ? "budget-status--active" : "budget-status--inactive"
    }`}
  >
    <span className="budget-status__indicator" />
    {isActive ? "Active" : "Inactive"}
  </span>
);

const BudgetItem = ({
  id,
  name,
  grossIncome,
  isActive,
  onToggleActive,
  onDelete,
}: BudgetItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handleOpenBudget = () => {
    dispatch(setSelectedBudgetId(id));
    navigate(`/dashboard/budget/${id}`);
  };

  return (
    <Button
      text=""
      className={`budget-item ${
        isActive ? "budget-item--active" : "budget-item--inactive"
      }`}
      onClick={handleOpenBudget}
    >
      <div className="budget-item__content">
        <div className="budget-item__header">
          <div className="budget-item__icon">
            <IconBudget />
          </div>

          <div className="budget-item__actions">
            <BudgetStatus isActive={isActive} />

            <div
              className="budget-item__menu-wrapper"
              ref={menuRef}
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="budget-item__menu-trigger"
                aria-label={`Options for ${name}`}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                onClick={(event) => {
                  event.stopPropagation();
                  setMenuOpen((open) => !open);
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <circle cx="5" cy="12" r="1.8" />
                  <circle cx="12" cy="12" r="1.8" />
                  <circle cx="19" cy="12" r="1.8" />
                </svg>
              </button>

              {menuOpen && (
                <div
                  className="budget-item__menu"
                  role="group"
                  aria-label={`${name} options`}
                >
                  <Button
                    text=""
                    type="button"
                    className="budget-item__menu-option budget-item__menu-toggle"
                    aria-pressed={isActive}
                    onClick={(e) => {
                      e?.stopPropagation();
                      onToggleActive?.(id, !isActive);
                      setMenuOpen(false);
                    }}
                    disabled={isActive}
                  >
                    <span className="budget-item__menu-toggle-label">
                      Active
                    </span>

                    <span
                      className={`budget-item__switch ${
                        isActive ? "budget-item__switch--active" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </Button>

                  <div className="budget-item__menu-divider" />

                  <button
                    type="button"
                    className="budget-item__menu-option budget-item__menu-option--delete"
                    onClick={(event) => {
                      event.stopPropagation();
                      onDelete?.(id);
                      setMenuOpen(false);
                    }}
                  >
                    <IconTrash />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="budget-item__details">
          <div className="budget-item__text">
            <h3 className="budget-item__name">{name}</h3>
            <p className="budget-item__amount">
              {grossIncome.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </p>
          </div>

          <svg
            className="budget-item__arrow"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </Button>
  );
};

export const CreateBudgetItem = () => {
  const navigate = useNavigate();

  return (
    <Button
      text=""
      className="create-budget-item"
      onClick={() => navigate("/dashboard/budget/create")}
    >
      <span className="create-budget-item__icon">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </span>

      <span className="create-budget-item__label">Create budget</span>
    </Button>
  );
};

export const BudgetItemLoader = () => (
  <div className="budget-item-loader">
    <div className="budget-item-loader__header">
      <RectangleLoader width="2.75rem" height="2.75rem" borderRadius="12px" />
      <RectangleLoader width="5rem" height="1.5rem" borderRadius="20px" />
    </div>

    <div className="budget-item-loader__details">
      <div className="budget-item-loader__text">
        <RectangleLoader width="65%" height="1.1rem" />
        <RectangleLoader width="45%" height="1.5rem" />
      </div>
      <RectangleLoader width="1.25rem" height="1.25rem" borderRadius="50%" />
    </div>
  </div>
);

export default BudgetItem;
