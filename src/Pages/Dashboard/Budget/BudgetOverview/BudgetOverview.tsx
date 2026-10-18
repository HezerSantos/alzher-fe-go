import BudgetItem, {
  BudgetItemLoader,
  CreateBudgetItem,
} from "../../../../components/Dashboard/Budget/BudgetItem/BudgetItem";
import { useGetAllBudgetsQuery } from "../../../../services/dashboardService";
import "./BudgetOverview.scss";

const BudgetOverview = () => {
  const { data, isLoading } = useGetAllBudgetsQuery();
  return (
    <>
      <div className="budget-overview">
        {isLoading ? (
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
