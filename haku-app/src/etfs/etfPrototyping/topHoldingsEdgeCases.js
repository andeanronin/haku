// Edge Cases for Top Holdings Function

import etfData from "../data/ten-etf-profiles.json" assert { type: "json" };

const nugtHoldings = etfData["NUGT"]["holdings"];

console.log(nugtHoldings);
console.log("");

function getTopHoldings(holdings) {
  let topHoldings = [];

  for (let i = 0; i < 8; i++) {
    if (!holdings[i]) {
      // if there is no more holdings holdings[5] = undefined, stop loop and return topHoldings
      return topHoldings;
    }
    const weightAsNumber = Number(holdings[i]["weight"]);
    topHoldings.push({
      ...holdings[i],
      weight: weightAsNumber, // Add the numeric weight to the object for use in rendering
    });
  }
  console.log(topHoldings);
  return topHoldings;
}

console.log("Top Holdings");
const nugTopHoldings = getTopHoldings(nugtHoldings);
console.log(nugTopHoldings);
