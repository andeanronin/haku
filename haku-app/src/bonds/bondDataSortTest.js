// test sorting bond data

const testArray = [8, 3, 98, 20];
testArray.sort((a, b) => a - b);
console.log(testArray);

const bondData = [
  {
    bond_key: 1,
    emisor: "Administradora Jockey Plaza Shopping Center S.A.",
    sector: "Diversas",
    valor: "Bonos Corporativos",
    fecha_colocacion: "2015-12-17T00:00:00.000",
    fecha_vencimiento: "2030-12-22T00:00:00.000",
    tasa_interes: 0.0709,
    monto_circulacion: 97359000.0,
    moneda: "US$",
    credit_rating_agency: "apoyo",
    risk_classification: "AA+",
  },
  {
    bond_key: 2,
    emisor: "Administradora Jockey Plaza Shopping Center S.A.",
    sector: "Diversas",
    valor: "Bonos Corporativos",
    fecha_colocacion: "2015-12-17T00:00:00.000",
    fecha_vencimiento: "2030-12-22T00:00:00.000",
    tasa_interes: 0.0916,
    monto_circulacion: 32000000.0,
    moneda: "S/",
    credit_rating_agency: "apoyo",
    risk_classification: "AA+",
  },
];

console.log(bondData);

bondData.sort((a, b) => {
  return b.tasa_interes - a.tasa_interes;
});

console.log(bondData);
