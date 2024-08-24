const firstFundReturns = {
  "Tipo Fondo": "Renta Variable",
  "Fondo Mutuo": "CREDICORP ACCIONES GLOBAL",
  Administradora: "CREDIFONDO SAF",
  "Fec. Inicio Operaci\u00f3n": "25/03/2013",
  "Moneda Cuota": "$",
  "Valor Cuota": 180.92,
  "Rentabilidad 2024": 0.0967,
  "Rentabilidad 2023": 0.1656,
  "Rentabilidad 2022": -0.2041,
  "Rentabilidad 2021": 0.1397,
  "Rentabilidad 2020": 0.1303,
  "Rentabilidad 2019": 0.2313,
  "Rentabilidad 2018": -0.1154,
  "Rentabilidad 2017": 0.2009,
  "Rentabilidad 2016": 0.0315,
  "Rentabilidad 2015": -0.0556,
  "Rentabilidad 2014": -0.0042,
  "Patrimonio S/.": 23652842.51,
  "Part\u00edcipes N": 894.0,
  "A\u00f1os": 11,
  Categoria: "Renta Variable",
  "Fund id": 1,
  "Highest Return": 0.2313,
  "Lowest Return": -0.2041,
  "Avg Return (Arithmetic)": 0.058733333333333325,
  "Standard Deviation of Returns": 0.13201518698982928,
  "Total Cumulative Return": 0.6630111260617884,
  "Cumulative Return Period": 10.5,
  "Annualized Cumulative Return": 0.06314391676778937,
  CAGR: 0.049633380696051166,
  "Sharpe Ratio": 0.22446948242654977,
  Risk: "Medium",
};

const secondFundReturns = {
  "Tipo Fondo": "Renta Variable",
  "Fondo Mutuo": "-Faro Global Innovation Instit. SERIE C",
  Administradora: "FARO CAPITAL SAFI",
  "Fec. Inicio Operaci\u00f3n": "27/01/2020",
  "Moneda Cuota": "$",
  "Valor Cuota": 125.42,
  "Rentabilidad 2024": 0.0658,
  "Rentabilidad 2023": 0.2256,
  "Rentabilidad 2022": -0.3059,
  "Rentabilidad 2021": -0.0271,
  "Rentabilidad 2020": 0.4255,
  "Rentabilidad 2019": null,
  "Rentabilidad 2018": null,
  "Rentabilidad 2017": null,
  "Rentabilidad 2016": null,
  "Rentabilidad 2015": null,
  "Rentabilidad 2014": null,
  "Patrimonio S/.": null,
  "Part\u00edcipes N": 25.0,
  "A\u00f1os": 4,
  Categoria: "Renta Variable",
  "Fund id": 6,
  "Highest Return": 0.4255,
  "Lowest Return": -0.3059,
  "Avg Return (Arithmetic)": 0.0853111111111111,
  "Standard Deviation of Returns": 0.24554939514645546,
  "Total Cumulative Return": 0.25742455682314414,
  "Cumulative Return Period": 4.5,
  "Annualized Cumulative Return": 0.05720545707180981,
  CAGR: 0.05222132017354619,
  "Sharpe Ratio": 0.13122133798915736,
  Risk: "High",
};

// 1. Function Returns Array of compounded returns
const getCompoundReturnsArray = (fund, initialInvestment) => {
  const keys = Object.keys(fund);

  const rentaBilidadKeys = keys
    .filter((key) => key.startsWith("Rentabilidad"))
    .sort();

  let accumulatedValue = initialInvestment;
  const compoundReturns = [];

  rentaBilidadKeys.forEach((key) => {
    if (fund[key] !== null) {
      accumulatedValue *= 1 + fund[key];
      compoundReturns.push(accumulatedValue);
    }
  });

  return compoundReturns;
};

const compoundReturnsArray = getCompoundReturnsArray(firstFundReturns, 100);

console.log(compoundReturnsArray);

//

// 2. Function Returns Object of compounded returns
const getCompoundReturns = (fund, initialInvestment) => {
  const keys = Object.keys(fund);

  const rentaBilidadKeys = keys
    .filter((key) => key.startsWith("Rentabilidad"))
    .sort();

  let accumulatedValue = initialInvestment;
  const compoundReturns = {};

  rentaBilidadKeys.forEach((key) => {
    if (fund[key] !== null) {
      accumulatedValue *= 1 + fund[key];

      compoundReturns[`${key}`] = accumulatedValue;
    } else {
      compoundReturns[`${key}`] = null;
    }
  });

  return compoundReturns;
};

const compoundReturnsWithYears = getCompoundReturns(firstFundReturns, 100);
console.log(`1. Compounded Returns:`);
console.log(compoundReturnsWithYears);

