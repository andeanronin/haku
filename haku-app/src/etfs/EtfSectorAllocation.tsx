// Pie Chart of Etf Sector Allocations
import "./EtfSectorAllocation.css";
import { EtfProfile } from "../types/etfTypes";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
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

function EtfSectorAllocation({ data }: { data: EtfProfile }) {
  const sectorData = data["sectors"];

  if (!sectorData || sectorData.length === 0) {
    return (
      <div className="etfPage-chartContainer-sector">
        <h2>No Sector Data Available</h2>
      </div>
    );
  }

  // format data
  const sectorDataFormatted = sectorData.map((item) => ({
    ...item,
    weight: Number(item.weight),
  }));

  // remove sectors with weight of 0 from chart
  const filteredData = sectorDataFormatted.filter((item) => item["weight"] > 0);

  return (
    <div className="etfPage-chartContainer-sector">
      <h2>Sector Exposure</h2>
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
              {filteredData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[Number(index) % COLORS.length]}
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
