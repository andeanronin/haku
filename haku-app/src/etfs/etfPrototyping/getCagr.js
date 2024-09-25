// Get Cagr

import mainData from "./sample-monthly-values.json" assert { type: "json" };

for (let etf in mainData) {
  const monthlyTimeSeries = mainData[etf]["Monthly Adjusted Time Series"];

  let monthlyKeys = Object.keys(monthlyTimeSeries);

  let currentDate = new Date(monthlyKeys[0]);

  let fundStartDate = new Date(monthlyKeys[monthlyKeys.length - 1]);

  let fundDuration =
    (currentDate.getTime() - fundStartDate.getTime()) /
    (1000 * 60 * 60 * 24 * 365);

  let diff =
    monthlyTimeSeries[monthlyKeys[0]]["4. close"] /
    monthlyTimeSeries[monthlyKeys[monthlyKeys.length - 1]]["4. close"];

  let etfCagr = diff ** (1 / fundDuration) - 1;

  mainData[etf]["Meta Data"]["5. CAGR"] = etfCagr;

  console.log(mainData[etf]["Meta Data"]);
}

/*
const monthlyValues = mainData["ARKK"]["Monthly Adjusted Time Series"];

let monthKeys = Object.keys(monthlyValues);

let startDate = new Date(monthKeys[0]);
let endDate = new Date(monthKeys[monthKeys.length - 1]);

let years =
  (startDate.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24 * 365);

console.log("Fund Years", years);

const diffCuota =
  monthlyValues[monthKeys[0]]["4. close"] /
  monthlyValues[monthKeys[monthKeys.length - 1]]["4. close"];

console.log("Fund Diff: ", diffCuota);

let cagr = diffCuota ** (1 / years) - 1;
console.log("Cagr: ", cagr);

*/
