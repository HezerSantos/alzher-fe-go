import type { TransactionItem } from "../../../../services/dashboardService";
import RectangleLoader from "../../../common/RectangleLoader/RectangleLoader";
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

export const IncomeTableLoader = () => {
  return (
    <div className="income-table income-table--loading">
      <div className="income-item income-table-loader__header">
        <RectangleLoader width="55%" height="0.8rem" />
        <RectangleLoader width="65%" height="0.8rem" />
        <RectangleLoader width="45%" height="0.8rem" />
        <RectangleLoader width="45%" height="0.8rem" />
      </div>

      {Array.from({ length: 10 }, (_, index) => (
        <div className="income-item income-table-loader__row" key={index}>
          <RectangleLoader width="50%" height="0.85rem" />
          <RectangleLoader width="70%" height="0.85rem" />
          <RectangleLoader width="55%" height="0.85rem" />
          <RectangleLoader width="45%" height="0.85rem" />
        </div>
      ))}
    </div>
  );
};

export default IncomeTable;
