import CATEGORIES from "../../../../common/constants/categories";
import Button from "../../../common/Button/Button";
import TextInput from "../../../common/TextInput/TextInput";
import "./TransactionModal.scss";

interface TransactionModalProps {
  id: string;
  category: string;
  description: string;
  date: string;
  amount: string;
}
const TransactionModal = ({
  id,
  category,
  description,
  date,
  amount,
}: TransactionModalProps) => {
  return (
    <div className="transaction-modal">
      <div className="transaction-modal__header">
        <p>TID:</p>
        <p>{id}</p>
      </div>
      <div className="transaction-modal__item">
        <p>Category:</p>
        <select
          defaultValue={category}
          className="transaction-modal__item__input__select"
        >
          {CATEGORIES.map((c) => {
            return (
              <option value={c} key={c}>
                {c}
              </option>
            );
          })}
        </select>
      </div>
      <div className="transaction-modal__item">
        <p>Description:</p>
        <TextInput
          name="description"
          placeHolder=""
          initialValue={description}
          className="transaction-modal__item__input"
        />
      </div>
      <div className="transaction-modal__item">
        <p>Date:</p>
        <TextInput
          name="date"
          placeHolder=""
          initialValue={date}
          className="transaction-modal__item__input"
        />
      </div>
      <div className="transaction-modal__item">
        <p>Amount:</p>
        <TextInput
          name="amount"
          placeHolder=""
          initialValue={amount}
          className="transaction-modal__item__input"
        />
      </div>
      <div className="transaction-modal__actions">
        <Button
          text="Save Changes"
          className="transaction-modal__actions__button"
        />
        <Button
          text="Delete Transaction"
          className="transaction-modal__actions__button"
        />
      </div>
    </div>
  );
};
export default TransactionModal;
