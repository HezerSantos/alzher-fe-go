import BudgetItem, {
  BudgetItemLoader,
  CreateBudgetItem,
} from "../../../../components/Dashboard/Budget/BudgetItem/BudgetItem";
import {
  useActivateBudgetMutation,
  useDeleteBudgetByIdMutation,
  useGetAllBudgetsQuery,
} from "../../../../services/dashboardService";
import "./BudgetOverview.scss";

const BudgetOverview = () => {
  const { data, isFetching } = useGetAllBudgetsQuery();
  const [activateBudget, { isLoading: isActiveLoading }] =
    useActivateBudgetMutation();
  const [deleteBudget, { isLoading: isDeletedLoding }] =
    useDeleteBudgetByIdMutation();
  return (
    <>
      <div className="budget-overview">
        {isFetching || isActiveLoading || isDeletedLoding ? (
          <>
            {[...Array(2)].map((_, i) => (
              <BudgetItemLoader key={i} />
            ))}
          </>
        ) : (
          <>
            {data?.budgets.map((budget) => {
              return (
                <BudgetItem
                  key={budget.id}
                  id={budget.id}
                  name={budget.name}
                  grossIncome={budget.grossIncome}
                  isActive={budget.isActive}
                  onToggleActive={() => {
                    activateBudget({ id: budget.id });
                  }}
                  onDelete={() => {
                    deleteBudget({ id: budget.id });
                  }}
                />
              );
            })}
            <CreateBudgetItem />
          </>
        )}
      </div>
    </>
  );
};

export default BudgetOverview;
