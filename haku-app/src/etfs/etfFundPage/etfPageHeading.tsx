import { EtfPageProps } from "../../types/etfTypes";
import "./etfPageHeading.css";

// Helper Function to Apply Color to Return Text
const getReturnColor = (value: number | null) => {
  if (value === null) {
    return "";
  }
  if (value >= 0) {
    return "green";
  } else return "red";
};

function EtfPageHeading({ etfData, etfMonthlyValues }: EtfPageProps) {
  return (
    <div id="etfPage-Heading">
      <img
        src={`/logosGestoresEtfs/${etfData["logo"]}`}
        className="etfPage-header__logo"
      ></img>
      <div>
        <h2>{etfData["name"]}</h2>
        <strong>Gestor:</strong>
        <strong>{etfData["gestor"]}</strong>
      </div>
      <h3 className={getReturnColor(etfMonthlyValues["Meta Data"]["5. CAGR"])}>
        {(etfMonthlyValues["Meta Data"]["5. CAGR"] * 100).toFixed(2)}%
      </h3>
    </div>
  );
}

export default EtfPageHeading;
