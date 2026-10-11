import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import "./YearlyChart.scss";
import RectangleLoader from "../../../../common/RectangleLoader/RectangleLoader";

interface YearlyLineChartDataType {
  year: number | undefined;
  total: number | undefined;
}

interface YearlyLineChartProps {
  yearlyData: YearlyLineChartDataType[] | undefined | null;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const formatCurrency = (value: number | undefined) => {
  if (value === undefined || !Number.isFinite(value)) return "N/A";
  return currencyFormatter.format(value);
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value?: number; name?: string }>;
  label?: number | string;
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="yearly-line-chart__tooltip">
      <p className="yearly-line-chart__tooltip-year">{label}</p>
      <p className="yearly-line-chart__tooltip-value">
        <span />
        Total: {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
};

const YearlyLineChart = ({ yearlyData }: YearlyLineChartProps) => {
  if (!yearlyData?.length) {
    return (
      <div className="yearly-line-chart__empty">
        <p>No data available</p>
      </div>
    );
  }

  const chartData = yearlyData.filter(
    (item) =>
      item.year !== undefined &&
      item.total !== undefined &&
      Number.isFinite(item.total),
  );

  if (!chartData.length) {
    return (
      <div className="yearly-line-chart__empty">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="yearly-line-chart">
      <ResponsiveContainer width="100%" height="100%" minHeight={260}>
        <LineChart
          data={chartData}
          margin={{ top: 12, right: 16, left: 8, bottom: 4 }}
        >
          <CartesianGrid
            stroke="rgba(46, 71, 59, 0.1)"
            strokeDasharray="4 6"
            vertical={false}
          />

          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#717171", fontSize: 12 }}
            tickMargin={12}
            minTickGap={16}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#717171", fontSize: 12 }}
            tickFormatter={(value: number) => formatCurrency(value)}
            width={76}
            tickMargin={8}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "rgba(46, 71, 59, 0.2)",
              strokeDasharray: "4 4",
            }}
          />

          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              paddingBottom: "1.25rem",
              fontSize: "0.8rem",
              color: "#444444",
            }}
          />

          <Line
            name="Total"
            type="monotone"
            dataKey="total"
            stroke="#2e473b"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: "#fffaf3",
              stroke: "#2e473b",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: "#34855d",
              stroke: "#fffaf3",
              strokeWidth: 2,
            }}
            connectNulls={false}
            animationDuration={700}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const YearlyChartLoader = () => {
  return (
    <div
      className="yearly-line-chart yearly-line-chart--loader"
      aria-label="Loading yearly chart"
      role="status"
    >
      <div className="yearly-line-chart__loader-legend">
        <RectangleLoader width="4rem" height="0.75rem" />
      </div>

      <div className="yearly-line-chart__loader-body">
        <div className="yearly-line-chart__loader-y-axis">
          {[...Array(5)].map((_, i) => (
            <RectangleLoader key={i} width="3.5rem" height="0.65rem" />
          ))}
        </div>

        <div className="yearly-line-chart__loader-plot">
          {[...Array(5)].map((_, i) => (
            <div className="yearly-line-chart__loader-gridline" key={i} />
          ))}

          <svg
            className="yearly-line-chart__loader-line"
            viewBox="0 0 600 180"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="yearly-loader-shimmer">
                <stop offset="0%" stopColor="#e7e5dd" />
                <stop offset="50%" stopColor="#f8f7f2" />
                <stop offset="100%" stopColor="#e7e5dd" />
                <animateTransform
                  attributeName="gradientTransform"
                  type="translate"
                  from="-1 0"
                  to="1 0"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </linearGradient>

              <linearGradient
                id="yearly-loader-area"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#e7e5dd" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#e7e5dd" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            <path
              d="M 0 175 C 70 165, 90 125, 145 130 S 235 155, 300 95 S 385 75, 450 82 S 540 35, 600 25 L 600 220 L 0 220 Z"
              fill="url(#yearly-loader-area)"
            />

            <path
              d="M 0 175 C 70 165, 90 125, 145 130 S 235 155, 300 95 S 385 75, 450 82 S 540 35, 600 25"
              fill="none"
              stroke="url(#yearly-loader-shimmer)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {[
              [0, 175],
              [145, 130],
              [300, 95],
              [450, 82],
              [600, 25],
            ].map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="5"
                fill="url(#yearly-loader-shimmer)"
                stroke="#e7e5dd"
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>

        <div className="yearly-line-chart__loader-x-axis">
          {[...Array(5)].map((_, i) => (
            <RectangleLoader key={i} width="2.5rem" height="0.65rem" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default YearlyLineChart;
