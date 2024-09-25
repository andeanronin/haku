# Alpha Vantage ETF PROFILE request --> Ishares S&P 500 ETF 
import os
from dotenv import load_dotenv
import requests
import json
import pandas as pd

# Print CWD 
print("Current working directory:", os.getcwd())   # note: this script runs from the ROOT/PARENT Users/marianocorrea/haku folder 

# 1. Load the .env file from the project root
load_dotenv()

# 2. Get Alpha Vantage API key
alpha_vantage_key = os.getenv("ALPHA_VANTAGE_KEY")

print("Alpha Vantage key is: ", alpha_vantage_key)   # HIDE THIS WHEN PUBLISHING REPO 

# 3. ETF Profile & Holdings REQUEST for IShares S&P 500 ETF - Ticker: IVV 
url = 'https://www.alphavantage.co/query?function=ETF_PROFILE&symbol=IVV&apikey=alpha_vantage_key'
r = requests.get(url)
data = r.json()

# 4. Store data in JSON file
with open('ishares-core-sp500.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)


