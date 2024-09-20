// etf data manipulation testing
import etfData from "./ishares-core-sp500.json" assert { type: "json" };

import etfMonthlyValues from "./sample-monthly-values.json" assert { type: "json" };

const etfNames = Object.keys(etfData);

const monthlyValuesKeys = Object.keys(etfMonthlyValues);

const monthlyValuesEntries = Object.entries(etfMonthlyValues);

console.log(etfNames);

console.log(monthlyValuesKeys);

console.log(monthlyValuesEntries);
