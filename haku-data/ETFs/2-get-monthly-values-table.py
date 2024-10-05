# Get table with monthly values of all etfs
import os
import pandas as pd
import requests
import json 
from dotenv import load_dotenv
import time
from io import BytesIO  # Added import for BytesIO
print("Current working directory:", os.getcwd())   

# Load the .env file from the project root
load_dotenv()

# Get API key
rapid_api_key = os.getenv("RAPID_API_ALPHA_VANTAGE")

# Read excel containing list of ETFs in the BVL
etfs_df = pd.read_excel("haku-data/ETFs/ETFs-BVL.xlsx", sheet_name=0, header=0)
etf_tickers = etfs_df[etfs_df["Tipo"] == "ETF"]["Nemónico"] # get list of tickers

# Where ALL etf data awill be stored 
etf_data = {}

request_count = 0  # Initialize request count

# Iterate over etf_titles dictionary, make API call accessing each ticker, store ALL data in etf_data{}
for etf in etf_tickers:

    # Pause for rate limits
    if request_count == 75:  # Check if 75 requests have been made
        print("Rate limit reached, sleeping for 60 seconds...")
        time.sleep(62)  # Sleep for 62 seconds
        request_count = 0  # Reset request count after sleep

    # Request settings
    url = "https://alpha-vantage.p.rapidapi.com/query"
    querystring = {"function":"TIME_SERIES_MONTHLY_ADJUSTED",
                   "symbol": etf,
                   "datatype":"csv"}
    headers = {
	"x-rapidapi-key": rapid_api_key,
	"x-rapidapi-host": "alpha-vantage.p.rapidapi.com"
    }

    r = requests.get(url, headers = headers, params = querystring)
    df = pd.read_csv(BytesIO(r.content))

    # Skip the ETF if the response is empty (data == {})
    if df.empty or "Error Message" in df.iloc[0, 0]: 
        print(f"No data found for {etf}, skipping...")
        continue

    df["ticker"] = etf

    etf_data[etf] = df

    request_count += 1

# Combine dataframes into 1 
combined_df = pd.concat(etf_data.values())
combined_df.to_csv('etf-monthly-values-table.csv', index=False)