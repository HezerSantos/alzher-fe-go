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
  initiateBudget,
  type Budget,
} from "../../../../reducers/dashboardSlice";
import {
  useCreateBudgetMutation,
  useLazyGetBudgetByIdQuery,
  useUpdateBudgetMutation,
  type BudgetSection as BudgetSectionType,
  type BudgetSectionItemRequest,
  type BudgetSectionRequest,
  type CreateBudgetRequest,
  type UpdateBudgetRequest,
  type BudgetSectionItem as BudgetSectionItemType,
} from "../../../../services/dashboardService";
import { useNavigate, useParams } from "react-router-dom";
import { setToast } from "../../../../reducers/toastSlice";
import BudgetViewLoader from "../../../../components/Dashboard/Budget/BudgetViewLoader/BudgetViewLoader";
import ErrorElement from "../../../../components/common/ErrorElement/ErrorElement";

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const selectedBudgetId = params.id ?? "";
  const [fetchBudgetById, { data, isLoading: isBudgetLoading }] =
    useLazyGetBudgetByIdQuery();
  const [createBudget, { isLoading, isError }] = useCreateBudgetMutation();
  const [updateBudget, { isLoading: isUpdateBudgetLoading }] =
    useUpdateBudgetMutation();
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

  const handleUpdateBudget = useCallback(async () => {
    const budget: UpdateBudgetRequest = {
      id: selectedBudgetId,
      budget: {
        id: selectedBudgetId,
        name: newBudget.name,
        grossIncome: Number(newBudget.grossIncome.replace(/,/g, "")),
        budgetSections: [],
      },
    };

    for (const [sectionId, section] of Object.entries(newBudget.sections)) {
      const budgetSection: BudgetSectionType = {
        id: sectionId,
        name: section.name,
        isDeductions: section.isDeductions,
        budgetId: selectedBudgetId,
        budgetSectionItems: [],
      };

      for (const itemId of section.itemIds) {
        const itemMeta = newBudget.items[itemId];

        const budgetSectionItem: BudgetSectionItemType = {
          id: itemId,
          budgetSectionId: sectionId,
          categoryName: itemMeta.categoryName,
          amount: Number(itemMeta.amount.replace(/,/g, "")),
        };
        budgetSection.budgetSectionItems.push(budgetSectionItem);
      }
      budget.budget.budgetSections.push(budgetSection);
    }

    try {
      await updateBudget({ ...budget }).unwrap();
      dispatch(setToast({ msg: "Success Updating Budget", error: false }));
    } catch {
      dispatch(setToast({ msg: "Error Updating Budget", error: true }));
    }
  }, [newBudget, selectedBudgetId]);

  useEffect(() => {
    if (!isCreate && selectedBudgetId != "") {
      fetchBudgetById({ id: selectedBudgetId });
    }
  }, [isCreate, selectedBudgetId]);

  useEffect(() => {
    if (!data || isCreate) {
      return;
    }

    const budget = data.budget;
    dispatch(initiateBudget(budget));
  }, [data]);

  if (isError) {
    return <ErrorElement refetch={() => {}} />;
  }

  if (isBudgetLoading || isUpdateBudgetLoading || isLoading) {
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
        {!isCreate && (
          <Button
            text="Update Budget"
            className="create-budget__submit"
            onClick={handleUpdateBudget}
            isLoading={isUpdateBudgetLoading}
          />
        )}
      </div>
    </div>
  );
};

export default BudgetView;
