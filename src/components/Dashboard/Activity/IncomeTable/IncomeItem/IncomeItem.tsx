import useWidth from "../../../../../common/hooks/useWidth";
import Button from "../../../../common/Button/Button";
import "./IncomeItem.scss";

interface IncomeItemProps {
  id: string;
  category: string;
  description: string;
  date: string;
  amount: string;
}
const IncomeItem = ({
  id,
  category,
  description,
  date,
  amount,
}: IncomeItemProps) => {
  const width = useWidth();

  if (width > 750) {
    return id !== "header" ? (
      <Button className="income-item" text="">
        <p>{category}</p>
        <p>{description}</p>
        <p>{date}</p>
        <p>{amount}</p>
      </Button>
    ) : (
      <div className="income-item income-item--header">
        <p>{category}</p>
        <p>{description}</p>
        <p>{date}</p>
        <p>{amount}</p>
      </div>
    );
  } else {
    return (
      <Button className="income-item" text="">
        <div>
          <p>Category</p>
          <p>{category}</p>
        </div>
        <div>
          <p>Description</p>
          <p>{description}</p>
        </div>
        <div>
          <p>Date</p>
          <p>{date}</p>
        </div>
        <div>
          <p>Amount</p>
          <p>{amount}</p>
        </div>
      </Button>
    );
  }
};

export default IncomeItem;
