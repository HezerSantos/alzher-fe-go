import { useCallback, useEffect, useRef, useState } from "react";
import CATEGORIES from "../../../../common/constants/categories";
import { useAppDispatch, useAppSelector } from "../../../../reducers/hooks";
import Button from "../../../common/Button/Button";
import TextInput from "../../../common/TextInput/TextInput";
import "./TransactionModal.scss";
import {
  useDeleteTransactiopnMutation,
  useUpdateTransactionMutation,
  type Categories,
} from "../../../../services/dashboardService";
import { clearTransactionModal } from "../../../../reducers/dashboardSlice";
import useToastAdapter from "../../../../common/hooks/useToastAdapter";

const dateRegex = /^(?:[1-9]|1[0-2])\/(?:[1-9]|[12][0-9]|3[01])\/[0-9]{4}$/;

const TransactionModal = () => {
  const {
    showTransaction,
    tId: id,
    category,
    description,
    amount,
    date,
  } = useAppSelector((s) => s.dashboard.selectedTransaction);
  const formRef = useRef<HTMLFormElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const toastAdapter = useToastAdapter();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const [updateTransactionRTK, { isLoading, isError, error }] =
    useUpdateTransactionMutation();
  const [
    deleteTransactionRTK,
    { isLoading: delRTKLoading, isError: delRTKIsError },
  ] = useDeleteTransactiopnMutation();

  const validateParamaters = (
    category: string,
    description: string,
    date: string,
    amount: string,
  ): boolean => {
    const errors: Record<string, string> = {};
    if (!CATEGORIES.includes(category)) {
      errors["category"] = "Category Is Not Valid";
    }
    if (description === "") {
      errors["description"] = "Description Is Not Valid";
    }
    if (!dateRegex.test(date)) {
      errors["date"] = "Date Is Not Valid";
    }
    if (!Number(amount) || Number(amount) <= 0) {
      errors["amount"] = "Amount Is Not Valid";
    }

    if (Object.entries(errors).length) {
      setValidationErrors(errors);
      return false;
    }
    return true;
  };

  const checkDifference = (
    ncategory: string,
    ndescription: string,
    ndate: string,
    namount: string,
  ): boolean => {
    const duplicates = [];
    if (ncategory === category) {
      duplicates.push(null);
    }
    if (ndescription === description) {
      duplicates.push(null);
    }
    if (ndate === date) {
      duplicates.push(null);
    }
    if (Number(namount) === Number(amount)) {
      duplicates.push(null);
    }

    if (duplicates.length) {
      toastAdapter({ msg: "No fields updated", error: false });
      return false;
    }
    return true;
  };

  const updateTransaction = useCallback(async () => {
    const formData = new FormData(formRef.current ?? undefined);

    const data = Object.fromEntries(formData);
    const category = (data["category"] as Categories) ?? "";
    const description = (data["description"] as string) ?? "";
    const date = (data["date"] as string) ?? "";
    const amount = (data["amount"] as string) ?? "";

    if (!validateParamaters(category, description, date, amount)) {
      return;
    }

    if (!checkDifference(category, description, date, amount)) {
      return;
    }

    try {
      const res = await updateTransactionRTK({
        id,
        category,
        description,
        transactionDate: date,
        amount: Number(amount),
      }).unwrap();

      if ("updatedTransaction" in res && res.updatedTransaction === null) {
        toastAdapter({ msg: "No fields updated", error: false });
      } else {
        toastAdapter({ msg: "Successfully Updated Transaction", error: false });
      }
      setValidationErrors({});
    } catch {
      return;
    }
  }, [formRef, id]);

  const deleteTransaction = useCallback(async () => {
    try {
      await deleteTransactionRTK({ id: id }).unwrap();
      toastAdapter({ msg: "Successfully Deleted Transaction", error: false });
      dispatch(clearTransactionModal());
    } catch {
      return;
    }
  }, [id]);

  useEffect(() => {
    if (delRTKIsError) {
      toastAdapter({ msg: "Error Deleting Transaction", error: true });
    }
  }, [delRTKIsError]);

  useEffect(() => {
    if (isError) {
      toastAdapter({ msg: "Error Updating Transaction", error: true });
      if (error) {
        if ("data" in error) {
          const dataError = error as {
            data: { validationErrors: Record<string, string> };
          };
          setValidationErrors(dataError.data.validationErrors);
        }
      }
    }
  }, [isError]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        dispatch(clearTransactionModal());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!showTransaction) {
    return null;
  }

  return (
    <div className="transaction-modal" ref={modalRef}>
      <Button
        text="Close"
        className="transaction-modal__close"
        onClick={() => dispatch(clearTransactionModal())}
      />
      <div className="transaction-modal__header">
        <p>TID:</p>
        <p>{id}</p>
      </div>
      <form ref={formRef}>
        <div className="transaction-modal__item">
          <p>Category:</p>
          <select
            defaultValue={category}
            className="transaction-modal__item__input__select"
            name="category"
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
            errorMessage={validationErrors["description"]}
          />
        </div>
        <div className="transaction-modal__item">
          <p>Date:</p>
          <TextInput
            name="date"
            placeHolder=""
            initialValue={date}
            className="transaction-modal__item__input"
            errorMessage={validationErrors["date"]}
          />
        </div>
        <div className="transaction-modal__item">
          <p>Amount:</p>
          <TextInput
            name="amount"
            placeHolder=""
            initialValue={`${amount}`}
            className="transaction-modal__item__input"
            errorMessage={validationErrors["amount"]}
          />
        </div>
        <div className="transaction-modal__actions">
          <Button
            text="Save Changes"
            className="transaction-modal__actions__button"
            onClick={() => updateTransaction()}
            isLoading={isLoading}
          />
          <Button
            text="Delete Transaction"
            className="transaction-modal__actions__button"
            onClick={() => deleteTransaction()}
            isLoading={delRTKLoading}
          />
        </div>
      </form>
    </div>
  );
};
export default TransactionModal;
