// Component for each fund's independent page

import "./FundPage.css";
import FooterComponent from "./footerComp";
import Navbar from "./Navbar";
import React, { useState, useEffect, useMemo } from "react";

import {
  BarChart,
  Line,
  LineChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  Cell,
} from "recharts";

interface FundData {
  "Tipo Fondo": string;
  "Fondo Mutuo": string;
  Administradora: string;
  "Fec. Inicio Operación": string;
  "Moneda Cuota": string;
  "Valor Cuota": number | null;
  "Rentabilidad 2024": number | null;
  "Rentabilidad 2023": number | null;
  "Rentabilidad 2022": number | null;
  "Rentabilidad 2021": number | null;
  "Rentabilidad 2020": number | null;
  "Rentabilidad 2019": number | null;
  "Rentabilidad 2018": number | null;
  "Rentabilidad 2017": number | null;
  "Rentabilidad 2016": number | null;
  "Rentabilidad 2015": number | null;
  "Rentabilidad 2014": number | null;
  "Patrimonio S/.": number | null;
  "Partícipes N": number | null;
  "A\u00f1os": number | null;
  Categoria: string;
  "Fund id": number;
  "Highest Return": number | null;
  "Lowest Return": number | null;
  "Avg Return (Arithmetic)": number | null;
  "Standard Deviation of Returns": number | null;
  "Total Cumulative Return": number | null;
  "Cumulative Return Period": number | null;
  "Annualized Cumulative Return": number | null;
  CAGR: number | null;
  "Sharpe Ratio": number | null;
  Risk: string | null;
  Logo: string;
  [key: string]: string | number | null; // Index signature for dynamic access
}

