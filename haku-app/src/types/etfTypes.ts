// Data types for etf components

// Data Structure for individual profiles for Individual Etfs
export interface EtfProfile {
  net_assets: string;
  net_expense_ratio: string;
  portfolio_turnover: string;
  dividend_yield: string;
  inception_date: string;
  leveraged: string;
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

// Data strucutre for data containing all etf profiles
export interface EtfProfiles {
  [etfTicker: string]: EtfProfile;
}

export interface EtfMonthlyValues {
  "Meta Data": {
    "1. Information": string;
    "2. Symbol": string;
    "3. Last Refreshed": string;
    "4. Time Zone": string;
    "5. CAGR": number;
    "6. Stdev of Returns": number;
    "7. Sharpe Ratio": number;
    "8. Risk": string;
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

// Data structure for data containing all etf Monthly Values
export interface AllEtfMonthlyValues {
  [etfTicker: string]: EtfMonthlyValues;
}

// Types for components that need to import / receive as props both --> Etf Profiles & Etf Monthly Values

// Prop type of data of individual ETFs passed down to EtfPage component (EtfPage.tsx)
export interface EtfPageProps {
  etfData: EtfProfile;
  etfMonthlyValues: EtfMonthlyValues;
}

// Data structure for components receiving etf profiles & monthly values of all etf data (etfs.tsx)
export interface AllEtfData {
  etfProfiles: EtfProfiles;
  etfMonthlyValues: AllEtfMonthlyValues;
}

// Prop of EtfCard Component
export interface EtfCardProps {
  etfProfiles: EtfProfiles;
  etfMonthlyValues: AllEtfMonthlyValues;
  etfTicker: string;
  path: string;
}
