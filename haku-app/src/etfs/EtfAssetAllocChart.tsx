// Pie Chart of Etf Asset Allocation

import { useMemo } from "react";
import { EtfProfile } from "../types/etfTypes";
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

function EtfAssetAllocationChart({ data }: { data: EtfProfile }) {
  // Get Asset Allocation Data
  const assetAllocationData = data["asset_allocation"];

  // Formats Data for Recharts
  const assetAllocationRecharts = useMemo(() => {
    function formatAssetAllocation(inputData: object) {
      let assetAllocationChartData = [];

      for (let key in inputData) {
        const category = {
          category: key,
          value: Number(inputData[key as keyof typeof inputData]),
        }; // this is the format required for recharts
        assetAllocationChartData.push(category);
      }
      return assetAllocationChartData;
    }

    return formatAssetAllocation(assetAllocationData);
  }, [assetAllocationData]);

  // Create Pie Chart
  return (
    <div className="etfPage-chartContainer">
      <h2>Asset Allocation</h2>
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
              data={assetAllocationRecharts}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="category"
              label
            >
              {assetAllocationRecharts.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    assetAllocationColors[
                      Number(index) % assetAllocationColors.length
                    ]
                  }
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${(Number(value) * 100).toFixed(2)}%`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EtfAssetAllocationChart;
