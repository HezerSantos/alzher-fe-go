import { useState } from "react";
import {
  changeOverviewSemester,
  changeOverviewYear,
} from "../../../../reducers/dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../../reducers/hooks";
import Button from "../../../common/Button/Button";
import RectangleLoader from "../../../common/RectangleLoader/RectangleLoader";
import "./HeaderCard.scss";

export const HeaderCardLoader = () => {
  return (
    <div className="header-card header-card--loader">
      <RectangleLoader width="45%" height="20px" borderRadius="0.4rem" />
      <RectangleLoader width="65%" height="40px" borderRadius="0.5rem" />
      <RectangleLoader width="75%" height="18px" borderRadius="0.4rem" />
      <RectangleLoader width="85%" height="18px" borderRadius="0.4rem" />
    </div>
  );
};
export const HeaderCardControlLoader = () => {
  return (
    <div className="header-card-control">
      <RectangleLoader width="100%" height="42px" borderRadius="0.65rem" />
      <RectangleLoader width="100%" height="42px" borderRadius="0.65rem" />
      <RectangleLoader width="100%" height="42px" borderRadius="0.65rem" />
    </div>
  );
};

interface HeaderCardProps {
  header: string;
  price: string | number;
  details?: {
    heading: string;
    value: string;
  }[];
}

interface HeadrCardControlProps {
  yearList?: number[];
}
export const HeaderCardControl = ({ yearList }: HeadrCardControlProps) => {
  const dispatch = useAppDispatch();
  const currentSemester = useAppSelector((s) => s.dashboard.overview.semester);
  const currentYear = useAppSelector((s) => s.dashboard.overview.year);

  return (
    <div className="header-card-control">
      <div className="header-card-control--year">
        <label htmlFor="header-card-year">Year</label>
        <select
          id="header-card-year"
          onChange={(e) => dispatch(changeOverviewYear(Number(e.target.value)))}
        >
          {yearList
            ?.toSorted((a, b) => a - b)
            .map((y) => (
              <option key={y} value={y} selected={y === currentYear}>
                {y}
              </option>
            ))}
        </select>
      </div>

      <div className="header-card-control--periods">
        <Button
          onClick={() => dispatch(changeOverviewSemester(1))}
          className="header-card-control--button"
          text="First Six Months"
          disabled={currentSemester === 1}
        />
        <Button
          onClick={() => dispatch(changeOverviewSemester(2))}
          className="header-card-control--button"
          text="Last Six Months"
          disabled={currentSemester === 2}
        />
      </div>
    </div>
  );
};
const HeaderCard = ({ header, price, details }: HeaderCardProps) => {
  return (
    <div className="header-card">
      <p>{header}</p>
      <p>
        {header !== "Total Transactions" && "$"}
        {price}
      </p>
      {details?.map((d, i) => {
        return (
          <p key={i}>
            {d.heading}: {d.value}
          </p>
        );
      })}
    </div>
  );
};

export default HeaderCard;
