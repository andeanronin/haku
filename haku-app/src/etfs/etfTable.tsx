// etf table view
import { useState } from "react";
import { AllEtfData } from "../types/etfTypes";
import { useNavigate } from "react-router-dom";

function EtfTable({ etfProfiles, etfMonthlyValues }: AllEtfData) {
  const navigate = useNavigate();

  const etfTickers = Object.keys(etfProfiles);

  const [tickers, setTickers] = useState(etfTickers);

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
    } else if (column === "Assets") {
      return [...tickers].sort(
        (a, b) =>
          Number(etfProfiles[b]["net_assets"]) -
          Number(etfProfiles[a]["net_assets"])
      );
    } else if (column === "Expense") {
      return [...tickers].sort(
        (a, b) =>
          Number(etfProfiles[a]["net_expense_ratio"]) -
          Number(etfProfiles[b]["net_expense_ratio"])
      );
    } else if (column === "Turnover") {
      return [...tickers].sort(
        (a, b) =>
          Number(etfProfiles[b]["portfolio_turnover"]) -
          Number(etfProfiles[a]["portfolio_turnover"])
      );
    }

    // If no match is found, return the original tickers array
    return [...tickers];
  };

  const handleSortClick = (column: string) => {
    const sortedTickers2 = sortTickers(etfTickers, column);
    console.log("sorted tickers", sortedTickers2);
    setTickers(sortedTickers2);
  };

  // Set the className of risk column items (if className = "red" , data point is made red)
  const getRiskColor = (value: string | null) => {
    if (value === null) {
      return undefined;
    } else if (value === "Low") {
      return "green";
    } else if (value === "Medium Low") {
      return "green-orange";
    } else if (value === "Medium") {
      return "orange";
    } else if (value === "Medium High") {
      return "orange-red";
    } else {
      return "red";
    }
  };

  // Used to set the color of the return data
  const getReturnColor = (value: number) => {
    if (value >= 0) {
      return "green";
    } else return "red";
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
      <div className="table-container">
        <table className="fondos-table">
          <thead>
            <tr>
              <th>Etf</th>
              <th
                onClick={() => handleSortClick("Assets")}
                style={{ cursor: "pointer" }}
              >
                Net Assets
              </th>
              <th
                onClick={() => handleSortClick("Expense")}
                style={{ cursor: "pointer" }}
              >
                Expense Ratio
              </th>
              <th
                onClick={() => handleSortClick("Turnover")}
                style={{ cursor: "pointer" }}
              >
                Portfolio Turnover
              </th>
              <th
                onClick={() => handleSortClick("Dividend-Yield")}
                style={{ cursor: "pointer" }}
              >
                Dividend Yield
              </th>
              <th
                onClick={() => handleSortClick("Retorno")}
                style={{ cursor: "pointer" }}
              >
                Retorno
              </th>
              <th>Riesgo</th>
              <th
                onClick={() => handleSortClick("Sharpe")}
                style={{ cursor: "pointer" }}
              >
                Retorno x Riesgo
              </th>
            </tr>
          </thead>

          {/* Create Table Rows for Each Etf */}
          <tbody>
            {tickers.map((ticker) => {
              const path = `/etf/${ticker}`;
              return (
                <tr
                  key={ticker}
                  onClick={() => navigate(path)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{ticker}</td>
                  <td>
                    {formatLargeNumbers(etfProfiles[ticker]["net_assets"])}
                  </td>
                  <td>{etfProfiles[ticker]["net_expense_ratio"]}</td>
                  <td>{etfProfiles[ticker]["portfolio_turnover"]}</td>
                  <td>{etfProfiles[ticker]["dividend_yield"]}</td>
                  <td
                    className={getReturnColor(
                      etfMonthlyValues[ticker]["Meta Data"]["5. CAGR"]
                    )}
                  >
                    {(
                      etfMonthlyValues[ticker]["Meta Data"]["5. CAGR"] * 100
                    ).toFixed(2)}
                    %
                  </td>
                  {/* Risk Column */}
                  <td
                    className={getRiskColor(
                      etfMonthlyValues[ticker]["Meta Data"]["8. Risk"]
                    )}
                  >
                    {etfMonthlyValues[ticker]["Meta Data"]["8. Risk"]}{" "}
                  </td>
                  {/* Sharpe Ratio Column */}
                  <td
                    className={getReturnColor(
                      etfMonthlyValues[ticker]["Meta Data"]["7. Sharpe Ratio"]
                    )}
                  >
                    {etfMonthlyValues[ticker]["Meta Data"][
                      "7. Sharpe Ratio"
                    ].toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EtfTable;
