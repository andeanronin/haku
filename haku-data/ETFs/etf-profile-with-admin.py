# etf profiles with fund administrator


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

print(etfs_titles)