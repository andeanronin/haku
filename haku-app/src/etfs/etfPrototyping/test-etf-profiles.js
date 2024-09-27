// navigating etf profiles json

import etfProfiles from "./ten-etf-profiles.json" assert { type: "json" };

const etfTickers = Object.keys(etfProfiles);

console.log(etfTickers);

/*
const path = etfTickers.map((ticker) => {
  const path = `/etf/${ticker}`;
  return path;
});*/

for (ticker in etfTickers) console.log(path);

const etfData = etfTickers.map((ticker) => {
  const data = etfProfiles[ticker];
  return data;
});

/* 
for (let ticker in etfProfiles) {
  const path = `/etf/${ticker}`;
  console.log(path);
}
*/
