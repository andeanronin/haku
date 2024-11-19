import data from "./data.json";
import "./fundInfoCard.css";

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

function FundInfoCard() {
  return (
    <table className="mutualFund-infoTable">
      <tbody>
        <tr>
          <td>Gestor</td>
          <td className="mutualFund-infoTable__datapoint">
            {data.Administradora}
          </td>
        </tr>
        <tr>
          <td>Fecha de Inicio</td>
          <td className="mutualFund-infoTable__datapoint">
            {formatDate(data["Fec. Inicio Operación"])}
          </td>
        </tr>
        <tr>
          <td>Moneda</td>
          <td className="mutualFund-infoTable__datapoint">
            {data["Moneda Cuota"]}
          </td>
        </tr>
        <tr>
          <td>Valor Cuota Actual</td>
          <td className="mutualFund-infoTable__datapoint">
            {data["Valor Cuota"] !== null
              ? formatCurrency(data["Valor Cuota"], data["Moneda Cuota"])
              : "N/A"}
          </td>
        </tr>
        <tr>
          <td>AUM</td>
          <td className="mutualFund-infoTable__datapoint">
            {data["Patrimonio S/."] === null
              ? "N/A"
              : formatCurrency(data["Patrimonio S/."], "PEN")}
          </td>
        </tr>
        <tr>
          <td>Participes</td>
          <td className="mutualFund-infoTable__datapoint">
            {data["Partícipes N"] === null ? "N/A" : data["Partícipes N"]}
          </td>
        </tr>
        <tr>
          <td>Retorno Historico (CAGR)</td>
          <td className="mutualFund-infoTable__datapoint">
            {data.CAGR === null ? "N/A" : (data.CAGR * 100).toFixed(2)}%
          </td>
        </tr>
        <tr>
          <td>Riesgo</td>
          <td className="mutualFund-infoTable__datapoint">
            {data.Risk === null ? "N/A" : data.Risk}
          </td>
        </tr>
        <tr>
          <td>Sharpe Ratio</td>
          <td className="mutualFund-infoTable__datapoint">
            {data["Sharpe Ratio"] === null
              ? "N/A"
              : data["Sharpe Ratio"].toFixed(2)}
          </td>
        </tr>
        <tr>
          <td>Retorno Acumulado</td>
          <td className="mutualFund-infoTable__datapoint">
            {data["Total Cumulative Return"] === null
              ? "N/A"
              : (data["Total Cumulative Return"] * 100).toFixed(2)}
            %
          </td>
        </tr>
        <tr>
          <td>Cumulative Return Period</td>
          <td className="mutualFund-infoTable__datapoint">
            {data["Cumulative Return Period"] === null
              ? "N/A"
              : `${data["Cumulative Return Period"]} años`}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default FundInfoCard;
