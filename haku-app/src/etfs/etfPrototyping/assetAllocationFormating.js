const assetAllocationData = {
  domestic_equities: "0.952",
  foreign_equities: "0.045",
  bond: "0.0",
  cash: "0.0",
  other: "0.002",
};

let dataRecharts = [];

for (let key in assetAllocationData) {
  let rechartsFormat = {
    category: key,
    value: Number(assetAllocationData[key]),
  };
  dataRecharts.push(rechartsFormat);
}

console.log(dataRecharts);
