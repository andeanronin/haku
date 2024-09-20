// maping over objects

const anObject = { hello: 4, "what not": 2 };

const assets = "503390";
console.log(typeof assets);
console.log(assets);
console.log(assets.length);

const formatLargeNumbers = (value) => {
  if (value.length >= 10) {
    const inBillions = value.slice(0, -9);
    return `${inBillions} Billion`;
  } else if (value.length >= 7) {
    const inMillions = value.slice(0, -6);
    return `${inMillions} Million`;
  } else {
    return value;
  }
};

console.log("");
console.log("Testing Function");
console.log(formatLargeNumbers(assets));
