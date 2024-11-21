// Historical Monthly Values
import "./etfPriceChart.css";
import { EtfMonthlyValues } from "../../types/etfTypes";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

interface DataPoint {
  date: string;
  close: number;
}

function EtfHistoricalValues({ data }: { data: EtfMonthlyValues }) {
  // Adapt data for Recharts
  let monthlyData = data["Monthly Adjusted Time Series"];
  const chartData: DataPoint[] = Object.entries(monthlyData)
    .map(([date, values]) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      }),
      close: parseFloat(values["4. close"]),
    }))
    .reverse();

  // Adapt chart size for smaller screen sizes
  const [chartHeight, setChartHeight] = useState(400);
  useEffect(() => {
    const resizeChart = () => {
      if (innerWidth <= 500) {
        setChartHeight(280);
      } else if (innerWidth <= 700) {
        setChartHeight(300);
      } else {
        setChartHeight(350);
      }
    };

    window.addEventListener("resize", resizeChart);

    resizeChart();
  });

  // Hide Y-axis Label for Screens smaller than 600px
  const [showYaxisLabel, setShowYaxisLabel] = useState(true);
  // Event listener to handle wether  Y-axis and X-axis LABELS show or not depending on SCREEN width
  useEffect(() => {
    const handleResize = () => {
      setShowYaxisLabel(window.innerWidth >= 600);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="etfPriceChart-container">
      <h2>Valor Cuota Historico</h2>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: -5 }}
        >
          <XAxis dataKey="date" />
          {showYaxisLabel ? <YAxis /> : undefined}
          <Tooltip />
          <Area
            type="monotone"
            dataKey="close"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.7}
          />
        </AreaChart>
      </ResponsiveContainer>
      <p>Actualizado a la fecha: {data["Meta Data"]["3. Last Refreshed"]}</p>
    </div>
  );
}

export default EtfHistoricalValues;
