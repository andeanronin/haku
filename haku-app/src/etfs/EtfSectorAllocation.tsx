// Pie Chart of Etf Sector Allocations

import { useMemo } from "react";

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
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const assetAllocationColors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
];

function EtfSectorAllocation({ data }: { data: EtfData }) {
  const sectorData = data["sectors"];

  const sectorDataFormatted = sectorData.map((item) => {
    item["weight"] = Number(item["weight"]); // modify the values for "weight" directly
    return item;
  });

  return (
    <div className="etfPage-chartContainer">
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
          <PieChart width={400} height={400}>
            <Pie
              data={sectorDataFormatted}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="weight"
              nameKey="category"
              label
            >
              {sectorDataFormatted.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    assetAllocationColors[index % assetAllocationColors.length]
                  }
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EtfSectorAllocation;
