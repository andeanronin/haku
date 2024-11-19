import data from "./data.json";
import "./fundIndicators.css";

const getReturnColor = (value: number | null) => {
  if (value === null) {
    return "";
  }
  if (value >= 0) {
    return "green";
  } else return "red";
};

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

function MutualFundIndicators() {
  return (
    <div id="MutualFundIndicators-Container">
      <div>
        <p>Retorno Historico</p>
        <h3 className={getReturnColor(data.CAGR)}>
          {(data.CAGR * 100).toFixed(2)}%
        </h3>
      </div>
      <div>
        <p>Sharpe Ratio</p>
        <h3 className={getReturnColor(data.CAGR)}>
          {data["Sharpe Ratio"].toFixed(2)}
        </h3>
      </div>
      <div>
        <p>Riesgo</p>
        <h3 className={getRiskColor(data.Risk)}>{data.Risk}</h3>
      </div>
    </div>
  );
}

export default MutualFundIndicators;
