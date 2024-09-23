// ETF Fund Page
import "./EtfPage.css";
import Navbar from "../Navbar";
import FooterComponent from "../footerComp";
import EtfAssetAllocationChart from "./EtfAssetAllocChart";
import EtfSectorAllocation from "./EtfSectorAllocation";
import EtfTopHoldings from "./etfTopHoldings";
import EtfHistoricalValues from "./etfPriceChart";
import React from "react";

interface EtfData {
  net_assets: string;
  net_expense_ratio: string;
  portfolio_turnover: string;
  dividend_yield: string;
  inception_date: string;
  leveraged: "YES" | "NO";
  asset_allocation: {
    domestic_equities: string;
    foreign_equities: string;
    bond: string;
    cash: string;
    other: string;
  };
  sectors: Array<{
    sector: string;
    weight: string;
  }>;
  holdings: Array<{
    symbol: string;
    description: string;
    weight: string;
  }>;
  name: string;
}

interface EtfPriceData {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Time Zone": string;
  };
  "Monthly Adjusted Time Series": {
    [date: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. adjusted close": string;
      "6. volume": string;
      "7. dividend amount": string;
    };
  };
}
interface EtfPageProps {
  etfData: EtfData;
  etfMonthlyValues: EtfPriceData; // Replace 'any' with the correct type for etfMonthlyValues
}

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
          <h2>{etfData["name"]}</h2>
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
