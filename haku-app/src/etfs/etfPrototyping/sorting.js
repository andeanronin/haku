const anArray = [3, 2, 9, 12, 4];

// simple sort of an array
let sortedArray = anArray.sort();
console.log("Simple Sort: ", sortedArray);

// sort array with .sort method + subtraction
let sortedArray2 = anArray.sort((a, b) => a - b);
console.log("Sorted with Subtraction: ", sortedArray2);

/*
In the end I need an array of sorted tickers  -> const sortedTickers = []
*/

const mutualFundData = [
  { Fund: "Credicorp Equity", CAGR: 0.2 },
  { Fund: "BBVA Milenials", CAGR: 0.15 },
  { Fund: "Scotial USA", CAGR: 0.03 },
];

const sortedMutualFunds = mutualFundData.sort((a, b) => a.CAGR - b.CAGR);
console.log(sortedMutualFunds);

const etfData = {
  ARKK: {
    "Meta Data": {
      "1. Information": "Monthly Adjusted Prices and Volumes",
      "2. Symbol": "ARKK",
      "3. Last Refreshed": "2024-10-01",
      "4. Time Zone": "US/Eastern",
      "5. CAGR": 0.08552752280606724,
      "6. Stdev of Returns": 0.5253493807158922,
      "7. Sharpe Ratio": 0.12473132207136715,
      "8. Risk": "High",
    },
  },
  AZTD: {
    "Meta Data": {
      "1. Information": "Monthly Adjusted Prices and Volumes",
      "2. Symbol": "AZTD",
      "3. Last Refreshed": "2024-10-01",
      "4. Time Zone": "US/Eastern",
      "5. CAGR": 0.16196145810286278,
      "6. Stdev of Returns": 0.05315764356696314,
      "7. Sharpe Ratio": 2.6705747015296626,
      "8. Risk": "Medium Low",
    },
  },
  XLY: {
    "Meta Data": {
      "1. Information": "Monthly Adjusted Prices and Volumes",
      "2. Symbol": "XLY",
      "3. Last Refreshed": "2024-10-01",
      "4. Time Zone": "US/Eastern",
      "5. CAGR": 0.07804641253009215,
      "6. Stdev of Returns": 0.20983524059434455,
      "7. Sharpe Ratio": 0.2766285222905337,
      "8. Risk": "High",
    },
  },
};
