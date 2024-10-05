# This script gests the monthly values of ALL the ETFs in the BVL from the Alpha Vantage API
# Outputs a JSON file containing "ETF Ticker" : {data}

"""
Example Output: 
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
print("Current working directory:", os.getcwd())   

# Load the .env file from the project root
load_dotenv()

# Get API key
alpha_vantage_key = os.getenv("ALPHA_VANTAGE_KEY")

rapid_api_key = os.getenv("RAPID_API_ALPHA_VANTAGE")


# Read excel containing list of ETFs in the BVL
etfs_df = pd.read_excel("haku-data/ETFs/ETFs-BVL.xlsx", sheet_name=0, header=0)
etf_tickers = etfs_df[etfs_df["Tipo"] == "ETF"]["Nemónico"] # get likst of tickers

# Where ALL etf data awill be stored 
etf_data = {}

# Iterate over etf_titles dictionary, make API call accessing each ticker, store ALL data in etf_data{}
for etf in etf_tickers:
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol={etf}&apikey={rapid_api_key}'
    r = requests.get(url)
    data = r.json()

    etf_data[etf] = data   # example: {'ARKK': {monthly values} }

# Store data in JSON file
with open('etfs-monthly-values.json', 'w') as json_file:
    json.dump(etf_data, json_file, indent=4)