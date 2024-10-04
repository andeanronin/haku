// sorting etf keys

import data from "../data/twenty-monthly-values-final.json" assert { type: "json" };

const etfKeys = Object.keys(data);

console.log(etfKeys);

// example of sorting an object
var list = { you: 100, me: 75, foo: 116, bar: 15 };
keysSorted = Object.keys(list).sort(function (a, b) {
  return list[a] - list[b];
});
console.log(keysSorted); // bar,me,you,foo

// sorting etf keys
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
