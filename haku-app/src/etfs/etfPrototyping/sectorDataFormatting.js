// Formating ETF sector data for Recharts

import data from "./sample-etf-profiles.json" assert { type: "json" };

const arkData = data["ARKK"];

const sectorData = arkData["sectors"];

//console.log(sectorData);

/*
Solution 1: writing converted data into new array
let sectorData2 = [];

for (let item in sectorData) {
  const newItem = {
    sector: sectorData[item]["sector"],
    weight: Number(sectorData[item]["weight"]),
  };
  sectorData2.push(newItem);
}

console.log(sectorData2);
*/

// Solution 2: changing the input array directly
const toNumbers = (array) => {
  for (let obj in array) {
    array[obj]["weight"] = Number(array[obj]["weight"]);
  }
  return array;
};
const sectorData3 = toNumbers(sectorData);
console.log("Version 1");
console.log(sectorData3);

/*
for (let item in sectorData) {
  sectorData[item]["weight"] = Number(sectorData[item]["weight"]);
}
console.log("Version 2");
console.log(sectorData);
*/

// Solution 3: apply changes into new array
console.log("");
const sectorData4 = sectorData.map((item) => {
  item["weight"] = Number(item["weight"]); // modify the values for "weight" directly
  return item;
});

console.log("Version 3");
console.log(sectorData4);

// Filter
console.log("");
const filteredData = sectorData4.filter((item) => item["weight"] > 0);
console.log("Filtered Data");
console.log(filteredData);
