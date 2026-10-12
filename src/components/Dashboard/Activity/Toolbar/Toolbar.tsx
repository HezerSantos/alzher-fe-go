import { useState, useRef, useEffect, useCallback } from "react";
import TextInput from "../../../common/TextInput/TextInput";
import Button from "../../../common/Button/Button";
import "./Toolbar.scss";
import { useAppDispatch, useAppSelector } from "../../../../reducers/hooks";
import {
  setCategoryFilter,
  setKeyWord,
  setKeyWordLoading,
} from "../../../../reducers/dashboardSlice";

const categories = [
  "Merchandise",
  "Dining",
  "Entertainment",
  "Subscriptions",
  "Grocery",
  "Transportation",
  "Bills",
];

const Toolbar = () => {
  const [activeCategory, setActiveCategory] = useState("Select a Category");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { categoryFilter } = useAppSelector((s) => s.dashboard.activity);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyWord = useCallback((value: string) => {
    dispatch(setKeyWord(value));
  }, []);

  return (
    <div className="toolbar">
      <TextInput
        name="search"
        placeHolder="Search for order ID or name"
        onChange={handleKeyWord}
        onChangeLoad={() => dispatch(setKeyWordLoading(true))}
        labelFormat={{ top: "2.5px", left: "16px", fontSize: "0.6rem" }}
      />

      <div className="toolbar__filters">
        {categoryFilter && (
          <Button
            text="Clear Filter"
            className="toolbar__filters__clear"
            onClick={() => {
              dispatch(setCategoryFilter(""));
              setActiveCategory("Select a Category");
            }}
          />
        )}
        <div className="toolbar__dropdown" ref={dropdownRef}>
          <Button
            text={activeCategory}
            className="toolbar__dropdown-trigger"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
          >
            <span
              className={`toolbar__chevron ${isOpen ? "toolbar__chevron--open" : ""}`}
            >
              ▾
            </span>
          </Button>

          {isOpen && (
            <div
              className="toolbar__dropdown-menu"
              role="listbox"
              aria-label="Filter by category"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="option"
                  aria-selected={activeCategory === category}
                  className={`toolbar__dropdown-option ${
                    activeCategory === category
                      ? "toolbar__dropdown-option--active"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveCategory(category);
                    setIsOpen(false);
                    dispatch(setCategoryFilter(category));
                  }}
                >
                  {category}
                  {activeCategory === category && (
                    <span aria-hidden="true">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
