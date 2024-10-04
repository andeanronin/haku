// Etf Cards Component

import { AllEtfData } from "../types/etfTypes";
import EtfCard from "./etfCard";
import { useEffect, useState } from "react";

function EtfCards({ etfProfiles, etfMonthlyValues }: AllEtfData) {
  const etfTickers = Object.keys(etfProfiles);

  const [data, setData] = useState(etfTickers);
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  // Sort Tickers based on Returns (CAGR)
  const sortTickers = (tickers: Array<string>, column: String) => {
    if (column === "Retorno") {
      return [...tickers].sort(
        (a, b) =>
          etfMonthlyValues[b]["Meta Data"]["5. CAGR"] -
          etfMonthlyValues[a]["Meta Data"]["5. CAGR"]
      );
    } else if (column === "Sharpe") {
      return [...tickers].sort(
        (a, b) =>
          etfMonthlyValues[b]["Meta Data"]["7. Sharpe Ratio"] -
          etfMonthlyValues[a]["Meta Data"]["7. Sharpe Ratio"]
      );
    } else if (column === "Dividend-Yield") {
      return [...tickers].sort(
        (a, b) =>
          Number(etfProfiles[b]["dividend_yield"]) -
          Number(etfProfiles[a]["dividend_yield"])
      );
    }

    // If no match is found, return the original tickers array
    return [...tickers];
  };

  // Update
  const handleSortClick = (column: string) => {
    const sortedTickers = sortTickers(etfTickers, column);
    console.log("sorted tickers", sortedTickers);
    setData(sortedTickers);
  };

  // State Management for Card-view Filters
  useEffect(() => {
    const filteredTickers = etfTickers.filter((ticker) => {
      const riskMatch =
        !selectedRisk ||
        etfMonthlyValues[ticker]["Meta Data"]["8. Risk"] === selectedRisk;
      const sectorMatch =
        !selectedSector ||
        etfProfiles[ticker]["sectors"]?.[0]?.["sector"] === selectedSector;

      return riskMatch && sectorMatch;
    });

    console.log("filtered tickers", filteredTickers);

    setData(filteredTickers);
  }, [selectedRisk, selectedSector]);

  // Sort data based on Return (cagr) when button is clicked
  /*function handleSortByReturn() {

  }*/

  // Risk Types
  const uniqueRiskTypes = [
    "Low",
    "Medium Low",
    "Medium",
    "Medium High",
    "High",
  ];

  // Set of Etf Sectors (non-repeating) (iterate over etf profiles, and add the value for the sector keys to a set)
  let sectors = new Set(); // explicitly setting the type of sectors as a set of strings
  for (const etf of etfTickers) {
    const sector = etfProfiles[etf]["sectors"]?.[0]?.["sector"];
    if (sector) {
      // excludes undefined, null, empty strings
      sectors.add(sector);
    }
  }
  const sectorsArray = Array.from(sectors) as string[];

  return (
    <>
      {/* Etf Card Filters */}
      <div className="etfCards-filters">
        <p>Filtrar por:</p>
        <p>
          Sector
          <div className="etf-Dropdown">
            {sectorsArray.map((sector) => (
              <div
                className="etfDropdown-option"
                onClick={() => setSelectedSector(sector)}
              >
                {sector}
              </div>
            ))}
          </div>
        </p>
        <p onClick={() => handleSortClick("Retorno")}>Retorno</p>
        <p onClick={() => handleSortClick("Sharpe")}>Retorno x Riesgo</p>
        <p>
          Riesgo
          <div className="etf-Dropdown">
            {uniqueRiskTypes.map((riskType) => (
              <div
                key={riskType}
                className="etfDropdown-option"
                onClick={() => setSelectedRisk(riskType)}
              >
                {riskType}
              </div>
            ))}
          </div>
        </p>
      </div>

      {/* Clearing Filters */}
      <div className="filters-container">
        {selectedSector && (
          <div className="fund-filter-reset">
            <button onClick={() => setSelectedSector(null)}>Clear</button>{" "}
            <p>Sector: {selectedSector}</p>
          </div>
        )}
        {selectedRisk && (
          <div className="fund-filter-reset">
            <button onClick={() => setSelectedRisk(null)}>Clear</button>{" "}
            <p>Risk: {selectedRisk}</p>
          </div>
        )}
      </div>

      {/* Etf Cards Container */}
      <div className="etfCards-container">
        {data.map((etfTicker) => {
          const path = `/etf/${etfTicker}`;
          return (
            <EtfCard
              etfProfiles={etfProfiles}
              etfMonthlyValues={etfMonthlyValues}
              etfTicker={etfTicker}
              path={path}
            />
          );
        })}
      </div>
    </>
  );
}

export default EtfCards;
