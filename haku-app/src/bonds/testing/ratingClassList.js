// List of credit rating types

import bondData from "../bonds_table.json" assert { type: "json" };

const allRatingsList = new Set(
  bondData.map((fund) => fund.risk_classification)
);

const uniqueSectoresList = [...allRatingsList];
console.log(uniqueSectoresList);
