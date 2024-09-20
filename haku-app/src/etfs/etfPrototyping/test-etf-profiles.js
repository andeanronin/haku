// navigating etf profiles json

import etfProfiles from "./sample-etf-profiles.json" assert { type: "json" };

const etfTickers = Object.keys(etfProfiles);

console.log(etfTickers);

const path = etfTickers.map((ticker) => {
  const path = `/etf/${ticker}`;
  return path;
});

console.log(path);

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
