// Pie Chart of Etf Sector Allocations
import "./EtfSectorAllocation.css";

interface EtfData {
  net_assets: string;
  net_expense_ratio: string;
  portfolio_turnover: string;
  dividend_yield: string;
  inception_date: string;
  leveraged: "YES" | "NO";
  asset_allocation: {
    domestic_equities: string;
    foreign_equities: string;
    bond: string;
    cash: string;
    other: string;
  };
  sectors: Array<{
    sector: string;
    weight: string;
  }>;
  holdings: Array<{
    symbol: string;
    description: string;
    weight: string;
  }>;
  name: string;
}

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#a4de6c",
  "#d0ed57",
];

function EtfSectorAllocation({ data }: { data: EtfData }) {
  const sectorData = data["sectors"];

  const sectorDataFormatted = sectorData.map((item) => ({
    ...item,
    weight: Number(item.weight),
  }));

  // remove sectors with weight of 0 from chart
  const filteredData = sectorDataFormatted.filter((item) => item["weight"] > 0);

  return (
    <div className="etfPage-chartContainer-sector">
      <h2>Sector Allocation</h2>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "80%",
          top: "40px",
        }}
      >
        <ResponsiveContainer>
          <BarChart
            data={filteredData}
            layout="vertical"
            margin={{ top: 20, right: 50, left: 80, bottom: 5 }}
          >
            <XAxis
              type="number"
              tickFormatter={(value) => `${(value * 100).toFixed(2)}%`}
            />
            <YAxis
              dataKey="sector"
              type="category"
              width={50}
              tick={{ fontSize: 10 }}
            />
            <Tooltip
              formatter={(value) => `${(Number(value) * 100).toFixed(2)}%`}
              labelFormatter={(label) => `Sector: ${label}`}
            />
            <Bar dataKey="weight">
              {filteredData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EtfSectorAllocation;
