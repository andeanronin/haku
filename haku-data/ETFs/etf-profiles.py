# Etf Profiles

# This script gests the etf profiles  of ALL the ETFs in the BVL from the Alpha Vantage API
# Outputs a JSON file containing "ETF Ticker" : {etf profile}

"""
Example Output: 
{
    "ARKK : {etf profile },
    "iShares500" : {etf profile}
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
etf_names = etfs_df[etfs_df["Tipo"] == "ETF"]["Nombre"] # get list of names

# Place name & ticker pairs in Dict 
etfs_titles = {}
for i in range(len(etf_tickers)):
    etfs_titles[etf_names[i]] = etf_tickers[i]


# Where ALL etf data awill be stored 
etf_data = {}

# Iterate over etf_titles dictionary, make API call accessing each ticker, store ALL data in etf_data{}
for etf in etfs_titles:
    url = f'https://www.alphavantage.co/query?function=ETF_PROFILE&symbol={etfs_titles[etf]}&apikey={rapid_api_key}'
    r = requests.get(url)
    data = r.json()

    etf_data[etfs_titles[etf]] = data   # example: {'ARKK': {etf profile} }

# Store data in JSON file
with open('etfs-profiles.json', 'w') as json_file:
    json.dump(etf_data, json_file, indent=4)
