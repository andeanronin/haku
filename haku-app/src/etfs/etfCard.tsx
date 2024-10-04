// etf card
import { useNavigate } from "react-router-dom";
import { EtfCardProps } from "../types/etfTypes";
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

function EtfCard({
  etfProfiles,
  etfMonthlyValues,
  etfTicker,
  path,
}: EtfCardProps) {
  const navigate = useNavigate();

  const etfStdev =
    etfMonthlyValues[etfTicker]["Meta Data"]["6. Stdev of Returns"];

  const getEtfRisk = (stdev: number) => {
    let etfRisk = "Low";

    if (stdev > 0.2) {
      etfRisk = "Alto / Agresivo";
    } else if (stdev > 0.15) {
      etfRisk = "Mediano Alto";
    } else if (stdev > 0.1) {
      etfRisk = "Mediano";
    } else if (stdev > 0.05) {
      etfRisk = "Mediano Bajo";
    } else {
      etfRisk = "Low";
    }

    return etfRisk;
  };

  const etfRiskProfile = getEtfRisk(etfStdev);

  const getRiskColor = (value: string | null) => {
    if (value === null) {
      return undefined;
    } else if (value === "Low") {
      return "green";
    } else if (value === "Mediano Bajo") {
      return "green-orange";
    } else if (value === "Mediano") {
      return "orange";
    } else if (value === "Mediano Alto") {
      return "orange-red";
    } else {
      return "red";
    }
  };

  return (
    <div
      className="fundSquare etf"
      //key={path}
      onClick={() => navigate(path)}
    >
      <h3>{etfProfiles[etfTicker]["name"]}</h3>
      <div className="fundSquare-data-container">
        {/* Sector Principal */}
        <div className="fundSquare-data-div">
          <p style={{ fontWeight: "bold" }}>Sector Principal</p>
          <p>{etfProfiles[etfTicker]["sectors"]?.[0]?.["sector"] || "N/A"}</p>
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
            {etfMonthlyValues[etfTicker]["Meta Data"]["5. CAGR"] === null
              ? "N/A"
              : `${(
                  etfMonthlyValues[etfTicker]["Meta Data"]["5. CAGR"] * 100
                ).toFixed(2)} %`}
          </p>
        </div>

        {/* Retorno x Riesgo */}
        <div className="fundSquare-data-div">
          <p style={{ fontWeight: "bold" }}>Retorno x Riesgo</p>{" "}
          <p>
            {etfMonthlyValues[etfTicker]["Meta Data"]["7. Sharpe Ratio"] === 0
              ? "N/A"
              : etfMonthlyValues[etfTicker]["Meta Data"][
                  "7. Sharpe Ratio"
                ].toFixed(2)}
          </p>
        </div>

        {/* Riesgo */}
        <div className="fundSquare-data-div">
          <p style={{ fontWeight: "bold" }}>Riesgo</p>{" "}
          <p className={getRiskColor(etfRiskProfile)}>
            {etfMonthlyValues[etfTicker]["Meta Data"]["6. Stdev of Returns"] ===
            null
              ? "N/A"
              : etfRiskProfile}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EtfCard;
