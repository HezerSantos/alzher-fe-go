import { useCallback } from "react";
import useWidth from "../../../../../common/hooks/useWidth";
import { useAppDispatch } from "../../../../../reducers/hooks";
import Button from "../../../../common/Button/Button";
import RectangleLoader from "../../../../common/RectangleLoader/RectangleLoader";
import "./IncomeItem.scss";
import type { Categories } from "../../../../../services/dashboardService";
import { openTransactionModal } from "../../../../../reducers/dashboardSlice";

interface IncomeItemProps {
  id: string;
  category: Categories;
  description: string;
  date: string;
  amount: string;
}
const IncomeItem = ({
  id,
  category,
  description,
  date,
  amount,
}: IncomeItemProps) => {
  const width = useWidth();
  const dispatch = useAppDispatch();

  const toggleTransactionModal = useCallback(() => {
    const numberAmount = Number(amount);
    dispatch(
      openTransactionModal({
        tId: id,
        category,
        description,
        date,
        amount: numberAmount,
      }),
    );
  }, [id, category, description, date, amount]);

  if (width > 750) {
    return id !== "header" ? (
      <Button
        className="income-item"
        text=""
        onClick={() => toggleTransactionModal()}
      >
        <p>{category}</p>
        <p>{description}</p>
        <p>{date}</p>
        <p>{amount}</p>
      </Button>
    ) : (
      <div className="income-item income-item--header">
        <p>{category}</p>
        <p>{description}</p>
        <p>{date}</p>
        <p>{amount}</p>
      </div>
    );
  } else {
    return (
      <Button
        className="income-item income-item--mobile"
        text=""
        onClick={() => toggleTransactionModal()}
      >
        <div>
          <p>Category</p>
          <p>{category}</p>
        </div>
        <div>
          <p>Description</p>
          <p>{description}</p>
        </div>
        <div>
          <p>Date</p>
          <p>{date}</p>
        </div>
        <div>
          <p>Amount</p>
          <p>{amount}</p>
        </div>
      </Button>
    );
  }
};

export const MobileIncomeItemLoader = () => {
  return (
    <div className="income-item income-item--mobile">
      <div>
        <RectangleLoader width="28%" height="0.75rem" />
        <RectangleLoader width="42%" height="0.9rem" />
      </div>

      <div>
        <RectangleLoader width="32%" height="0.75rem" />
        <RectangleLoader width="25%" height="0.9rem" />
      </div>

      <div>
        <RectangleLoader width="20%" height="0.75rem" />
        <RectangleLoader width="35%" height="0.9rem" />
      </div>

      <div>
        <RectangleLoader width="25%" height="0.75rem" />
        <RectangleLoader width="30%" height="0.9rem" />
      </div>
    </div>
  );
};

export default IncomeItem;
