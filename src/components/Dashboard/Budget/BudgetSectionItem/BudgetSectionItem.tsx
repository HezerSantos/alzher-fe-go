import {
  changeBudgetSectionItem,
  deleteBudgetSectionItem,
} from "../../../../reducers/dashboardSlice";
import { useAppDispatch } from "../../../../reducers/hooks";
import Button from "../../../common/Button/Button";
import "./BudgetSectionItem.scss";

interface BudgetSectionItemProps {
  id: string;
  amount: string;
  categoryName: string;
}

const BudgetSectionItem = ({
  id,
  amount,
  categoryName,
}: BudgetSectionItemProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="budget-section-item" data-item-id={id}>
      <div className="budget-section-item__category">
        <input
          className="budget-section-item__input"
          type="text"
          value={categoryName}
          aria-label="Category name"
          placeholder="Category Name"
          onChange={(e) =>
            dispatch(
              changeBudgetSectionItem({
                id,
                value: e.target.value,
                key: "categoryName",
              }),
            )
          }
        />
      </div>

      <div className="budget-section-item__amount">
        <span className="budget-section-item__currency">$</span>
        <input
          className="budget-section-item__input budget-section-item__input--amount"
          type="text"
          value={amount}
          aria-label="Amount"
          onChange={(e) =>
            dispatch(
              changeBudgetSectionItem({
                id,
                value: e.target.value,
                key: "amount",
              }),
            )
          }
          placeholder="0"
        />
      </div>

      <div className="budget-section-item__actions">
        <Button
          text=""
          className="budget-section-item__remove-button"
          onClick={() => dispatch(deleteBudgetSectionItem({ id }))}
        >
          <span className="budget-section-item__remove">×</span>
        </Button>
      </div>
    </div>
  );
};

export default BudgetSectionItem;
