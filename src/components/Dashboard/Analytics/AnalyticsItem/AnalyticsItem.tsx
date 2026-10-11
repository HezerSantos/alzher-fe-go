import RectangleLoader from "../../../common/RectangleLoader/RectangleLoader";
import "./AnalyticsItem.scss";

interface AnalyticsItemProps {
  header: string;
  amountSpent: number | null;
  primarySubHeader: string | null;
  primarySubValue: string | null;
  secondarySubHeader: string | null;
  secondarySubValue: string | null;
}

const AnalyticsItem = ({
  header,
  amountSpent,
  primarySubHeader,
  primarySubValue,
  secondarySubHeader,
  secondarySubValue,
}: AnalyticsItemProps) => {
  return (
    <div className="analytics-item">
      <p className="analytics-item__header">{header}</p>

      <p className="analytics-item__amount">{amountSpent?.toFixed(2)}</p>

      <div className="analytics-item__details">
        {primarySubHeader && (
          <div className="analytics-item__detail">
            <p>{primarySubHeader}</p>
            <span>{primarySubValue ?? "N/A"}</span>
          </div>
        )}

        {secondarySubHeader && (
          <div className="analytics-item__detail">
            <p>{secondarySubHeader}</p>
            <span>{secondarySubValue ?? "N/A"}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const AnalyticsItemLoader = () => {
  return (
    <div className="analytics-item analytics-item--loader" aria-hidden="true">
      <RectangleLoader width="45%" height="0.8rem" borderRadius="0.25rem" />

      <RectangleLoader width="65%" height="2rem" borderRadius="0.35rem" />

      <div className="analytics-item__details">
        <div className="analytics-item__detail">
          <RectangleLoader width="40%" height="0.75rem" />
          <RectangleLoader width="25%" height="0.75rem" />
        </div>

        <div className="analytics-item__detail">
          <RectangleLoader width="40%" height="0.75rem" />
          <RectangleLoader width="25%" height="0.75rem" />
        </div>
      </div>
    </div>
  );
};
export default AnalyticsItem;
