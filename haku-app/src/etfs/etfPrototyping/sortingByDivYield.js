import data from "../data/etfs-profiles.json" assert { type: "json" };

let anArray = [49, 2, 5, 98, 3, 21];
console.log(anArray);
const sortedArray = anArray.sort((a, b) => a - b);
console.log(sortedArray);

const etfTickers = Object.keys(data);

const sortedTickers = etfTickers.sort(
  (a, b) =>
    Number(
      data[b]["dividend_yield"] === "n/a" ? 0 : data[b]["dividend_yield"]
    ) -
    Number(data[a]["dividend_yield"] === "n/a" ? 0 : data[a]["dividend_yield"])
);

console.log(sortedTickers);

for (const ticker of sortedTickers) {
  console.log(data[ticker]["dividend_yield"]);
}
