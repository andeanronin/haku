import os
import pandas as pd
import requests
import json 
from dotenv import load_dotenv

# Load the .env file from the project root
load_dotenv()

# Get API key
alpha_vantage_key = os.getenv("ALPHA_VANTAGE_KEY")

rapid_api_key = os.getenv("RAPID_API_ALPHA_VANTAGE")

# Read excel containing list of ETFs in the BVL
etfs_df = pd.read_excel("haku-data/ETFs/ETFs-BVL.xlsx", sheet_name=0, header=0)

etf_tickers = etfs_df[etfs_df["Tipo"] == "ETF"]["Nemónico"] # get list of tickers
etf_tickers_list = list(etf_tickers) # pandas series --> python list
etf_tickers_ten = etf_tickers_list[0:20]

etf_names = etfs_df[etfs_df["Tipo"] == "ETF"]["Nombre"] # get list of names
etf_names_list = list(etf_names)
etf_names_ten = etf_names_list[0:20]

# Place name & ticker pairs in Dict 
etfs_titles = {}
for i in range(len(etf_tickers_ten)):
    etfs_titles[etf_names_ten[i]] = etf_tickers_ten[i]


# Where ALL etf data will be stored 
etf_data = {}

# Iterate over etf_titles dictionary, make API call accessing each ticker, store ALL data in etf_data{}
for etf in etfs_titles:
    url = f'https://www.alphavantage.co/query?function=ETF_PROFILE&symbol={etfs_titles[etf]}&apikey={rapid_api_key}'
    r = requests.get(url)
    data = r.json()

    # Add 'name' key to etf dictionary (we need to add it manually because api response does not include it)
    data['name'] = etf

    etf_data[etfs_titles[etf]] = data   # example: {'ARKK': {etf profile} }

# Store data in JSON file
with open('twenty-etf-profiles.json', 'w') as json_file:
    json.dump(etf_data, json_file, indent=4)