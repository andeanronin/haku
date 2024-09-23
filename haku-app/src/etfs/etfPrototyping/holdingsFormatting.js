// Top Holdings

import data from "./sample-etf-profiles.json" assert { type: "json" };

const arkHoldings = data["ARKK"]["holdings"];

/*
let topHoldings = [];

for (let i = 0; i < 8; i++) {
  arkHoldings[i]["weight"] = Number(arkHoldings[i]["weight"]);
  topHoldings.push(arkHoldings[i]);
}

console.log(topHoldings);
*/

const getTopHoldings = (holdings) => {
  let topHoldings = [];

  for (let i = 0; i < 8; i++) {
    holdings[i]["weight"] = Number(holdings[i]["weight"]);
    topHoldings.push(holdings[i]);
  }
  return topHoldings;
};

let arkTopHoldings = getTopHoldings(arkHoldings);
console.log(arkTopHoldings);
