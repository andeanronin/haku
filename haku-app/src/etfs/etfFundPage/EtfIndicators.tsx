import { EtfPageProps } from "../../types/etfTypes";

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

// Helper Function to format decimals in percent
const toPercentage = (decimal: number) => {
  const valueInPercent = (decimal * 100).toFixed(2);
  return valueInPercent;
};

// Helper Function to format large values in billions or millions
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

function EtfIndicators({ etfData, etfMonthlyValues }: EtfPageProps) {
  return (
    <table className="mutualFund-infoTable">
      <tbody>
        <tr>
          <td>AUM</td>
          <td className="mutualFund-infoTable__datapoint">
            <strong>${formatLargeNumbers(etfData["net_assets"])}</strong>
          </td>
        </tr>
        <tr>
          <td>Net Expense Ratio</td>
          <td className="mutualFund-infoTable__datapoint">
            <strong>
              {toPercentage(Number(etfData["net_expense_ratio"]))}%
            </strong>
          </td>
        </tr>
        <tr>
          <td>Fecha de Inicio</td>
          <td className="mutualFund-infoTable__datapoint">
            <strong>{etfData.inception_date}</strong>
          </td>
        </tr>
        <tr>
          <td>Portfolio Turnover</td>
          <td className="mutualFund-infoTable__datapoint">
            <strong>{toPercentage(Number(etfData.portfolio_turnover))}%</strong>
          </td>
        </tr>
        <tr>
          <td>Dividend Yield</td>
          <td className="mutualFund-infoTable__datapoint">
            <strong>{toPercentage(Number(etfData["dividend_yield"]))}%</strong>
          </td>
        </tr>
        <tr>
          <td>Retorno (CAGR)</td>
          <td
            className={`mutualFund-infoTable__datapoint ${getReturnColor(
              etfMonthlyValues["Meta Data"]["5. CAGR"]
            )}`}
          >
            <strong>
              {(etfMonthlyValues["Meta Data"]["5. CAGR"] * 100).toFixed(2)}%
            </strong>
          </td>
        </tr>
        <tr>
          <td>Riesgo (Standard Dev)</td>
          <td className="mutualFund-infoTable__datapoint">
            <strong>
              {etfMonthlyValues["Meta Data"]["6. Stdev of Returns"]?.toFixed(2)}
            </strong>
          </td>
        </tr>
        <tr>
          <td>Sharpe Ratio</td>
          <td className={`mutualFund-infoTable__datapoint`}>
            <strong>
              {etfMonthlyValues["Meta Data"]["7. Sharpe Ratio"]?.toFixed(3)}
            </strong>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default EtfIndicators;
