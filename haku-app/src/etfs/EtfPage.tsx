// ETF Fund Page
import "./EtfPage.css";
import Navbar from "../Navbar";
import FooterComponent from "../footerComp";
import EtfAssetAllocationChart from "./EtfAssetAllocChart";
import EtfSectorAllocation from "./EtfSectorAllocation";
import EtfTopHoldings from "./etfTopHoldings";
import EtfHistoricalValues from "./etfPriceChart";
import Papa from "papaparse";
import React from "react";
import { EtfPageProps } from "../types/etfTypes";
import { EtfProfile } from "../types/etfTypes"; // Update with correct paths

function EtfsFundPage({ etfData, etfMonthlyValues }: EtfPageProps) {
  // Helper Function to format decimals in percent
  const toPercentage = (decimal: number) => {
    const valueInPercent = (decimal * 100).toFixed(2);
    return valueInPercent;
  };

  // Helper function to format large values in billions or millions
  const formatLargeNumbers = (value: string) => {
    if (value.length >= 10) {
      const inBillions = value.slice(0, -9);
      return `${inBillions} Billion`;
    } else if (value.length >= 7) {
      const inMillions = value.slice(0, -6);
      return `${inMillions} Million`;
    } else {
      return value;
    }
  };

  // Flatten the EtfProfile for CSV
  const flattenEtfProfile = (data: EtfProfile) => {
    return {
      ...data,
      ...data.asset_allocation, // Spread asset_allocation into top-level fields
      sectors: JSON.stringify(data.sectors), // Convert sectors to JSON string for CSV
      holdings: JSON.stringify(data.holdings), // Convert holdings to JSON string for CSV
    };
  };

  // CSV download for EtfProfile
  const handleDownloadEtfProfileCSV = () => {
    const csvData = Papa.unparse([flattenEtfProfile(etfData)]);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${etfData.name}_profile.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV download for EtfMonthlyValues
  const handleDownloadEtfMonthlyValuesCSV = () => {
    const flattenedMonthlyValues = Object.keys(
      etfMonthlyValues["Monthly Adjusted Time Series"]
    ).map((date) => ({
      date,
      ...etfMonthlyValues["Monthly Adjusted Time Series"][date],
    }));
    const csvData = Papa.unparse(flattenedMonthlyValues);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${etfMonthlyValues["Meta Data"]["2. Symbol"]}_monthly_values.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  //

  return (
    <>
      <Navbar />
      <div id="etfPage-Container">
        {/* Heading */}
        <div id="etfPage-Heading">
          <img
            src={`/logosGestoresEtfs/${etfData["logo"]}`}
            className="fundPage-fund-header__logo"
          ></img>
          <div>
            <h2>{etfData["name"]}</h2>
            <strong>Gestor:</strong>
            <strong>{etfData["gestor"]}</strong>
          </div>
        </div>

        {/* Etf General Data Section */}
        <h2 id="etfPage-heading-indicadores">
          Indicadores Generales del Fondo
        </h2>
        <div id="etfPage-generalData">
          <div className="etfPage-infoItem">
            <h3>Net Assets</h3>
            <p>${formatLargeNumbers(etfData["net_assets"])}</p>
          </div>
          <div className="etfPage-infoItem">
            <h3>Net Expense Ratio</h3>
            <p>{toPercentage(Number(etfData["net_expense_ratio"]))}%</p>
          </div>
          <div className="etfPage-infoItem">
            <h3>Portfolio Turnover</h3>
            <p>{toPercentage(Number(etfData["portfolio_turnover"]))}%</p>
          </div>
          <div className="etfPage-infoItem">
            <h3>Dividend Yield</h3>
            <p>{toPercentage(Number(etfData["dividend_yield"]))}%</p>
          </div>
          <div className="etfPage-infoItem">
            <h3>Fecha de Inicio</h3>
            <p>{etfData["inception_date"]}</p>
          </div>
          <div className="etfPage-infoItem">
            <h3>Apalancamiento / Deuda</h3>
            <p>{etfData["leveraged"]}</p>
          </div>
          <div className="etfPage-infoItem">
            <h3>Retorno (Cagr)</h3>
            <p>
              {(etfMonthlyValues["Meta Data"]["5. CAGR"] * 100).toFixed(2)}%
            </p>
          </div>
          <div className="etfPage-infoItem">
            <h3>Riesgo (Standard Dev)</h3>
            <p>
              {etfMonthlyValues["Meta Data"]["6. Stdev of Returns"]?.toFixed(2)}
            </p>
          </div>
          <div className="etfPage-infoItem">
            <h3>Risk Adjusted Returns (Sharpe)</h3>
            <p>
              {etfMonthlyValues["Meta Data"]["7. Sharpe Ratio"]?.toFixed(3)}
            </p>
          </div>
        </div>

        <div className="etfPage-allocationCharts">
          {/* ETF Asset Allocation Chart*/}
          <EtfAssetAllocationChart data={etfData} />

          {/* ETF Sector Allocation Chart */}
          <EtfSectorAllocation data={etfData} />
        </div>

        {/* ETF Top Holdings  Chart */}
        <EtfTopHoldings data={etfData} />

        {/* Historical Monthly Values */}
        <EtfHistoricalValues data={etfMonthlyValues} />

        {/* Button to download EtfProfile */}
        <div className="downloadButtonContainer">
          <button
            className="downloadButton"
            onClick={handleDownloadEtfProfileCSV}
          >
            Download ETF Profile
          </button>

          {/* Button to download EtfMonthlyValues */}
          <button
            className="downloadButton"
            onClick={handleDownloadEtfMonthlyValuesCSV}
          >
            Download Monthly Values
          </button>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}

export default React.memo(EtfsFundPage);
