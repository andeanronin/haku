// sorting etf keys

import data from "../data/twenty-monthly-values-final.json" assert { type: "json" };

const etfKeys = Object.keys(data);

console.log(etfKeys);

const sortedKeys = Object.keys(data).sort(
  (a, b) => data[a]["Meta Data"]["5. CAGR"] - data[b]["Meta Data"]["5. CAGR"]
);

console.log(sortedKeys);

// Sorting for CAGR
const sortEtfTickersByCagr = (tickers) =>
  [...tickers].sort(
    (a, b) =>
      etfMonthlyValues[b]["Meta Data"]["5. CAGR"] -
      etfMonthlyValues[a]["Meta Data"]["5. CAGR"]
  );

const handleReturnClick = () => {
  const sortedTickers = sortEtfTickersByCagr(etfTickers);
  setTickers(sortedTickers);
};
