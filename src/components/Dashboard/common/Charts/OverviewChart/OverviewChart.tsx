import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./OverviewChart.scss";
import RectangleLoader from "../../../../common/RectangleLoader/RectangleLoader";

interface OverviewChartData {
  month: string;
  [year: string]: string | number;
}

interface OverviewChartProps {
  overviewData: OverviewChartData[] | null | undefined;
  yearOne: string;
  yearTwo: string | boolean;
}

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const tooltipCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const OverviewChart = ({
  overviewData,
  yearOne,
  yearTwo,
}: OverviewChartProps) => {
  if (!overviewData || overviewData.length === 0) {
    return (
      <div className="empty-chart">
        <p>No Data Available</p>
      </div>
    );
  }

  return (
    <div className="overview-chart">
      <div className="overview-chart__heading">
        <div>
          <h2>Spending Overview</h2>
          <p>Monthly spending breakdown</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={overviewData}
          margin={{ top: 16, right: 8, left: 8, bottom: 0 }}
          barCategoryGap="25%"
          maxBarSize={44}
        >
          <CartesianGrid
            vertical={false}
            stroke="rgba(46, 71, 59, 0.10)"
            strokeDasharray="4 6"
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#717171", fontSize: 12 }}
            tickMargin={12}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#717171", fontSize: 12 }}
            tickFormatter={(value: number) => currencyFormatter.format(value)}
            width={75}
          />

          <Tooltip
            cursor={{ fill: "rgba(46, 71, 59, 0.06)" }}
            formatter={(value, name) => [
              tooltipCurrencyFormatter.format(Number(value)),
              String(name),
            ]}
            contentStyle={{
              backgroundColor: "#fffaf3",
              border: "1px solid rgba(46, 71, 59, 0.14)",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(46, 71, 59, 0.10)",
              padding: "12px 14px",
            }}
            labelStyle={{
              color: "#2e473b",
              fontWeight: 700,
              marginBottom: "6px",
            }}
            itemStyle={{
              color: "#2e473b",
              fontSize: "13px",
            }}
          />

          {yearTwo && typeof yearTwo === "string" && (
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                fontSize: "12px",
                paddingBottom: "12px",
              }}
            />
          )}

          <Bar
            dataKey={yearOne}
            name={yearOne}
            fill="#2e473b"
            radius={[6, 6, 0, 0]}
            animationDuration={700}
          />

          {yearTwo && typeof yearTwo === "string" && (
            <Bar
              dataKey={yearTwo}
              name={yearTwo}
              fill="#34855d"
              radius={[6, 6, 0, 0]}
              animationDuration={700}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const OverviewChartLoader = () => {
  return (
    <div className="overview-chart overview-chart--loader">
      <div className="overview-chart__heading">
        <div>
          <RectangleLoader width="180px" height="22px" borderRadius="0.4rem" />
          <RectangleLoader width="220px" height="14px" borderRadius="0.3rem" />
        </div>
      </div>

      <div className="overview-chart-loader__body">
        <div className="overview-chart-loader__y-axis">
          {Array.from({ length: 5 }).map((_, index) => (
            <RectangleLoader
              key={index}
              width="48px"
              height="12px"
              borderRadius="0.3rem"
            />
          ))}
        </div>

        <div className="overview-chart-loader__plot">
          <div className="overview-chart-loader__grid">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} />
            ))}
          </div>

          <div className="overview-chart-loader__bars">
            {[78, 34, 48, 32, 62, 40].map((height, index) => (
              <div className="overview-chart-loader__bar-column" key={index}>
                <RectangleLoader
                  width="100%"
                  height={`${height}%`}
                  borderRadius="6px 6px 0 0"
                />
              </div>
            ))}
          </div>

          <div className="overview-chart-loader__x-axis">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => (
              <RectangleLoader
                key={month}
                width="28px"
                height="12px"
                borderRadius="0.3rem"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewChart;
