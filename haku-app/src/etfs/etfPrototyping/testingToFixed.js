// testing toFixed function

let numberAsString = "0.07";
let nullAsString = "n/a";

let asNumber = Number(numberAsString);
let nullAsNumber = Number(nullAsString);

console.log(asNumber);
console.log(
  "Type of Number in String Format Converted to Number: ",
  typeof asNumber
);
console.log("Number as String: ", typeof numberAsString);

console.log(nullAsNumber);
console.log("Type of 'n/a' As Number:", typeof nullAsNumber);