// The Data Format for Recharts anual return Graph
type ChartData = {
  year: string;
  [key: string]: string | number | null;
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

// Define a type for the compound returns object
type CompoundReturns = { [key: string]: number };

function FundPage({ fundData }: { fundData: FundData }) {
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
  const [chartHeight, setChartHeight] = useState(500);
  const [showYaxisLabelLineChart, setShowYaxisLabelLineChart] = useState(true);
  const [showXaxisLabel, setShowXaxisLabel] = useState(true);
  const [showYaxisLabelBarChart, setShowYaxislabelBarChart] = useState(true);
  const [barChartMargin, setBarChartMargin] = useState({
    top: 30,
    right: 20,
    left: 20,
    bottom: 20,
  });

  // ENSURE that Compounded Return UPDATES when fundData or userInvestment changes
  useEffect(() => {
    setCompoundedReturns(getCompoundReturns(fundData, userInvestment));
  }, [fundData, userInvestment]);

  // Event listener to HANDLE LINECHART Y AXIS AND X AXIS LABELS BASED ON SCREEN WIDTH
  useEffect(() => {
    const handleResize = () => {
      setShowYaxisLabelLineChart(window.innerWidth >= 1100);
      setShowXaxisLabel(window.innerWidth >= 768);
      setShowYaxislabelBarChart(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial state

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper function to format date strings
  const formatDate = (dateString: string): string => {
    // Split the date string into components
    const parts = dateString.split("/");

    // Ensure we have at least day, month, and year
    if (parts.length < 3) {
      return "Invalid Date";
    }

    let [day, month, year] = parts;

    // Pad the year to 4 digits if it's 2 digits
    if (year.length === 2) {
      const currentYear = new Date().getFullYear();
      const century = Math.floor(currentYear / 100) * 100;
      year = (century + parseInt(year, 10)).toString();
    }

    // Pad day and month with leading zero if necessary
    day = day.padStart(2, "0");
    month = month.padStart(2, "0");

    // Create a new Date object (note: months are 0-indexed in JavaScript)
    const date = new Date(`${year}-${month}-${day}T00:00:00Z`);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    // Format the date
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC", // Use UTC to avoid timezone issues
    });
  };

  // Helper function to format currency values
  const formatCurrency = (value: number | null, currency: string): string => {
    if (value === null) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency === "$" ? "USD" : "PEN",
      minimumFractionDigits: 2,
    }).format(value);
  };

  // Helper function to format percentage values
  const formatPercentage = (value: number | null): string => {
    if (value === null) return "N/A";
    return `${(value * 100).toFixed(2)}%`;
  };

  // Function Call --> Transform Data for Anual Returns BAR CHART
  const barChartData = rechartsFormat(fundData, "Rentabilidad");

  // Function to get Bar Color in Anual Returns Barchart
  const getBarColor = (value: number) => (value >= 0 ? "#4CAF50" : "#F44336");

  // Format Compounded Returns Data for Recharts
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

  //  Get tick values dynamically
  const getLineChartTicks = (maxYaxis: number) => {
    const ticks = [];
    for (let i = 0; i <= maxYaxis; i += 20) {
      ticks.push(i);
    }
    return ticks;
  };

  const yAxisTicks = getLineChartTicks(yAxisMax);

  // CHART HEIGHTS FOR DIFFERENT SCREENS
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

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // RESIZING MARGINS OF BAR CHART FOR DIFFERENT SCREEN SIZES
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setBarChartMargin({ top: 10, right: 15, left: -15, bottom: 0 });
      } else {
        setBarChartMargin({ top: 30, right: 20, left: 20, bottom: 20 });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to set initial margin

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Navbar />
      <div className="fund-page">
        {/* Fund Page Header */}
        <header className="fund-header">
          <img
            src={fundData["Logo"]}
            className="fundPage-fund-header__logo"
          ></img>
          <div>
            <h1 className="fund-header__title">{fundData["Fondo Mutuo"]}</h1>
            <p className="fund-header__type">
              Tipo de Fondo: {fundData["Tipo Fondo"]}{" "}
              {fundData["Tipo Fondo"] === fundData["Categoria"]
                ? ""
                : ` - ${fundData["Categoria"]}`}
            </p>
          </div>
        </header>

        {/* General Fund Info */}
        <div className="fundData-container">
          <h2 className="fund-page__subheading">Datos Generales</h2>

          {/* General Fund Info */}
          <section className="fund-info">
            <div className="info-item">
              <h3 className="info-item__title">Gestor</h3>
              <p className="info-item__value">{fundData.Administradora}</p>
            </div>
            <div className="info-item">
              <h3 className="info-item__title">Fecha de Inicio</h3>
              <p className="info-item__value">
                {formatDate(fundData["Fec. Inicio Operación"])}
              </p>
            </div>
            <div className="info-item">
              <h3 className="info-item__title">Moneda</h3>
              <p className="info-item__value">
                {fundData["Moneda Cuota"] === "$" ? "USD" : "PEN"}
              </p>
            </div>
            <div className="info-item">
              <h3 className="info-item__title">Valor Cuota Actual</h3>
              <p className="info-item__value">
                {fundData["Valor Cuota"] !== null
                  ? formatCurrency(
                      fundData["Valor Cuota"],
                      fundData["Moneda Cuota"]
                    )
                  : "N/A"}
              </p>
            </div>
          </section>

          {/* General Stats */}
          <section className="fund-stats">
            <div className="stat-item">
              <h3 className="stat-item__title ">Assets Under Management</h3>
              <p className="stat-item__value">
                {fundData["Patrimonio S/."] !== null
                  ? formatCurrency(fundData["Patrimonio S/."], "PEN")
                  : "N/A"}
              </p>
            </div>
            <div className="stat-item">
              <h3 className="stat-item__title ">Numero de Participantes</h3>
              <p className="stat-item__value">
                {fundData["Partícipes N"] !== null
                  ? fundData["Partícipes N"].toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </section>
        </div>

        {/* Fund Return Indicators  */}
        <div
          className="fundData-container"
          id="fundPage-fundIndicators-container"
        >
          <h2 className="fund-page__subheading">Indicadores de Retorno</h2>
          <section className="fund-indicators">
            <div className="info-item">
              <h3 className="info-item__title">Retorno Historico</h3>
              <p className="info-item__subtitle">CAGR</p>
              <p className="info-item__value">
                {fundData["CAGR"] === null
                  ? "N/A"
                  : `${(fundData.CAGR * 100).toFixed(2)} %`}
              </p>
            </div>

            <div className="info-item">
              <h3 className="info-item__title">Retorno x Riesgo</h3>
              <p className="info-item__subtitle">Sharpe</p>
              <p className="info-item__value">
                {fundData["Sharpe Ratio"] === null
                  ? "N/A"
                  : fundData["Sharpe Ratio"].toFixed(2)}
              </p>
            </div>

            <div className="info-item">
              <h3 className="info-item__title">Riesgo</h3>
              <p className="info-item__value">
                {fundData["Risk"] === null ? "N/A" : fundData["Risk"]}
              </p>
            </div>

            <div className="info-item">
              <h3 className="info-item__title">Retorno Acumulado</h3>
              <p className="info-item__subtitle">
                {fundData["Cumulative Return Period"] === null
                  ? ""
                  : `${fundData["Cumulative Return Period"]} años`}
              </p>
              <p className="info-item__value">
                {fundData["Total Cumulative Return"] === null
                  ? "N/A"
                  : ` ${(fundData["Total Cumulative Return"] * 100).toFixed(
                      2
                    )} %`}
              </p>
            </div>
          </section>
        </div>

        {/* Fund Anualized Performance Chart */}
        <section className="fund-performance">
          <h2 className="fund-performance__title">
            Retornos Anuales Historicos
          </h2>
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
                2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015,
                2014,
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
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis
                dataKey="year"
                label={{ value: "Año", position: "insideBottom", offset: -20 }}
              />
              <YAxis
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
              />
              <Tooltip />

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

        {/* Compound Returns LINE Chart */}
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
            <LineChart
              data={compoundedReturnsChartData}
              margin={{ top: 10, right: 15, left: -15, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="year"
                label={
                  showXaxisLabel
                    ? { value: "Año", position: "bottom", offset: 5 }
                    : undefined
                }
              />
              <YAxis
                label={
                  showYaxisLabelLineChart
                    ? {
                        value: "Retorno Acumulado",
                        angle: -90,
                        position: "insideLeft",
                        offset: -15,
                      }
                    : undefined
                }
                domain={[0, yAxisMax]}
                ticks={yAxisTicks}
                tickFormatter={(value) => `${value.toFixed(0)}`}
              />
              <Tooltip />
              <Legend
                verticalAlign="bottom"
                align="left"
                wrapperStyle={{ paddingLeft: "100px" }}
              />
              <Line
                type="monotone"
                dataKey="Valor"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                connectNulls
              />
            </LineChart>
          </ResponsiveContainer>
        </section>

        <div className="buyButtonContainer">
          <button className="buyFundButton">Lo Quiero</button>
        </div>
      </div>

      <FooterComponent />
    </>
  );
}

export default FundPage;
