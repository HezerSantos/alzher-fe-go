import type { CategoryOverview } from "../../../../../services/dashboardService";
import "./Volume.scss";

const categoryColor = new Map([
  ["Dining", "19183B"],
  ["Merchandise", "708993"],
  ["Entertainment", "0d2229"],
  ["Subscriptions", "A1C2BD"],
  ["Grocery", "E7F2EF"],
  ["Transportation", "EEEEEE"],
  ["Bills", "FFFFFF"],
]);

interface VolumeProps {
  categoryOverview?: CategoryOverview[];
}

const VolumeBar = ({ categoryOverview }: VolumeProps) => {
  return (
    <div className="volume__bar">
      {categoryOverview?.map((c) => {
        return (
          <div
            key={c.percent}
            style={{
              width: `${c.percent}%`,
              backgroundColor: `#${categoryColor.get(c.name)}`,
            }}
            className="volume__bar__item"
          ></div>
        );
      })}
    </div>
  );
};

interface VolumeDescProps {
  name: string;
  totalTransactions: number;
  percent: number;
}
const VolumeDesc = ({ name, totalTransactions, percent }: VolumeDescProps) => {
  return (
    <div className="volume__desc">
      <div>
        <span style={{ backgroundColor: `#${categoryColor.get(name)}` }}></span>
        <p>{name}</p>
      </div>
      <div>
        <p>{totalTransactions} Transactions</p>
        <p>{percent.toFixed(2)}%</p>
      </div>
    </div>
  );
};
const Volume = ({ categoryOverview }: VolumeProps) => {
  return (
    <>
      <div className="volume">
        <div>
          <VolumeBar categoryOverview={categoryOverview} />
          {categoryOverview?.map((co) => {
            return (
              <VolumeDesc
                key={co.percent + co.amount}
                name={co.name}
                totalTransactions={co.totalTransactions}
                percent={co.percent}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Volume;
