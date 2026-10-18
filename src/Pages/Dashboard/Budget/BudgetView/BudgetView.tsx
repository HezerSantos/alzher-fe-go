import { useCallback, useEffect } from "react";
import "./BudgetView.scss";
import BudgetSection from "../../../../components/Dashboard/Budget/BudgetSection/BudgetSection";
import BudgetSectionItem from "../../../../components/Dashboard/Budget/BudgetSectionItem/BudgetSectionItem";
import Button from "../../../../components/common/Button/Button";
import { useAppDispatch, useAppSelector } from "../../../../reducers/hooks";
import {
  addBudgetSection,
  changeBudgetGrossIncome,
  changeBudgetName,
  clearBudget,
  initiateBudget,
  type Budget,
} from "../../../../reducers/dashboardSlice";
import {
  useCreateBudgetMutation,
  useLazyGetBudgetByIdQuery,
  type BudgetSectionItemRequest,
  type BudgetSectionRequest,
  type CreateBudgetRequest,
} from "../../../../services/dashboardService";
import { useNavigate } from "react-router-dom";
import { setToast } from "../../../../reducers/toastSlice";
import BudgetViewLoader from "../../../../components/Dashboard/Budget/BudgetViewLoader/BudgetViewLoader";

const calculateAfterDeductions = (budget: Budget) => {
  // Strip out commas from grossIncome string before converting to a number
  const grossIncomeStr = String(budget.grossIncome).replace(/,/g, "");
  let total = Number(grossIncomeStr) || 0;

  for (const item of Object.values(budget.items)) {
    // Strip out commas from each item amount string before converting
    const amountStr = String(item.amount).replace(/,/g, "");
    total -= Number(amountStr) || 0;
  }

  return total;
};

interface BudgetViewProps {
  isCreate: boolean;
}

const BudgetView = ({ isCreate }: BudgetViewProps) => {
  const newBudget = useAppSelector((s) => s.dashboard.budget.createBudget);
  const selectedBudgetId = useAppSelector(
    (s) => s.dashboard.budget.selectedBudgetId,
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [fetchBudgetById, { data, isLoading: isBudgetLoading }] =
    useLazyGetBudgetByIdQuery();
  const [createBudget, { isLoading }] = useCreateBudgetMutation();

  const handleCreateBudget = useCallback(async () => {
    const createBudgetRequestBody: CreateBudgetRequest = {
      budgetName: newBudget.name,
      grossIncome: Number(newBudget.grossIncome.replace(/,/g, "")),
      budgetSections: [],
    };

    for (const [_, section] of Object.entries(newBudget.sections)) {
      const newSection: BudgetSectionRequest = {
        sectionName: section.name,
        isDeductions: section.isDeductions,
        budgetItems: [],
      };

      for (const itemId of section.itemIds) {
        const item = newBudget.items[itemId];

        const newItem: BudgetSectionItemRequest = {
          categoryName: item.categoryName,
          amount: Number(item.amount.replace(/,/g, "")),
        };
        newSection.budgetItems.push(newItem);
      }
      createBudgetRequestBody.budgetSections.push(newSection);
    }

    try {
      await createBudget(createBudgetRequestBody).unwrap();
      dispatch(setToast({ msg: "Success Creating Budget", error: false }));
      navigate("/dashboard/budget");
    } catch {
      dispatch(setToast({ msg: "Error Creating Budget", error: true }));
    }
  }, [newBudget]);

  useEffect(() => {
    if (!isCreate && selectedBudgetId != "") {
      fetchBudgetById({ id: selectedBudgetId });
    }
  }, [isCreate]);

  useEffect(() => {
    if (!data || isCreate) {
      return;
    }

    const budget = data.budget;
    dispatch(initiateBudget(budget));
  }, [data]);

  useEffect(() => {
    return () => {
      dispatch(clearBudget());
    };
  }, []);

  if (isBudgetLoading) {
    return <BudgetViewLoader />;
  }

  return (
    <div className="create-budget">
      <div className="create-budget__title">
        {" "}
        <input
          className="create-budget__income"
          type="text"
          value={newBudget.name}
          onChange={(e) => dispatch(changeBudgetName(e.target.value))}
          placeholder="Gross Income"
        />
      </div>

      <div className="create-budget__income-container">
        <input
          className="create-budget__income"
          type="text"
          value={newBudget.grossIncome}
          onChange={(e) => dispatch(changeBudgetGrossIncome(e.target.value))}
          placeholder="Gross Income"
        />
        <div className="create-budget__income-info">
          <p className="create-budget__income-label">
            After Deductions Remaining
          </p>
          $
          {calculateAfterDeductions(newBudget).toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </div>
      </div>

      <div className="create-budget__sections">
        {Object.entries(newBudget.sections).map(([sectionId, section]) => (
          <BudgetSection
            key={sectionId}
            name={section.name}
            id={sectionId}
            isDeductions={section.isDeductions}
          >
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

        <Button
          text="Add Section"
          className="create-budget__add-section"
          onClick={() => dispatch(addBudgetSection())}
        />
      </div>

      <div className="create-budget__actions">
        {isCreate && (
          <Button
            text="Create Budget"
            className="create-budget__submit"
            onClick={handleCreateBudget}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
};

export default BudgetView;
