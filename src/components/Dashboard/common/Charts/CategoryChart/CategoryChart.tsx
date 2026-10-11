import {
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
} from "recharts";
import "./CategoryChart.scss";

interface CategoryDomainChartDataType {
  category: string | undefined;
  ["Yearly Average"]: number | undefined;
  ["Monthly Average"]: number | undefined;
  ["Daily Average"]: number | undefined;
  total: number | undefined;
}

interface CategoryDomainChartProps {
  categoryData: CategoryDomainChartDataType[] | undefined | null;
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
  payload?: Array<{ name?: string; value?: number; color?: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="category-domain-chart__tooltip">
      <p className="category-domain-chart__tooltip-category">{label}</p>

      {payload.map((item) => (
        <div className="category-domain-chart__tooltip-row" key={item.name}>
          <span
            className="category-domain-chart__tooltip-dot"
            style={{ backgroundColor: item.color }}
          />
          <span className="category-domain-chart__tooltip-label">
            {item.name}
          </span>
          <span className="category-domain-chart__tooltip-value">
            {formatCurrency(item.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

const CategoryDomainChart = ({ categoryData }: CategoryDomainChartProps) => {
  const chartData = (categoryData ?? []).filter(
    (item) =>
      item.category !== undefined &&
      [
        item.total,
        item["Yearly Average"],
        item["Monthly Average"],
        item["Daily Average"],
      ].some((value) => value !== undefined && Number.isFinite(value)),
  );

  if (!chartData.length) {
    return (
      <div className="category-domain-chart__empty">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="category-domain-chart">
      <ResponsiveContainer width="100%" height="100%" minHeight={300}>
        <RadarChart
          data={chartData}
          cx="50%"
          cy="47%"
          outerRadius="68%"
          margin={{ top: 12, right: 24, bottom: 12, left: 24 }}
        >
          <PolarGrid stroke="rgba(46, 71, 59, 0.14)" gridType="polygon" />

          <PolarAngleAxis
            dataKey="category"
            tick={{
              fill: "#444444",
              fontSize: 12,
              fontWeight: 500,
            }}
            tickLine={false}
          />

          <PolarRadiusAxis
            angle={50}
            domain={[0, "auto"]}
            tickFormatter={(value: number) => formatCurrency(value)}
            tick={{
              fill: "#717171",
              fontSize: 10,
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip content={<CustomTooltip />} />

          <Radar
            name="Total Spending"
            dataKey="total"
            stroke="#2e473b"
            fill="#2e473b"
            fillOpacity={0.2}
            strokeWidth={2.5}
            dot={{
              r: 3,
              fill: "#2e473b",
              stroke: "#fffaf3",
              strokeWidth: 1.5,
            }}
            activeDot={{
              r: 5,
              fill: "#34855d",
              stroke: "#fffaf3",
              strokeWidth: 2,
            }}
            connectNulls
          />

          <Radar
            name="Yearly Average"
            dataKey="Yearly Average"
            stroke="#cc9c59"
            fill="#cc9c59"
            fillOpacity={0.12}
            strokeWidth={2}
            dot={{ r: 3, fill: "#cc9c59" }}
            connectNulls
          />

          <Radar
            name="Monthly Average"
            dataKey="Monthly Average"
            stroke="#34855d"
            fill="#34855d"
            fillOpacity={0.12}
            strokeWidth={2}
            dot={{ r: 3, fill: "#34855d" }}
            connectNulls
          />

          <Radar
            name="Daily Average"
            dataKey="Daily Average"
            stroke="#7399b4"
            fill="#7399b4"
            fillOpacity={0.12}
            strokeWidth={2}
            dot={{ r: 3, fill: "#7399b4" }}
            connectNulls
          />

          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            iconSize={8}
            wrapperStyle={{
              paddingTop: "1rem",
              fontSize: "0.75rem",
              color: "#444444",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CategoryDomainChartLoader = () => {
  return (
    <div className="category-domain-chart category-domain-chart__loader">
      <div className="category-domain-chart__loader-chart">
        <svg
          viewBox="0 0 320 260"
          className="category-domain-chart__loader-svg"
          aria-hidden="true"
        >
          {/* Radar grid */}
          <polygon points="160,35 245,97 213,197 107,197 75,97" />
          <polygon points="160,65 218,107 196,175 124,175 102,107" />
          <polygon points="160,95 191,117 179,153 141,153 129,117" />

          {/* Radar axes */}
          <line x1="160" y1="130" x2="160" y2="35" />
          <line x1="160" y1="130" x2="245" y2="97" />
          <line x1="160" y1="130" x2="213" y2="197" />
          <line x1="160" y1="130" x2="107" y2="197" />
          <line x1="160" y1="130" x2="75" y2="97" />

          {/* Animated data shape */}
          <polygon
            className="category-domain-chart__loader-area"
            points="160,55 225,105 198,175 120,180 95,105"
          />

          {/* Data points */}
          <circle cx="160" cy="55" r="5" />
          <circle cx="225" cy="105" r="5" />
          <circle cx="198" cy="175" r="5" />
          <circle cx="120" cy="180" r="5" />
          <circle cx="95" cy="105" r="5" />
        </svg>
      </div>

      <div className="category-domain-chart__loader-legend">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            className="category-domain-chart__loader-legend-item"
            key={index}
          >
            <span className="category-domain-chart__loader-dot" />
            <span className="category-domain-chart__loader-label" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDomainChart;
