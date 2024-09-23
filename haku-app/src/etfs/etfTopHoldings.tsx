// Top Holdings Table
import "./etfTopHoldings.css";

interface EtfData {
  net_assets: string;
  net_expense_ratio: string;
  portfolio_turnover: string;
  dividend_yield: string;
  inception_date: string;
  leveraged: "YES" | "NO";
  asset_allocation: {
    domestic_equities: string;
    foreign_equities: string;
    bond: string;
    cash: string;
    other: string;
  };
  sectors: Array<{
    sector: string;
    weight: string;
  }>;
  holdings: Array<{
    symbol: string;
    description: string;
    weight: string;
  }>;
  name: string;
}

function EtfTopHoldings({ data }: { data: EtfData }) {
  const fundHoldings = data["holdings"];

  const getTopHoldings = (holdings: EtfData["holdings"]) => {
    let topHoldings = [];

    for (let i = 0; i < 8; i++) {
      const weightAsNumber = Number(holdings[i]["weight"]);
      topHoldings.push({
        ...holdings[i],
        weight: weightAsNumber, // Add the numeric weight to the object for use in rendering
      });
    }
    return topHoldings;
  };

  const topHoldings = getTopHoldings(fundHoldings);

  return (
    <>
      <div id="etfTopHoldings-container">
        <h2>Top Holdings</h2>
        <table id="etfTopHoldings-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Empresa</th>
              <th>Peso</th>
            </tr>
          </thead>
          <tbody>
            {topHoldings.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item["symbol"]}</td>
                  <td>{item["description"]}</td>
                  <td>{(item["weight"] * 100).toFixed(2)}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default EtfTopHoldings;
