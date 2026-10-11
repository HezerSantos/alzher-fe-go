import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./DailyChart.scss";

interface DailyScatterChartProps {
  scatterData:
    | {
        dailyAverage: number;
        dateOfMonth: number;
      }[]
    | undefined
    | null;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    payload: {
      dailyAverage: number;
      dateOfMonth: number;
    };
  }>;
}) => {
  if (!active || !payload?.length) return null;

  const point = payload[0].payload;

  return (
    <div className="daily-scatter-chart__tooltip">
      <p className="daily-scatter-chart__tooltip-date">
        Day {point.dateOfMonth}
      </p>
      <p className="daily-scatter-chart__tooltip-value">
        <span />
        Average: {formatCurrency(point.dailyAverage)}
      </p>
    </div>
  );
};

const DailyScatterChart = ({ scatterData }: DailyScatterChartProps) => {
  if (!scatterData?.length) {
    return (
      <div className="daily-scatter-chart__empty">
        <p>No data available</p>
      </div>
    );
  }

  const chartData = scatterData.filter(
    (item) =>
      Number.isFinite(item.dailyAverage) && Number.isFinite(item.dateOfMonth),
  );

  if (!chartData.length) {
    return (
      <div className="daily-scatter-chart__empty">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="daily-scatter-chart">
      <ResponsiveContainer width="100%" height="100%" minHeight={260}>
        <ScatterChart
          data={chartData}
          margin={{ top: 12, right: 20, bottom: 8, left: 12 }}
        >
          <CartesianGrid
            stroke="rgba(46, 71, 59, 0.1)"
            strokeDasharray="4 6"
            vertical={false}
          />

          <XAxis
            type="number"
            dataKey="dateOfMonth"
            name="Day"
            domain={[1, "dataMax"]}
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#717171", fontSize: 12 }}
            tickMargin={12}
            tickCount={8}
          />

          <YAxis
            type="number"
            dataKey="dailyAverage"
            name="Daily average"
            tickFormatter={formatCurrency}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#717171", fontSize: 12 }}
            tickMargin={8}
            width={76}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "rgba(46, 71, 59, 0.2)",
              strokeDasharray: "4 4",
            }}
          />

          <Scatter
            name="Daily average"
            data={chartData}
            fill="#34855d"
            shape="circle"
            isAnimationActive
            animationDuration={600}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DailyScatterChartLoader = () => {
  return (
    <div className="daily-scatter-chart daily-scatter-chart__loader">
      <div className="daily-scatter-chart__loader-y-axis">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div className="daily-scatter-chart__loader-plot">
        <span className="daily-scatter-chart__loader-grid" />
        <span className="daily-scatter-chart__loader-grid" />
        <span className="daily-scatter-chart__loader-grid" />
        <span className="daily-scatter-chart__loader-grid" />

        <svg
          className="daily-scatter-chart__loader-points"
          viewBox="0 0 600 220"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[
            [25, 165],
            [65, 125],
            [100, 180],
            [145, 95],
            [180, 135],
            [220, 75],
            [255, 150],
            [295, 115],
            [330, 55],
            [365, 130],
            [400, 90],
            [440, 160],
            [475, 65],
            [515, 105],
            [550, 45],
            [585, 125],
          ].map(([cx, cy], index) => (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r="6"
              className="daily-scatter-chart__loader-dot"
              style={{ animationDelay: `${index * 70}ms` }}
            />
          ))}
        </svg>
      </div>

      <div className="daily-scatter-chart__loader-x-axis">
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
    </div>
  );
};

export default DailyScatterChart;
