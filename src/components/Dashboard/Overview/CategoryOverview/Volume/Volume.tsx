import type { CategoryOverview } from "../../../../../services/dashboardService";
import RectangleLoader from "../../../../common/RectangleLoader/RectangleLoader";
import "./Volume.scss";

export const categoryColor = new Map([
  ["Dining", "#34855d"],
  ["Merchandise", "#647f72"],
  ["Entertainment", "#2e473b"],
  ["Subscriptions", "#8db7a0"],
  ["Grocery", "#b3cdb0"],
  ["Transportation", "#cc9c59"],
  ["Bills", "#8b91a7"],
]);

interface VolumeProps {
  categoryOverview?: CategoryOverview[];
}

const VolumeBar = ({ categoryOverview }: VolumeProps) => {
  return (
    <div className="volume__bar">
      {categoryOverview?.map((category, index) => (
        <div
          key={`${category.name}-${index}`}
          style={{
            width: `${category.percent}%`,
            backgroundColor: categoryColor.get(category.name) ?? "#d9d9d9",
          }}
          className="volume__bar__item"
          title={`${category.name}: ${category.percent.toFixed(2)}%`}
        />
      ))}
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
      <div className="volume__desc-category">
        <span
          style={{
            backgroundColor: categoryColor.get(name) ?? "#d9d9d9",
          }}
        />
        <p>{name}</p>
      </div>

      <div className="volume__desc-stats">
        <p>
          {totalTransactions}{" "}
          {totalTransactions === 1 ? "Transaction" : "Transactions"}
        </p>
        <p>{percent.toFixed(2)}%</p>
      </div>
    </div>
  );
};

const Volume = ({ categoryOverview }: VolumeProps) => {
  return (
    <div className="volume">
      <div className="volume__content">
        <VolumeBar categoryOverview={categoryOverview} />

        {categoryOverview?.map((category) => (
          <VolumeDesc
            key={category.name}
            name={category.name}
            totalTransactions={category.totalTransactions}
            percent={category.percent}
          />
        ))}
      </div>
    </div>
  );
};

export const VolumeLoader = () => {
  return (
    <div className="volume volume--loader">
      <div className="volume__content">
        <div className="volume-loader__bar">
          {[22, 16, 18, 14, 12, 10, 8].map((width, index) => (
            <RectangleLoader
              key={index}
              width={`${width}%`}
              height="100%"
              borderRadius="0"
            />
          ))}
        </div>

        <div className="volume-loader__descriptions">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="volume__desc" key={index}>
              <div className="volume__desc-category">
                <RectangleLoader
                  width="12px"
                  height="12px"
                  borderRadius="50%"
                />
                <RectangleLoader
                  width={`${65 + (index % 3) * 10}px`}
                  height="14px"
                  borderRadius="0.3rem"
                />
              </div>

              <div className="volume__desc-stats">
                <RectangleLoader
                  width="100px"
                  height="12px"
                  borderRadius="0.3rem"
                />
                <RectangleLoader
                  width="48px"
                  height="14px"
                  borderRadius="0.3rem"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Volume;
