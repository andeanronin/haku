// Prop types for mutual fund components

export interface MutualFundData {
  "Tipo Fondo": string;
  "Fondo Mutuo": string;
  Administradora: string;
  "Fec. Inicio Operación": string;
  "Moneda Cuota": string;
  "Valor Cuota": number | null;
  "Rentabilidad 2024": number | null;
  "Rentabilidad 2023": number | null;
  "Rentabilidad 2022": number | null;
  "Rentabilidad 2021": number | null;
  "Rentabilidad 2020": number | null;
  "Rentabilidad 2019": number | null;
  "Rentabilidad 2018": number | null;
  "Rentabilidad 2017": number | null;
  "Rentabilidad 2016": number | null;
  "Rentabilidad 2015": number | null;
  "Rentabilidad 2014": number | null;
  "Patrimonio S/.": number | null;
  "Partícipes N": number | null;
  "A\u00f1os": number | null;
  Categoria: string;
  "Fund id": number;
  "Highest Return": number | null;
  "Lowest Return": number | null;
  "Avg Return (Arithmetic)": number | null;
  "Standard Deviation of Returns": number | null;
  "Total Cumulative Return": number | null;
  "Cumulative Return Period": number | null;
  "Annualized Cumulative Return": number | null;
  CAGR: number | null;
  "Sharpe Ratio": number | null;
  Risk: string | null;
  Logo: string;
  [key: string]: string | number | null; // Index signature for dynamic access
}

export interface FondoMutuoCardProps {
  path: string;
  fund: MutualFundData;
}
