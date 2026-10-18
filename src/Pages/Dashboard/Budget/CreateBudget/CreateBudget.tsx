import { useCallback, useEffect, useState } from "react";
import "./CreateBudget.scss";
import BudgetSection from "../../../../components/Dashboard/Budget/BudgetSection/BudgetSection";
import BudgetSectionItem from "../../../../components/Dashboard/Budget/BudgetSectionItem/BudgetSectionItem";
import Button from "../../../../components/common/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../../reducers/hooks";
import {
  addBudgetSection,
  changeBudgetGrossIncome,
} from "../../../../reducers/dashboardSlice";

type BudgetSectionId = string;
type BudgetSectionItemId = string;

interface Budget {
  name: string;
  grossIncome: number;
  sections: Record<BudgetSectionId, BudgetSection>;
  items: Record<BudgetSectionItemId, BudgetSectionItem>;
}

interface BudgetSection {
  name: string;
  isDeductions: boolean;
  itemIds: BudgetSectionItemId[];
}

interface BudgetSectionItem {
  categoryName: string;
  amount: number;
  sectionIds: BudgetSectionId[];
}

const CreateBudget = () => {
  const newBudget = useAppSelector((s) => s.dashboard.budget.createBudget);
  const dispatch = useAppDispatch();

  return (
    <div className="create-budget">
      <p className="create-budget__title">{newBudget.name}</p>

      <input
        className="create-budget__income"
        type="text"
        value={newBudget.grossIncome}
        onChange={(e) => dispatch(changeBudgetGrossIncome(e.target.value))}
        placeholder="Gross Income"
      />

      <div className="create-budget__sections">
        {Object.entries(newBudget.sections).map(([sectionId, section]) => (
          <BudgetSection key={sectionId} name={section.name} id={sectionId}>
            {section.itemIds.map((id) => {
              const itemMeta = newBudget.items[id];

              return (
                <BudgetSectionItem
                  key={id}
                  id={id}
                  amount={itemMeta.amount}
                  categoryName={itemMeta.categoryName}
                />
              );
            })}
          </BudgetSection>
        ))}

        <div className="create-budget__add-section">
          <Button
            text="Add Section"
            className="create-budget__add-section"
            onClick={() => dispatch(addBudgetSection())}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateBudget;
