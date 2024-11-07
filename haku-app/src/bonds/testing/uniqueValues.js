// array of unique values

import bondData from "../bonds_table.json" assert { type: "json" };

const sectoresList = bondData.map((fund) => fund.sector);

const sectoresSet = new Set(sectoresList);
console.log(sectoresSet);

const uniqueSectoresList = [...sectoresSet];
console.log(uniqueSectoresList);

console.log(uniqueSectoresList[1]);
console.log(sectoresSet[3]);
