import type { TransactionItem } from "../../../../services/dashboardService";
import IncomeItem from "./IncomeItem/IncomeItem";
import "./IncomeTable.scss";
interface IncomeTableProps {
  transactionItems?: TransactionItem[];
}
const IncomeTable = ({ transactionItems }: IncomeTableProps) => {
  return (
    <div className="income-table">
      <IncomeItem
        id="header"
        category="Category"
        description="Description"
        date="Date"
        amount="Amount"
      />
      {transactionItems?.map((t) => {
        return (
          <IncomeItem
            key={t.transactionId}
            id={t.transactionId}
            category={t.category}
            description={t.description}
            date={t.transactionDate}
            amount={t.transactionAmount}
          />
        );
      })}
    </div>
  );
};

export default IncomeTable;
