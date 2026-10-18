import BudgetItem, {
  CreateBudgetItem,
} from "../../../../components/Dashboard/Budget/BudgetItem/BudgetItem";
import { useGetAllBudgetsQuery } from "../../../../services/dashboardService";
import "./BudgetOverview.scss";

const BudgetOverview = () => {
  const { data } = useGetAllBudgetsQuery();
  return (
    <>
      <div className="budget-overview">
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
      </div>
    </>
  );
};

export default BudgetOverview;
