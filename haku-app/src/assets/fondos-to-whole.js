// Draft script that iterates over array of objects, and over the keys of those objects,
// and changes their values depending from decimals to whole numbers

const fs = require("fs");

const datos = JSON.parse(fs.readFileSync("fondos-mutuos-data.json", "utf8"));

// function iterates over a data arrray turns a specific value to a whole nmber
const toWholeNumbers = (data) => {
  for (var fund of datos) {
    for (var col in fund) {
      if (typeof fund[col] === "number") {
        if (fund[col] < 1 && fund[col] > -1) {
          fund[col] = fund[col] * 100;
        }
      }
    }
  }
  return data;
};

const updatedData = toWholeNumbers(datos);

fs.writeFileSync(
  "fondos-mutuos-data-whole.json",
  JSON.stringify(updatedData, null, 2),
  "utf8"
);
