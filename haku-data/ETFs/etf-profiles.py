# Alpha vantage request through Rapid Api

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
import time
print("Current working directory:", os.getcwd())   

# Load the .env file from the project root
load_dotenv()

# Get API key
#alpha_vantage_key = os.getenv("ALPHA_VANTAGE_KEY")

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

request_count = 0  # Initialize request count

tickers_no_data = []

# Iterate over etf_titles dictionary, make API call accessing each ticker, store ALL data in etf_data{}
for etf in etfs_titles:
    if request_count == 75:  # Check if 75 requests have been made
        print("Rate limit reached, sleeping for 60 seconds...")
        time.sleep(62)  # Sleep for 62 seconds
        request_count = 0  # Reset request count after sleep

    url = "https://alpha-vantage.p.rapidapi.com/query"
    querystring = {"function":"ETF_PROFILE",
                   "symbol": etfs_titles[etf],
                   "datatype":"json"}
    headers = {
	"x-rapidapi-key": rapid_api_key,
	"x-rapidapi-host": "alpha-vantage.p.rapidapi.com"
    }

    r = requests.get(url, headers = headers, params = querystring)
    data = r.json()

    # Skip the ETF if the response is empty (data == {})
    if not data:
        print(f"No data found for {etfs_titles[etf]}, skipping...")
        tickers_no_data.append(etf)  # store tickers with no data for future reference
        continue

    # Add 'name' key to etf dictionary (we need to add it manually because api response does not include it)
    data['name'] = etf

    etf_data[etfs_titles[etf]] = data   # example: {'ARKK': {etf profile} }

    request_count += 1  # Increment request count after each request


# Store data in JSON file
with open('etfs-profiles.json', 'w') as json_file:
    json.dump(etf_data, json_file, indent=4)
