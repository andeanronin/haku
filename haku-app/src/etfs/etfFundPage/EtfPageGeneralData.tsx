import { EtfPageProps } from "../../types/etfTypes";
import "./EtfPageGeneralData.css";

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

function EtfPageGeneralData({ etfData, etfMonthlyValues }: EtfPageProps) {
  return (
    <div id="etfPage-generalData">
      <div className="etfPage-infoItem">
        <h3>Net Assets</h3>
        <p>${formatLargeNumbers(etfData["net_assets"])}</p>
      </div>
      <div className="etfPage-infoItem">
        <h3>Net Expense Ratio</h3>
        <p>{toPercentage(Number(etfData["net_expense_ratio"]))}%</p>
      </div>
      <div className="etfPage-infoItem">
        <h3>Portfolio Turnover</h3>
        <p>{toPercentage(Number(etfData["portfolio_turnover"]))}%</p>
      </div>
      <div className="etfPage-infoItem">
        <h3>Dividend Yield</h3>
        <p>{toPercentage(Number(etfData["dividend_yield"]))}%</p>
      </div>
      <div className="etfPage-infoItem">
        <h3>Fecha de Inicio</h3>
        <p>{etfData["inception_date"]}</p>
      </div>

      <div className="etfPage-infoItem">
        <h3>Retorno (Cagr)</h3>
        <p>{(etfMonthlyValues["Meta Data"]["5. CAGR"] * 100).toFixed(2)}%</p>
      </div>
      <div className="etfPage-infoItem">
        <h3>Riesgo (Standard Dev)</h3>
        <p>
          {etfMonthlyValues["Meta Data"]["6. Stdev of Returns"]?.toFixed(2)}
        </p>
      </div>
      <div className="etfPage-infoItem">
        <h3>Risk Adjusted Returns (Sharpe)</h3>
        <p>{etfMonthlyValues["Meta Data"]["7. Sharpe Ratio"]?.toFixed(3)}</p>
      </div>
    </div>
  );
}

export default EtfPageGeneralData;
