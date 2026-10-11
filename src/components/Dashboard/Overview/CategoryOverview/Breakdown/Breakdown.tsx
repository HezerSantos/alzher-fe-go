import type { CategoryOverview } from "../../../../../services/dashboardService";
import RectangleLoader from "../../../../common/RectangleLoader/RectangleLoader";
import { categoryColor } from "../Volume/Volume";
import "./Breakdown.scss";

interface BreakDownProps {
  categoryOverview?: CategoryOverview[];
}

interface BreakDownItemProps {
  name: string;
  amount: number;
}

const amountFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const BreakDownItem = ({ name, amount }: BreakDownItemProps) => {
  return (
    <div className="breakdown__item">
      <div className="breakdown__category">
        <span
          style={{
            backgroundColor: categoryColor.get(name) ?? "#d9d9d9",
          }}
        />
        <p>{name}</p>
      </div>

      <p className="breakdown__amount">{amountFormatter.format(amount)}</p>
    </div>
  );
};

const BreakDown = ({ categoryOverview }: BreakDownProps) => {
  return (
    <div className="breakdown">
      <div className="breakdown__header">
        <p>Category</p>
        <p>Amount</p>
      </div>

      <div className="breakdown__list">
        {categoryOverview?.map((category) => (
          <BreakDownItem
            key={category.name}
            name={category.name}
            amount={category.amount}
          />
        ))}
      </div>
    </div>
  );
};

export const BreakdownLoader = () => {
  return (
    <div className="breakdown breakdown--loader">
      <div className="breakdown__header">
        <RectangleLoader width="70px" height="12px" borderRadius="0.3rem" />
        <RectangleLoader width="55px" height="12px" borderRadius="0.3rem" />
      </div>

      <div className="breakdown__list">
        {Array.from({ length: 6 }).map((_, index) => (
          <div className="breakdown__item" key={index}>
            <div className="breakdown__category">
              <RectangleLoader width="12px" height="12px" borderRadius="50%" />
              <RectangleLoader
                width={`${75 + (index % 3) * 15}px`}
                height="14px"
                borderRadius="0.3rem"
              />
            </div>

            <RectangleLoader width="76px" height="14px" borderRadius="0.3rem" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreakDown;
