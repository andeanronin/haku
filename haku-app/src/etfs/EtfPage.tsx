// ETF Fund Page
import "./EtfPage.css";
import Navbar from "../Navbar";
import FooterComponent from "../footerComp";
import EtfAssetAllocationChart from "./EtfAssetAllocChart";
import EtfSectorAllocation from "./EtfSectorAllocation";
import EtfTopHoldings from "./etfTopHoldings";
import EtfHistoricalValues from "./etfPriceChart";
import React from "react";
import { EtfPageProps } from "../types/etfTypes";

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
        <h2 style={{ color: "white" }}>Indicadores Generales del Fondo</h2>
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
      </div>
      <FooterComponent />
    </>
  );
}

export default React.memo(EtfsFundPage);
