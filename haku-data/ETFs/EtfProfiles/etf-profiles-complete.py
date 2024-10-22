# Alpha vantage request through Rapid Api

"""
Calls ETF Profiles from Alpha Vantage and adds additional ETF data (name, isin, ticker, manager, logo)

Input: etfs-peru-list.csv (list of ETFs in BVL containing: Name, ISIN, Ticker, Fund Manager, Logo)

Output: etfs-profiles.json 
{
    "ETF TICKER" : {etf profile}
    "ARKK" : {
        "net_assets": "5665000000",
        "net_expense_ratio": "0.0075",
        "portfolio_turnover": "0.26",
        "dividend_yield": "0.0",
        "inception_date": "2014-10-31",
        "leveraged": "NO",
        "asset allocation" : {}, 
        "sectors" : [{}, {}], 
        "holdings" : [{}, {}]},
        "name": "ARK INNOVATION ETF",
        "gestor": "Ark",
        "ISIN": "US00214Q1040",
        "logo": "logoArk.png"
        },
    "iShares500 : {etf profile }
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
etfs_df = pd.read_csv("haku-data/ETFs/etfs-peru-list.csv")
print(etfs_df.head()) 

etf_tickers = etfs_df["Nemonico"] # get list of tickers
etf_names = etfs_df["Nombre"] # get list of names
etf_gestores = etfs_df["Gestor"]
etf_isin = etfs_df["ISIN"]
etf_logo = etfs_df["Logo"]


# Place name & ticker pairs in Dict 
etfs_titles = {}
for i in range(len(etf_tickers)):
    etfs_titles[etf_names[i]] = [etf_tickers[i], etf_gestores[i], etf_isin[i], etf_logo[i]]


# Where ALL etf data awill be stored 
etf_data = {}

request_count = 0  # Initialize request count

tickers_no_data = []

# Iterate over etf_titles dictionary, make API call accessing each ticker, store ALL data in etf_data{}
for etf in etfs_titles:
    if request_count == 70:  # Check if 75 requests have been made
        print("Rate limit reached, sleeping for 65 seconds...")
        time.sleep(75)  # Sleep for 62 seconds
        request_count = 0  # Reset request count after sleep

    url = "https://alpha-vantage.p.rapidapi.com/query"
    querystring = {"function":"ETF_PROFILE",
                   "symbol": etfs_titles[etf][0],
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
    data['gestor'] = etfs_titles[etf][1]
    data['ISIN'] = etfs_titles[etf][2]
    data['logo'] = etfs_titles[etf][3]

    etf_data[etfs_titles[etf][0]] = data   # example: {'ARKK': {etf profile} }

    request_count += 1  # Increment request count after each request


# Store data in JSON file
with open('etfs-profiles.json', 'w') as json_file:
    json.dump(etf_data, json_file, indent=4)