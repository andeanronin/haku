// etf types for etf components

export interface EtfProfiles {
  net_assets: string;
  net_expense_ratio: string;
  portfolio_turnover: string;
  dividend_yield: string;
  inception_date: string;
  leveraged: "YES" | "NO";
  asset_allocation: {
    domestic_equities: string;
    foreign_equities: string;
    bond: string;
    cash: string;
    other: string;
  };
  sectors?: Array<{
    sector: string;
    weight: string;
  }>;
  holdings?: Array<{
    symbol: string;
    description: string;
    weight: string;
  }>;
  name: string;
}

export interface EtfPriceData {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Time Zone": string;
    "5. CAGR": number;
    "6. Stdev of Returns": number;
    "7. Sharpe Ratio": number;
  };
  "Monthly Adjusted Time Series": {
    [date: string]: {
      "1. open": string;
      "2. high": string;
      "3. low": string;
      "4. close": string;
      "5. adjusted close": string;
      "6. volume": string;
      "7. dividend amount": string;
    };
  };
}

export interface EtfPageProps {
  etfData: EtfProfiles;
  etfMonthlyValues: EtfPriceData;
}
