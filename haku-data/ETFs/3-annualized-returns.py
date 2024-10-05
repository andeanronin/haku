# Annualized returns table

import pandas as pd


# Import CSV with Monthly Values 
monthly_values_df = pd.read_csv("./haku-data/ETFs/monthly-values-table.csv")

# Initialize Empty Dataframe
yearly_returns_df = pd.DataFrame()

# Convert the 'timestamp' column to datetime
monthly_values_df['timestamp'] = pd.to_datetime(monthly_values_df['timestamp'])

# Set the 'timestamp' as the DataFrame index
monthly_values_df.set_index('timestamp', inplace=True)

# Group data by 'ticker' if you have multiple ETFs in the CSV
etf_groups = monthly_values_df.groupby('ticker')  # creates two dataframes: one for each ticker


# Iterate over each ETF group
for ticker, group in etf_groups:
    # Resample the data by year, selecting the first and last 'close' price for each year
    # returns a dataframe with: timestamp / first (price) / last (price) 
    annual_data = group.resample('Y').agg({
        'close': ['first', 'last']  # take the first and last closing prices for each year 
    })
    
    # Calculate annualized returns
    annual_data['annualized_return'] = (annual_data[('close', 'last')] / annual_data[('close', 'first')]) - 1
    annual_data['ticker'] = ticker

    # Normalize column names
    annual_data.columns = ['first', 'last', 'annualized_return', 'ticker']

    yearly_returns_df = pd.concat([yearly_returns_df, annual_data], ignore_index=False)


# Save yearly returns in csv 
yearly_returns_df.to_csv('etf-yearly-returns.csv', index=True)