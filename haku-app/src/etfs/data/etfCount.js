// etf final count

import etfData from "./etfs-monthly-values-final.json" assert { type: "json" };

const keys = Object.keys(etfData);

const numberOfEtfs = keys.length;
console.log(numberOfEtfs);
console.log(keys);
