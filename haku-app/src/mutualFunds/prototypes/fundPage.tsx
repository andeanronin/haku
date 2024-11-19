// Component for each fund's independent page

import "./FundPage.css";
import Papa from "papaparse";
import FooterComponent from "../../footerComp";
import Navbar from "../../Navbar";
import CompoundedReturnsChart from "./CompoundReturnChart";
import AnnualReturnsChart from "./AnnualReturnChart";
import { MutualFundData } from "../../types/mutualFundTypes";

// Helper function to format date strings
const formatDate = (dateString: string): string => {
  // Split the date string into components
  const parts = dateString.split("/");

  // Ensure we have at least day, month, and year
  if (parts.length < 3) {
    return "Invalid Date";
  }

  let [day, month, year] = parts; // array destructuring to store the 3 strings to variables: day, month, year

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

function FundPage({ fundData }: { fundData: MutualFundData }) {
  // Function to allow user to download data to csv
  const handleDownloadCSV = () => {
    const csvData = Papa.unparse([fundData]); // Converts the object to CSV format
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fundData["Fondo Mutuo"]}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        <AnnualReturnsChart fundData={fundData} />

        {/* Compound Returns LINE Chart */}
        <CompoundedReturnsChart fundData={fundData} />

        <div className="buyButtonContainer">
          <button className="buyFundButton" onClick={handleDownloadCSV}>
            Download
          </button>
        </div>
      </div>

      <FooterComponent />
    </>
  );
}

export default FundPage;
