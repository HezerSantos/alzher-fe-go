import { useState } from "react";
import Button from "../../../common/Button/Button";
import IconExpand from "../../../common/Icons/IconExpand/IconExpand";
import "./MonthItem.scss";
import RectangleLoader from "../../../common/RectangleLoader/RectangleLoader";

export const MonthItemLoader = () => {
  return (
    <div className="month-item month-item--loader">
      <div className="month-item__base">
        <RectangleLoader width="45%" height="24px" borderRadius="0.4rem" />
        <RectangleLoader width="36px" height="36px" borderRadius="0.65rem" />
      </div>
    </div>
  );
};

interface MonthItemProps {
  month: string;
  year: string;
  highestCategory: string;
  lowestCategory: string;
  totalSpent: string;
}

const MonthItem = ({
  month,
  year,
  highestCategory,
  lowestCategory,
  totalSpent,
}: MonthItemProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`month-item${expanded ? " month-item--expanded" : ""}`}>
      <div className="month-item__base">
        <p>
          {month} {year}
        </p>

        <Button
          text=""
          className="month-item__base--expand"
          onClick={() => setExpanded((prev) => !prev)}
        >
          <IconExpand height="1.5rem" width="1.5rem" />
        </Button>
      </div>

      <div
        className={`month-item__details${
          expanded ? " month-item__details--expanded" : ""
        }`}
      >
        <div className="month-item__details-inner">
          <p>
            <span>Highest Category</span>
            <span />
            <span>{highestCategory}</span>
          </p>

          <p>
            <span>Lowest Category</span>
            <span />
            <span>{lowestCategory}</span>
          </p>

          <p>
            <span>Total Spent</span>
            <span />
            <span>{totalSpent}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MonthItem;
