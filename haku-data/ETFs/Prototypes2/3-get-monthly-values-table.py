# Monthly values table

# ETF Monthly Values --> Save as CSV 

import os
import pandas as pd
import requests
from dotenv import load_dotenv
from io import BytesIO  # Added import for BytesIO


# Load the .env file from the project root
load_dotenv()

# Get Alpha Vantage API key
alpha_vantage_key = os.getenv("ALPHA_VANTAGE_KEY")


# Read excel containing list of ETFs in the BVL
etfs_df = pd.read_excel("haku-data/ETFs/ETFs-BVL.xlsx", sheet_name=0, header=0)
etf_tickers = etfs_df[etfs_df["Tipo"] == "ETF"]["Nemónico"] # get list of tickers

etf_tickers_list = list(etf_tickers) # pandas series --> python list

etf_tickers_list_ten = etf_tickers_list[0:20]


# Empty dictionary were dataframes are added to
etf_data_dict = {}

for ticker in etf_tickers_list_ten:
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol={ticker}&apikey={alpha_vantage_key}&datatype=csv'
    r = requests.get(url)
    
    # store csv response in pandas df
    df = pd.read_csv(BytesIO(r.content))

    df["ticker"] = ticker

    # Store datraframe in dictionary
    etf_data_dict[ticker] = df

# Combine dataframes into 1 
combined_df = pd.concat(etf_data_dict.values())
combined_df.to_csv('ten-monthly-values.csv', index=False)