// etf prototyping
import etfProfiles from "./ten-etf-profiles.json";
import etfMonthlyValues from "./ten-monthly-values-final.json";

const sampleObject = { arkk: 10, dev: 23 };

for (let etf in etfProfiles) {
  console.log(etfProfiles[etf]);
}
