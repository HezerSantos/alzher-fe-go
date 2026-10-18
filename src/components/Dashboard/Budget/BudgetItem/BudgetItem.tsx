import { useNavigate } from "react-router-dom";
import Button from "../../../common/Button/Button";
import IconBudget from "../../../common/Icons/IconBudget/IconBudget";
import "./BudgetItem.scss";
import { useAppDispatch } from "../../../../reducers/hooks";
import { setSelectedBudgetId } from "../../../../reducers/dashboardSlice";
import RectangleLoader from "../../../common/RectangleLoader/RectangleLoader";

interface BudgetItemProps {
  id: string;
  name: string;
  grossIncome: number;
  isActive: boolean;
}

interface BudgetStatusProps {
  isActive: boolean;
}

const BudgetStatus = ({ isActive }: BudgetStatusProps) => {
  return (
    <span
      className={`budget-status ${
        isActive ? "budget-status--active" : "budget-status--inactive"
      }`}
    >
      <span className="budget-status__indicator" />
      {isActive ? "Active" : "Inactive"}
    </span>
  );
};

const BudgetItem = ({ id, name, grossIncome, isActive }: BudgetItemProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Button
      text=""
      className={`budget-item ${
        isActive ? "budget-item--active" : "budget-item--inactive"
      }`}
      onClick={() => {
        dispatch(setSelectedBudgetId(id));
        navigate(`/dashboard/budget/${id}`);
      }}
    >
      <div className="budget-item__content">
        <div className="budget-item__header">
          <div className="budget-item__icon">
            <IconBudget />
          </div>

          <BudgetStatus isActive={isActive} />
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
            strokeWidth="1.8"
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
          strokeWidth="1.8"
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

export const BudgetItemLoader = () => {
  return (
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
};

export default BudgetItem;
