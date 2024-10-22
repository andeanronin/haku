"""
This script gets the monthly values of ALL the ETFs in the BVL from the Alpha Vantage API
Outputs a JSON file containing "ETF Ticker" : {data}

Input: ETFs-BVL.xsls (excel with the list of ETFs in the BVL)

Output: etfs-monthly-values.json
{
    "ARKK : {monthly values},
    "iShares500" : {monthly values}
}
"""

import os
import pandas as pd
import requests
import json 
from dotenv import load_dotenv
import time
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

    # Insert pause for rate limits
    if request_count == 75:  # Check if 75 requests have been made
        print("Rate limit reached, sleeping for 60 seconds...")
        time.sleep(62)  # Sleep for 62 seconds
        request_count = 0  # Reset request count after sleep

    # Request settings
    url = "https://alpha-vantage.p.rapidapi.com/query"
    querystring = {"function":"TIME_SERIES_MONTHLY_ADJUSTED",
                   "symbol": etf,
                   "datatype":"json"}
    headers = {
	"x-rapidapi-key": rapid_api_key,
	"x-rapidapi-host": "alpha-vantage.p.rapidapi.com"
    }

    r = requests.get(url, headers = headers, params = querystring)
    data = r.json()

    # Skip the ETF if the response is empty (data == {})
    if not data or 'Error Message' in data:
        print(f"No data found for {etf}, skipping...")
        continue

    etf_data[etf] = data   # example: {'ARKK': {monthly values} }

    request_count += 1

# Store data in JSON file
with open('etfs-monthly-values.json', 'w') as json_file:
    json.dump(etf_data, json_file, indent=4)
