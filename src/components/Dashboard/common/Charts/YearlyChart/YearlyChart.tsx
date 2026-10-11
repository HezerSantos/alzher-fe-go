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

export default YearlyLineChart;
