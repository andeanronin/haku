// Top Holdings Table
import "./etfTopHoldings.css";
import { EtfProfile } from "../types/etfTypes";

function EtfTopHoldings({ data }: { data: EtfProfile }) {
  const fundHoldings = data["holdings"];

  // handle cases where there is no holdings data
  if (!fundHoldings || fundHoldings.length === 0) {
    return (
      <div id="etfTopHoldings-container">
        <h2>No Holdings Data Available</h2>{" "}
      </div>
    );
  }

  // Function to get an array including only the Top 8 Holdings (taken from the array with all the holdings)
  const getTopHoldings = (holdings?: EtfProfile["holdings"]) => {
    // Return empty array if holdings is undefined
    if (!holdings) return [];

    let topHoldings = [];

    for (let i = 0; i < 8; i++) {
      // handle cases where ETF has less than 8 holdings (stops function at holdings[i] = undefined)
      if (!holdings[i]) {
        return topHoldings;
      }
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
