import "./fundHeader.css";
import { MutualFundData } from "../../types/mutualFundTypes";

// Helper function to format currency values
const formatCurrency = (value: number | null, currency: string): string => {
  if (value === null) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency === "$" ? "USD" : "PEN",
    minimumFractionDigits: 0,
  }).format(value);
};

const getReturnColor = (value: number | null) => {
  if (value === null) {
    return "";
  }
  if (value >= 0) {
    return "green";
  } else return "red";
};

function FundHeader({ data }: { data: MutualFundData }) {
  return (
    <header className="mutualFund-Header">
      <img src={data["Logo"]} className="mutualFund-header__logo"></img>
      <div>
        <h1 className="mutualFund-header__title">{data["Fondo Mutuo"]}</h1>
        <p className="mutualFund-header__type">
          Tipo de Fondo: {data["Tipo Fondo"]}{" "}
          {data["Tipo Fondo"] === data["Categoria"]
            ? ""
            : ` - ${data["Categoria"]}`}
        </p>
      </div>
      <div id="mutualFund-Header-indicators">
        <h2>
          {data["Valor Cuota"] !== null
            ? formatCurrency(data["Valor Cuota"], data["Moneda Cuota"])
            : "N/A"}
        </h2>
        <h3 className={getReturnColor(data.CAGR)}>
          {data.CAGR === null ? "N/A" : (data.CAGR * 100).toFixed(2)}%
        </h3>
      </div>
    </header>
  );
}

export default FundHeader;
