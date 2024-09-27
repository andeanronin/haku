// ETF Funds
import "./etfs.css";
import Navbar from "../Navbar";
import FooterComponent from "../footerComp";
import etfProfiles from "./etfPrototyping/ten-etf-profiles.json";
import etfMonthlyValues from "./etfPrototyping/ten-monthly-values-final.json";
import { useNavigate } from "react-router-dom";

const getReturnColor = (value: number | null) => {
  /*
  Input: the value of a fund's annual return data point 
  Output: a string - 'positive' or 'negative', to set the class of the <td> element. 
  */
  if (value === null) {
    return undefined;
  }
  return value >= 0 ? "positive" : "negative";
};

const etfTickers = Object.keys(etfProfiles);
console.log(etfTickers);

function EtfFunds() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="fundExploreContainer">
        {etfTickers.map((etfTicker) => {
          const path = `/etf/${etfTicker}`;
          return (
            <div
              className="fundSquare"
              //key={path}
              onClick={() => navigate(path)}
            >
              <h3>{etfProfiles[etfTicker]["name"]}</h3>
              <div className="fundSquare-data-container">
                {/* Sector Principal */}
                <div className="fundSquare-data-div">
                  <p style={{ fontWeight: "bold" }}>Sector Principal</p>
                  <p>
                    {etfProfiles[etfTicker]["sectors"][0]?.["sector"] || "N/A"}
                  </p>
                </div>
                {/* Dividend Yield */}
                <div className="fundSquare-data-div">
                  <p style={{ fontWeight: "bold" }}>Dividend Yield</p>
                  <p>{etfProfiles[etfTicker]["dividend_yield"]}</p>
                </div>

                {/* Retorno  (CAGR) */}
                <div className="fundSquare-data-div">
                  <p style={{ fontWeight: "bold" }}>Retorno (CAGR)</p>{" "}
                  <p
                    className={getReturnColor(
                      etfMonthlyValues[etfTicker]["Meta Data"]["5. CAGR"]
                    )}
                  >
                    {" "}
                    {etfMonthlyValues[etfTicker]["Meta Data"]["5. CAGR"] ===
                    null
                      ? "N/A"
                      : `${(
                          etfMonthlyValues[etfTicker]["Meta Data"]["5. CAGR"] *
                          100
                        ).toFixed(2)} %`}
                  </p>
                </div>

                {/* Retorno x Riesgo */}
                <div className="fundSquare-data-div">
                  <p style={{ fontWeight: "bold" }}>Retorno x Riesgo</p>{" "}
                  <p>
                    {etfMonthlyValues[etfTicker]["Meta Data"][
                      "7. Sharpe Ratio"
                    ] === 0
                      ? "N/A"
                      : etfMonthlyValues[etfTicker]["Meta Data"][
                          "7. Sharpe Ratio"
                        ].toFixed(2)}
                  </p>
                </div>

                {/* Riesgo */}
                <div className="fundSquare-data-div">
                  <p style={{ fontWeight: "bold" }}>Riesgo</p>{" "}
                  <p>
                    {etfMonthlyValues[etfTicker]["Meta Data"][
                      "6. Stdev of Returns"
                    ] === null
                      ? "N/A"
                      : etfMonthlyValues[etfTicker]["Meta Data"][
                          "6. Stdev of Returns"
                        ].toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <FooterComponent />
    </>
  );
}

export default EtfFunds;
