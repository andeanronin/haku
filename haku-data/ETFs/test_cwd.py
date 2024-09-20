# test cwd

import os
import pandas as pd
print("Current working directory:", os.getcwd())   


# Read excel containing list of ETFs in the BVL
etfs_df = pd.read_excel("haku-data/ETFs/ETFs-BVL.xlsx", sheet_name=0, header=0)
etf_tickers = etfs_df[etfs_df["Tipo"] == "ETF"]["Nemónico"] # get likst of tickers
etf_names = etfs_df[etfs_df["Tipo"] == "ETF"]["Nombre"] # get list of names

# place name & ticker pairs in Dict 
etfs_titles = {}
for i in range(len(etf_tickers)):
    etfs_titles[etf_names[i]] = etf_tickers[i]

print(etfs_titles)