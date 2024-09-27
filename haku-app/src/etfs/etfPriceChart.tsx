// Historical Monthly Values
import "./etfPriceChart.css";
import { EtfPriceData } from "../types/etfTypes";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  date: string;
  close: number;
}

function EtfHistoricalValues({ data }: { data: EtfPriceData }) {
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
  return (
    <div id="etfPriceChart-container">
      <h2>Valor Cuota Historico</h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="close"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.5}
          />
        </AreaChart>
      </ResponsiveContainer>
      <p>Actualizado a la fecha: {data["Meta Data"]["3. Last Refreshed"]}</p>
    </div>
  );
}

export default EtfHistoricalValues;
