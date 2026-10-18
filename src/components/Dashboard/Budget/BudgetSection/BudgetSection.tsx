import type { ReactNode } from "react";
import "./BudgetSection.scss";
import Button from "../../../common/Button/Button";
import IconTrash from "../../../common/Icons/IconTrash/IconTrash";
import { useAppDispatch } from "../../../../reducers/hooks";
import {
  addBudgetSectionItem,
  changeBudgetSectionName,
  deleteBudgetSection,
} from "../../../../reducers/dashboardSlice";

interface BudgetSectionProps {
  id: string;
  name: string;
  isDeductions: boolean;
  children: ReactNode;
}

const BudgetSection = ({
  id,
  name,
  isDeductions,
  children,
}: BudgetSectionProps) => {
  const dispatch = useAppDispatch();
  return (
    <section className="budget-section" data-section-id={id}>
      <div className="budget-section__header">
        <div className="budget-section__heading">
          <span className="budget-section__indicator" />
          <input
            type="text"
            value={name}
            onChange={(e) =>
              dispatch(changeBudgetSectionName({ id, name: e.target.value }))
            }
            readOnly={isDeductions}
          />
        </div>

        <Button
          text=""
          className="budget-section__remove-button"
          onClick={() => dispatch(deleteBudgetSection({ id }))}
          disabled={isDeductions}
        >
          <span className="budget-section__remove">
            <IconTrash width={"1.25rem"} height={"1.25rem"} />
          </span>
        </Button>
      </div>

      <div className="budget-section__items">{children}</div>

      <div className="budget-section__footer">
        <Button
          text="Add Item"
          className="budget-section__add-item"
          onClick={() => dispatch(addBudgetSectionItem({ id }))}
        />
      </div>
    </section>
  );
};

export default BudgetSection;
