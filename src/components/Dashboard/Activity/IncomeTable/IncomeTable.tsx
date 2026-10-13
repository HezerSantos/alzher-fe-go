import useWidth from "../../../../common/hooks/useWidth";
import type { TransactionItem } from "../../../../services/dashboardService";
import RectangleLoader from "../../../common/RectangleLoader/RectangleLoader";
import IncomeItem, { MobileIncomeItemLoader } from "./IncomeItem/IncomeItem";
import "./IncomeTable.scss";
interface IncomeTableProps {
  transactionItems?: TransactionItem[];
}
const IncomeTable = ({ transactionItems }: IncomeTableProps) => {
  const width = useWidth();
  return (
    <div className="income-table">
      {width > 750 && (
        <IncomeItem
          id="header"
          // @ts-ignore
          category="Category"
          description="Description"
          date="Date"
          amount="Amount"
        />
      )}
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
  const width = useWidth();
  return (
    <>
      {width > 750 ? (
        <div className="income-table income-table--loading">
          <div className="income-item income-table-loader__header income-item--header">
            <RectangleLoader width="55%" height="1.43rem" />
            <RectangleLoader width="65%" height="1.43rem" />
            <RectangleLoader width="45%" height="1.43rem" />
            <RectangleLoader width="45%" height="1.43rem" />
          </div>

          {Array.from({ length: 10 }, (_, index) => (
            <div className="income-item income-table-loader__row" key={index}>
              <RectangleLoader width="50%" height="1.43rem" />
              <RectangleLoader width="70%" height="1.43rem" />
              <RectangleLoader width="55%" height="1.43rem" />
              <RectangleLoader width="45%" height="1.43rem" />
            </div>
          ))}
        </div>
      ) : (
        <div className="income-table income-table--loading">
          {Array.from({ length: 10 }, (_, index) => (
            <MobileIncomeItemLoader key={index} />
          ))}
        </div>
      )}
    </>
  );
};

export default IncomeTable;
