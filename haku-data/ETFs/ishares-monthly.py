# Alpha Vantage Monthly Time Series --> Ishares S&P 500 

import os
import pandas as pd
import requests
import json 
from dotenv import load_dotenv

# Load the .env file from the project root
load_dotenv()

# Get Alpha Vantage API key
alpha_vantage_key = os.getenv("ALPHA_VANTAGE_KEY")

# Time Series Monthly Request for IShares S&P 500 ETF - Ticker: IVV 
url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=IVV&apikey=alpha_vantage_key'
r = requests.get(url)
data = r.json()  # convert request object to json format 

# Store data in JSON file
with open('ishares-core-sp500-monthly-adjusted-values.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)