// 2.2 Compound Returns Version 2: including investment year
const getCompoundReturns2 = (fund, initialInvestment) => {
  const keys = Object.keys(fund);

  const rentaBilidadKeys = keys
    .filter((key) => key.startsWith("Rentabilidad"))
    .sort();

  let accumulatedValue = initialInvestment;
  const compoundReturns = {};

  let initialInvestmentAdded = false;
  let firstNonNullYear = null;

  // Find first key with a return value and get the Year as number
  for (const key of rentaBilidadKeys) {
    if (fund[key] !== null) {
      firstNonNullYear = parseInt(key.split(" ")[1]);
      break;
    }
  }

  // Get values of compound return
  if (firstNonNullYear) {
    rentaBilidadKeys.forEach((key) => {
      const year = parseInt(key.split(" ")[1]);

      if (year === firstNonNullYear - 1) {
        compoundReturns[key] = initialInvestment;
        initialInvestmentAdded = true;
      } else if (fund[key] !== null) {
        accumulatedValue *= 1 + fund[key];
        compoundReturns[key] = accumulatedValue;
      }
      // We no longer add null values to compoundReturns
    });
  }

  return compoundReturns;
};

const compoundedReturnsWithYears2 = getCompoundReturns2(firstFundReturns, 100);
console.log("1.2 Compound Returns + Initial Investment");
console.log(compoundedReturnsWithYears2);

// 2.3 Compound Returns V 3: cases were there is no null
const getCompoundReturns3 = (fund, initialInvestment) => {
  const keys = Object.keys(fund);
  const rentabilidadKeys = keys
    .filter((key) => key.startsWith("Rentabilidad"))
    .sort();

  let accumulatedValue = initialInvestment;
  const compoundReturns = {};

  // Find the first non-null rentabilidad year
  const firstNonNullYear = rentabilidadKeys.find((key) => fund[key] !== null);

  if (firstNonNullYear) {
    const firstYear = parseInt(firstNonNullYear.split(" ")[1]);
    const initialInvestmentYear = `Rentabilidad ${firstYear - 1}`;
    compoundReturns[initialInvestmentYear] = initialInvestment;

    rentabilidadKeys.forEach((key) => {
      const year = parseInt(key.split(" ")[1]);
      if (year >= firstYear && fund[key] !== null) {
        accumulatedValue *= 1 + fund[key];
        compoundReturns[key] = accumulatedValue;
      }
    });
  }

  return compoundReturns;
};

const compoundedReturnsWithYears3 = getCompoundReturns3(firstFundReturns, 100);
console.log("1.3 Compound Returns + Initial Investment");
console.log(compoundedReturnsWithYears3);

const secondFundCompoundReturns = getCompoundReturns3(secondFundReturns, 100);
console.log("1.3.2 Compound Returns + Initial Investment Fund 2");
console.log(secondFundCompoundReturns);

// 3. Data Wranglig for Recharts
console.log("");
const cleaningForRecharts = (fund) => {
  const years = [
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
  ];

  return years.map((y) => ({
    year: y,
    Valor: fund[`Rentabilidad ${y}`],
  }));
};

console.log("2. Compound Returns Formatted For Recharts");
console.log(cleaningForRecharts(compoundReturnsWithYears));

const compoundedReturnsChartData = cleaningForRecharts(
  compoundReturnsWithYears
);

// Formatting data for Recharts 2
const cleaningForRecharts2 = (fund) => {
  let years = [];

  const keys = Object.keys(fund);

  const rentaBilidadKeys = keys
    .filter((key) => key.startsWith("Rentabilidad"))
    .sort();

  for (const key of rentaBilidadKeys) {
    if (fund[key] !== null) {
      let year = key.split(" ")[1];
      years.push(year);
    }
  }

  return years.map((y) => ({
    year: y,
    Valor: fund[`Rentabilidad ${y}`],
  }));
};

console.log("2.2 Compound Returns Formatted For Recharts V2");
console.log(cleaningForRecharts2(compoundReturnsWithYears));

const compoundedReturnsChartData2 = cleaningForRecharts(
  compoundReturnsWithYears
);

// 4. Getting Max Value from Return Data in Recharts Structure
console.log("");
console.log("Getting values for Y-axis");
const maxValue = Math.max(
  ...compoundedReturnsChartData2.map((item) => item.Valor)
);

// Max compound return value
console.log(`Max Value: ${maxValue}`);

// Getting max value for Y-axis (conditions: unit of 20, at least 20 more than maxValue. Example: if max = 166, then yAxisMax = 200, if max = 155 then yAxisMax = 180)
console.log(maxValue / 20);

console.log(Math.ceil(maxValue / 20));

const yAxisMax = Math.ceil(maxValue / 20) * 20;
console.log(`Max value for Y-axis: ${yAxisMax}`);

// 5. Line Graph tickers depending on the max value in Y-Axis

const lineGraphTickers = (maxValue) => {
  const tickers = [];
  let start = 0;
  for (let i = 0; i < maxValue / 20; i++) {
    start += 20;
    tickers.push(start);
  }
  return tickers;
};

const graphATickers = lineGraphTickers(yAxisMax);
console.log("Y Axis Ticks:");
console.log(graphATickers);
