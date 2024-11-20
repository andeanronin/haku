import { EtfPageProps } from "../../types/etfTypes";

// Helper Function to Apply Color to Return Text
const getReturnColor = (value: number | null) => {
  if (value === null) {
    return "";
  }
  if (value >= 0) {
    return "green";
  } else return "red";
};

// Helper Function to format decimals in percent
const toPercentage = (decimal: number) => {
  const valueInPercent = (decimal * 100).toFixed(2);
  return valueInPercent;
};

/*
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
*/
function EtfIndicatorsTablets({ etfData, etfMonthlyValues }: EtfPageProps) {
  return (
    <div id="MutualFundIndicators-Container">
      <div>
        <p>Retorno</p>
        <h3
          className={getReturnColor(etfMonthlyValues["Meta Data"]["5. CAGR"])}
        >
          {(etfMonthlyValues["Meta Data"]["5. CAGR"] * 100).toFixed(2)}%
        </h3>
      </div>
      <div id="MutualFundIndicators-PrecioAccion">
        <p>Div. Yield</p>
        <h3> {toPercentage(Number(etfData["dividend_yield"]))}%</h3>
      </div>
      <div>
        <p>Sharpe</p>
        <h3
          className={getReturnColor(
            etfMonthlyValues["Meta Data"]["7. Sharpe Ratio"]
          )}
        >
          {etfMonthlyValues["Meta Data"]["7. Sharpe Ratio"]?.toFixed(3)}
        </h3>
      </div>
      <div>
        <p>Riesgo</p>
        <h3>
          {etfMonthlyValues["Meta Data"]["6. Stdev of Returns"]?.toFixed(2)}
        </h3>
      </div>
    </div>
  );
}

export default EtfIndicatorsTablets;
