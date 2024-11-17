import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  Cell,
} from "recharts";

import { MutualFundData } from "../types/mutualFundTypes";

// The Data Format for Recharts anual return Graph
type ChartData = {
  year: string;
  [key: string]: string | number | null;
};

// Helper function to format percentage values
const formatPercentage = (value: number | null): string => {
  if (value === null) return "N/A";
  return `${(value * 100).toFixed(2)}%`;
};

// Function to Format Data for Recharts
const rechartsFormat = (
  fund: { [key: string]: any },
  rentabilidadLabel: string
): ChartData[] => {
  {
    let years = [];

    const keys = Object.keys(fund);

    const rentaBilidadKeys = keys
      .filter((key) => key.startsWith("Rentabilidad"))
      .sort();

    for (const key of rentaBilidadKeys) {
      if (fund[key] !== null) {
        let year = key.split(" ")[1];
        years.push(year);
      }
    }

    return years.map((y) => ({
      year: y,
      [rentabilidadLabel]: fund[`Rentabilidad ${y}`],
    }));
  }
};

function AnnualReturnsChart({ fundData }: { fundData: MutualFundData }) {
  // State Variables
  const [chartHeight, setChartHeight] = useState(500); // use to set BOTH CHART'S heights depending on screen size
  const [showYaxisLabelBarChart, setShowYaxislabelBarChart] = useState(true);

  // State varibles to control Bar Chart Margins for different screen sizes :
  const [barChartMargin, setBarChartMargin] = useState({
    top: 30,
    right: 20,
    left: 20,
    bottom: 20,
  });
  const [tickStyle, setTickStyle] = useState({ fontSize: 12 }); // used to control the font size of ticks in BOTH charts

  // Function Call --> Transform Data for Anual Returns BAR CHART
  const barChartData = rechartsFormat(fundData, "Rentabilidad");
  console.log("BarChart Data");
  console.log(barChartData);

  // Function to get Bar Color in Anual Returns Barchart
  const getBarColor = (value: number) => (value >= 0 ? "#4CAF50" : "#F44336");

  // Event listener to handle wether  Y-axis and X-axis LABELS show or not depending on SCREEN width
  useEffect(() => {
    const handleResize = () => {
      setShowYaxislabelBarChart(window.innerWidth >= 768); // evaluates to false for screens smaller than 768 and sets showYaxisLabelBarChart to false
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // CHART HEIGHTS (both bar chart & line chart) FOR DIFFERENT SCREENS
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 450) {
        setChartHeight(180);
      } else if (window.innerWidth <= 768) {
        setChartHeight(250);
      } else if (window.innerWidth <= 1100) {
        setChartHeight(350);
      } else {
        setChartHeight(500);
      }
    };

    window.addEventListener("resize", handleResize); // add event listener to window re-sizing, call handleResize when activated
    handleResize(); // Call once to set initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // RESIZING MARGINS OF BAR CHART FOR DIFFERENT SCREEN SIZES
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 450) {
        setBarChartMargin({ top: 10, right: 5, left: -30, bottom: 0 });
      } else if (window.innerWidth <= 768) {
        setBarChartMargin({ top: 10, right: 5, left: -20, bottom: 0 });
      } else {
        setBarChartMargin({ top: 30, right: 5, left: 20, bottom: 20 });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial margin

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Change TICK SIZE in Charts depending on SCREEN WIDTH
  useEffect(() => {
    const updateTickSize = () => {
      // uses window.matchMedia api to check screen width and set tick font size accordingly
      if (window.matchMedia("(max-width: 450px)").matches) {
        setTickStyle({ fontSize: 10 });
      } else if (window.matchMedia("(max-width: 768px)").matches) {
        setTickStyle({ fontSize: 12 });
      } else {
        setTickStyle({ fontSize: 16 });
      }
    };

    // Initial Call on Mount
    updateTickSize();

    // Event listener for window resizing
    window.addEventListener("resize", updateTickSize); // updateTickSize is called whenever the user re-sizes the screen

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", updateTickSize);
  }, []);

  return (
    <section className="fund-performance">
      <h2 className="fund-performance__title">Retornos Anuales Historicos</h2>
      <table className="fund-yearly-returns">
        <thead className="fund-yearly-returns__header ">
          <tr className="fund-yearly-returns__row">
            <th className="fund-yearly-returns__cell fund-yearly-returns__header">
              Year
            </th>
            <th className="fund-yearly-returns__cell fund-yearly-returns__header">
              Return
            </th>
          </tr>
        </thead>
        <tbody>
          {[
            2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
          ].map((year) => (
            <tr key={year} className="fund-yearly-returns__row">
              <td className="fund-yearly-returns__cell">{year}</td>
              <td className="fund-yearly-returns__cell">
                {formatPercentage(
                  fundData[`Rentabilidad ${year}`] as number | null
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Anualized Returns BAR Chart */}
      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart data={barChartData} margin={barChartMargin}>
          <CartesianGrid strokeDasharray="5 5" />{" "}
          <XAxis
            dataKey="year"
            label={{ value: "Año", position: "insideBottom", offset: -20 }}
            tick={tickStyle}
          />
          <YAxis
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
            label={
              showYaxisLabelBarChart
                ? {
                    value: "Rentabilidad del Año",
                    angle: -90,
                    position: "insideLeft",
                    offset: -10,
                    dy: 50,
                  }
                : undefined
            }
            tick={tickStyle} // controls sizes of y-axis ticks depending on screen size
          />
          <Tooltip
            formatter={(value) => `${(Number(value) * 100).toFixed(2)}%`}
          />
          {/* FILLS OUT THE DATA in the Graph */}
          <Bar dataKey="Rentabilidad">
            {barChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(Number(entry.Rentabilidad) || 0)}
              />
            ))}
            <Label
              content={({ viewBox }) => {
                if (!viewBox) return null;
                const { x, y } = viewBox as { x: number; y: number };
                return (
                  <text
                    x={x + 5}
                    y={y + 15}
                    fill="#666"
                    fontSize={14}
                    textAnchor="start"
                  >
                    Rentabilidad
                  </text>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default AnnualReturnsChart;
