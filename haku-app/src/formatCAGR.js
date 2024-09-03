// Simple funciton to format decimals as percentages

let cc_cagr = 0.053434;
let sura_cagr = 0.04588;

// implementation 1
const formatCAGR = (n) => {
  return (n * 100).toFixed(2);
};

// implementation 2
const formatCAGR2 = (n) => {
  let y = n * 100;
  y.toFixed;
  return y;
};

cc_cagr = formatCAGR(cc_cagr);
console.log(cc_cagr);

sura_cagr = formatCAGR(sura_cagr);
console.log(sura_cagr);
