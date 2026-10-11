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
  return id !== "header" ? (
    <Button className="income-item" text="">
      <p>{category}</p>
      <p>{description}</p>
      <p>{date}</p>
      <p>{amount}</p>
    </Button>
  ) : (
    <div className="income-item">
      <p>{category}</p>
      <p>{description}</p>
      <p>{date}</p>
      <p>{amount}</p>
    </div>
  );
};

export default IncomeItem;
