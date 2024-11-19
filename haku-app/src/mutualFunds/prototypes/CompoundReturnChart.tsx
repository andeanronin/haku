import React, { useState, useEffect, useMemo } from "react";
import "./CompoundReturnChart.css";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { MutualFundData } from "../types/mutualFundTypes";

// The Data Format for Recharts anual return Graph
type ChartData = {
  year: string;
  [key: string]: string | number | null;
};

// Define a type for the compound returns object
type CompoundReturns = { [key: string]: number };

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

function CompoundedReturnsChart({ fundData }: { fundData: MutualFundData }) {
  // Helper Function to get Object with yearly compounded returns
  const getCompoundReturns = (
    fund: { [key: string]: any },
    initialInvestment: number
  ) => {
    const keys = Object.keys(fund);
    const rentabilidadKeys = keys
      .filter((key) => key.startsWith("Rentabilidad"))
      .sort();

    let accumulatedValue = initialInvestment;
    const compoundReturns: { [key: string]: number } = {};

    // Find the first non-null rentabilidad year
    const firstNonNullYear = rentabilidadKeys.find((key) => fund[key] !== null);

    if (firstNonNullYear) {
      const firstYear = parseInt(firstNonNullYear.split(" ")[1]);
      const initialInvestmentYear = `Rentabilidad ${firstYear - 1}`;
      compoundReturns[initialInvestmentYear] = initialInvestment;

      rentabilidadKeys.forEach((key) => {
        const year = parseInt(key.split(" ")[1]);
        if (year >= firstYear && fund[key] !== null) {
          accumulatedValue *= 1 + fund[key];
          compoundReturns[key] = accumulatedValue;
        }
      });
    }

    return compoundReturns;
  };
  // State Variables
  const [userInvestment, setUserInvestment] = useState<number>(100);
  const [compoundedReturns, setCompoundedReturns] = useState<CompoundReturns>(
    getCompoundReturns(fundData, userInvestment)
  );
  const [chartHeight, setChartHeight] = useState(500); // use to set BOTH CHART'S heights depending on screen size
  const [showYaxisLabelLineChart, setShowYaxisLabelLineChart] = useState(true);
  const [showXaxisLabel, setShowXaxisLabel] = useState(true);
  // State Variable to control Line Chart Margins for different screen sizes :
  const [lineChartMargin, setLineChartMargin] = useState({
    top: 10,
    right: 15,
    left: 25,
    bottom: 0,
  });
  const [tickStyle, setTickStyle] = useState({ fontSize: 12 }); // used to control the font size of ticks in BOTH charts

  // ENSURE that Compounded Return UPDATES when fundData or userInvestment changes
  useEffect(() => {
    setCompoundedReturns(getCompoundReturns(fundData, userInvestment));
  }, [fundData, userInvestment]);

  // Format Compounded Returns Data for Recharts Line Graph
  const compoundedReturnsChartData = useMemo(
    () => rechartsFormat(compoundedReturns, "Valor"),
    [compoundedReturns]
  );

  const handleInvestmentInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(event.target.value);
    setUserInvestment(isNaN(value) ? 0 : value);
  };

  // Get Max Return Value for Compound Returns LineChart
  const maxValue = Math.max(
    ...compoundedReturnsChartData
      .map((item) => item.Valor)
      .filter((value): value is number => value !== null)
  );

  // Get max value for Y-axis (conditions: multiple of 20 / at least 20 more )
  const yAxisMax = Math.ceil(maxValue / 20) * 20;

  //  Get approriate y-axis tick values for each different compound returns line chart
  const getLineChartTicks = (maxYaxis: number) => {
    const ticks = [];
    for (let i = 0; i <= maxYaxis; i += 20) {
      ticks.push(i);
    }
    return ticks;
  };

  // Call Function --> getLineChartTicks with yAxisMax and get Y-axis ticks for the LINE CHART
  const yAxisTicks = getLineChartTicks(yAxisMax);
  console.log("Y-Axis Ticks for Line Chart");
  console.log(yAxisTicks);

  // Event listener to handle wether  Y-axis and X-axis LABELS show or not depending on SCREEN width
  useEffect(() => {
    const handleResize = () => {
      setShowYaxisLabelLineChart(window.innerWidth >= 768);
      setShowXaxisLabel(window.innerWidth >= 768); // hides X-axis Label on BOTH charts in screens smaller than 768
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

  // RESIZING MARGINS for LINE CHART based on SCREEN WIDTH (adapts line chart for different screen sizes)
  useEffect(() => {
    const resizeLineChartMargin = () => {
      if (window.innerWidth <= 450) {
        setLineChartMargin({ top: 10, right: 5, left: -35, bottom: -10 });
      } else if (window.innerWidth <= 768) {
        setLineChartMargin({ top: 10, right: 5, left: -30, bottom: -5 });
      } else {
        setLineChartMargin({ top: 10, right: 15, left: 10, bottom: 0 });
      }
    };

    window.addEventListener("resize", resizeLineChartMargin);
    resizeLineChartMargin(); //

    return () => window.removeEventListener("resize", resizeLineChartMargin);
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
    <section className="compound-returns">
      <div id="retornoAcumulado-Graph-Heading">
        <h2>Retorno Acumulado</h2>
        <div className="content-wrapper">
          <label htmlFor="investment-input" style={{ color: "white" }}>
            <span>Inversión:</span>
            <input
              id="investment-input"
              type="number"
              value={userInvestment}
              onChange={handleInvestmentInputChange}
            />
          </label>
          <p>
            <span>Valor Actual:</span>
            {compoundedReturns["Rentabilidad 2024"].toFixed()} despues de{" "}
            {fundData["Cumulative Return Period"]} años
          </p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={chartHeight}>
        <AreaChart data={compoundedReturnsChartData} margin={lineChartMargin}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            label={
              showXaxisLabel
                ? { value: "Año", position: "bottom", offset: 5 }
                : undefined
            }
            tick={tickStyle}
          />
          <YAxis
            label={
              showYaxisLabelLineChart
                ? {
                    value: "Valor de Inversion",
                    angle: -90,
                    position: "insideLeft",
                    offset: 0,
                  }
                : undefined
            }
            domain={[0, yAxisMax]}
            ticks={yAxisTicks}
            tick={tickStyle}
            tickFormatter={(value) => `${value.toFixed(0)}`}
          />
          <Tooltip formatter={(value) => `$ ${Number(value).toFixed(2)}`} />
          <Legend
            verticalAlign="bottom"
            align="left"
            wrapperStyle={{ paddingLeft: "100px" }}
          />
          <Area
            type="monotone"
            dataKey="Valor"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
            connectNulls
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>
  );
}

export default CompoundedReturnsChart;
