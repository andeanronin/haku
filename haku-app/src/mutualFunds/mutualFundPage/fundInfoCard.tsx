import "./fundInfoCard.css";
import { MutualFundData } from "../../types/mutualFundTypes";

// Helper function to format currency values
const formatCurrency = (value: number | null, currency: string): string => {
  if (value === null) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency === "$" ? "USD" : "PEN",
    minimumFractionDigits: 2,
  }).format(value);
};

// Helper function to format date strings
const formatDate = (dateString: string): string => {
  // Split the date string into components
  const parts = dateString.split("/");

  // Ensure we have at least day, month, and year
  if (parts.length < 3) {
    return "Invalid Date";
  }

  let [day, month, year] = parts; // array destructuring to store the 3 strings to variables: day, month, year

  // Pad the year to 4 digits if it's 2 digits
  if (year.length === 2) {
    const currentYear = new Date().getFullYear();
    const century = Math.floor(currentYear / 100) * 100;
    year = (century + parseInt(year, 10)).toString();
  }

  // Pad day and month with leading zero if necessary
  day = day.padStart(2, "0");
  month = month.padStart(2, "0");

  // Create a new Date object (note: months are 0-indexed in JavaScript)
  const date = new Date(`${year}-${month}-${day}T00:00:00Z`);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  // Format the date
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // Use UTC to avoid timezone issues
  });
};

// Conditionally applies CSS class (red/green) based on data point value
const getReturnColor = (value: number | null) => {
  if (value === null) {
    return "";
  }
  if (value >= 0) {
    return "green";
  } else return "red";
};

// Apply color to risk categories
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
function FundInfoCard({ data }: { data: MutualFundData }) {
  return (
    <table className="mutualFund-infoTable">
      <tbody>
        <tr>
          <td>Gestor</td>
          <td className="mutualFund-infoTable__datapoint">
            <strong>{data.Administradora}</strong>
          </td>
        </tr>
        <tr>
          <td>Fecha de Inicio</td>
          <td className="mutualFund-infoTable__datapoint">
            <strong>{formatDate(data["Fec. Inicio Operación"])}</strong>
          </td>
        </tr>
        <tr>
          <td>Moneda</td>
          <td className="mutualFund-infoTable__datapoint">
            <strong>{data["Moneda Cuota"]}</strong>
          </td>
        </tr>
        <tr>
          <td>Valor Cuota Actual</td>
          <td className="mutualFund-infoTable__datapoint">
            <strong>
              {data["Valor Cuota"] !== null
                ? formatCurrency(data["Valor Cuota"], data["Moneda Cuota"])
                : "N/A"}
            </strong>
          </td>
        </tr>
        <tr>
          <td>AUM</td>
          <td className="mutualFund-infoTable__datapoint">
            <strong>
              {data["Patrimonio S/."] === null
                ? "N/A"
                : formatCurrency(data["Patrimonio S/."], "PEN")}
            </strong>
          </td>
        </tr>
        <tr>
          <td>Participes</td>
          <td className="mutualFund-infoTable__datapoint">
            <strong>
              {data["Partícipes N"] === null ? "N/A" : data["Partícipes N"]}
            </strong>
          </td>
        </tr>
        <tr>
          <td>Retorno Historico (CAGR)</td>
          <td
            className={`mutualFund-infoTable__datapoint ${getReturnColor(
              data.CAGR
            )}`}
          >
            <strong>
              {data.CAGR === null ? "N/A" : (data.CAGR * 100).toFixed(2)}%
            </strong>
          </td>
        </tr>
        <tr>
          <td>Riesgo</td>
          <td className={getRiskColor(data.Risk)}>
            {data.Risk === null ? "N/A" : data.Risk}
          </td>
        </tr>
        <tr>
          <td>Sharpe Ratio</td>
          <td className={getReturnColor(data["Sharpe Ratio"])}>
            <strong>
              {data["Sharpe Ratio"] === null
                ? "N/A"
                : data["Sharpe Ratio"].toFixed(2)}
            </strong>
          </td>
        </tr>
        <tr>
          <td>Retorno Acumulado</td>
          <td className={getReturnColor(data["Total Cumulative Return"])}>
            <strong>
              {data["Total Cumulative Return"] === null
                ? "N/A"
                : (data["Total Cumulative Return"] * 100).toFixed(2)}
              %
            </strong>
          </td>
        </tr>
        <tr>
          <td>Cumulative Return Period</td>
          <td className="mutualFund-infoTable__datapoint">
            <strong>
              {data["Cumulative Return Period"] === null
                ? "N/A"
                : `${data["Cumulative Return Period"]} años`}
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default FundInfoCard;
