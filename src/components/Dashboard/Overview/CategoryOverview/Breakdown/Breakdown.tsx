import type { CategoryOverview } from "../../../../../services/dashboardService";
import "./Breakdown.scss";

const categoryColor = new Map([
  ["Dining", "19183B"],
  ["Merchandise", "708993"],
  ["Entertainment", "0d2229"],
  ["Subscriptions", "A1C2BD"],
  ["Grocery", "E7F2EF"],
  ["Transportation", "EEEEEE"],
  ["Bills", "FFFFFF"],
]);

interface BreakDownProps {
  categoryOverview?: CategoryOverview[];
}

interface BreakDownItemProps {
  name: string;
  amount: number;
}

const BreakDownItem = ({ name, amount }: BreakDownItemProps) => {
  return (
    <div className="breakdown__item">
      <div>
        <span style={{ backgroundColor: `#${categoryColor.get(name)}` }}></span>
        <p>{name}</p>
      </div>
      <div>${amount}</div>
    </div>
  );
};
const BreakDown = ({ categoryOverview }: BreakDownProps) => {
  return (
    <div className="breakdown">
      <div className="breakdown__header">
        <p>Category</p> <p>Amount</p>
      </div>
      {categoryOverview?.map((co) => {
        return (
          <BreakDownItem
            key={co.amount + co.totalTransactions + co.percent}
            name={co.name}
            amount={co.amount}
          />
        );
      })}
    </div>
  );
};

export default BreakDown;
