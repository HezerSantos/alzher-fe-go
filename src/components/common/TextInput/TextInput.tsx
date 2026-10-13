import { useEffect, useRef, useState } from "react";
import "./TextInput.scss";

interface TextInputProps {
  name: string;
  placeHolder: string;
  className?: string;
  required?: boolean;
  labelFormat?: {
    top: string;
    left: string;
    fontSize: string;
  };
  onChange?: (value: string) => void;
  onChangeLoad?: () => void;
  initialValue?: string;
  errorMessage?: string;
}

const TextInput = ({
  name,
  placeHolder,
  className,
  required,
  labelFormat,
  onChange,
  onChangeLoad,
  initialValue = "",
  errorMessage,
}: TextInputProps) => {
  const { top, left, fontSize } = labelFormat ?? {};
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (initialValue !== "") {
      setValue(initialValue);
    }
  }, [initialValue]);

  const timeoutRef = useRef<number | null>(null);
  useEffect(() => {
    // Clear any existing timeout before setting a new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (onChange) {
      if (value) {
        onChangeLoad?.();
      }
      timeoutRef.current = setTimeout(() => {
        onChange(value);
      }, 1000);
    }

    // Cleanup function runs when component unmounts or value/onChange changes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, onChange]);
  return (
    <div className="input-container">
      {value && (
        <label
          htmlFor={`text-input-id:${name}`}
          style={{ top, left, fontSize }}
          className="label-comp"
        >
          {placeHolder}
        </label>
      )}
      <input
        name={name}
        id={`text-input-id:${name}`}
        placeholder={placeHolder}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        type="text"
        required={required}
        className={`text-input ${className ? className : ""} ${errorMessage !== undefined ? "text-input--error" : ""}`}
      />
      {errorMessage && (
        <p className="text-input__error-message">{errorMessage}*</p>
      )}
    </div>
  );
};

export default TextInput;
