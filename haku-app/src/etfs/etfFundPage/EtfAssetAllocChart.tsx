// Pie Chart of Etf Asset Allocation
import "./EtfAssetAllocChart.css";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { EtfProfile } from "../../types/etfTypes";
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

  // Set chart size dynamically based on screen size
  const [legendSize, setLegendSize] = useState("14px");

  useEffect(() => {
    const resizeChart = () => {
      if (innerWidth <= 500) {
        setLegendSize("10px");
      } else if (innerWidth <= 700) {
        setLegendSize("12px");
      } else {
        setLegendSize("14px");
      }
    };

    window.addEventListener("resize", resizeChart);

    resizeChart(); // Call once to set initial size

    return () => window.removeEventListener("resize", resizeChart);
  });

  // Create Pie Chart
  return (
    <div id="etfPage-AssetChart-Container">
      <h2>Asset Allocation</h2>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "80%",
          top: "40px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
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
            <Legend wrapperStyle={{ fontSize: legendSize }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default EtfAssetAllocationChart;
