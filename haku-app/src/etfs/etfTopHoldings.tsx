// Top Holdings Table
import "./etfTopHoldings.css";
import { EtfProfiles } from "../types/etfTypes";

function EtfTopHoldings({ data }: { data: EtfProfiles }) {
  const fundHoldings = data["holdings"];

  if (!fundHoldings || fundHoldings.length === 0) {
    return (
      <div id="etfTopHoldings-container">
        <h2>No Holdings Data Available</h2>{" "}
      </div>
    );
  }

  // Function to get Top Holdings from array with All the holdings
  const getTopHoldings = (holdings: EtfProfiles["holdings"]) => {
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
