# error handling monthly values in csv format

# Get table with monthly values of all etfs
import os
import pandas as pd
import requests
import json 
from dotenv import load_dotenv
import time
from io import BytesIO  # Added import for BytesIO
print("Current working directory:", os.getcwd())   

# Load the .env file from the project root
load_dotenv()

# Get API key
rapid_api_key = os.getenv("RAPID_API_ALPHA_VANTAGE")


# Request settings
url = "https://alpha-vantage.p.rapidapi.com/query"
querystring = {"function":"TIME_SERIES_MONTHLY_ADJUSTED",
                   "symbol": "DTLA",
                   "datatype":"csv"}

headers = {
	"x-rapidapi-key": rapid_api_key,
	"x-rapidapi-host": "alpha-vantage.p.rapidapi.com"
    }

r = requests.get(url, headers = headers, params = querystring)
print(r)
df = pd.read_csv(BytesIO(r.content))
print(df)

"""
# Skip the ETF if the response is empty (data == {})
if not data or 'Error Message' in data:
        print(f"No data found for {etf}, skipping...")
        continue

"""