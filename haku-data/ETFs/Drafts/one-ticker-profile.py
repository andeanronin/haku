# one ticker profile request using alpha vantage through rapid api

import os
import pandas as pd
import requests
import json 
from dotenv import load_dotenv

# Load the .env file from the project root
load_dotenv()

rapid_api_key = os.getenv("RAPID_API_ALPHA_VANTAGE")

url = "https://alpha-vantage.p.rapidapi.com/query"
querystring = {"function":"TIME_SERIES_MONTHLY_ADJUSTED",
                   "symbol": "PAVE",
                   "datatype":"json"}
headers = {
	"x-rapidapi-key": rapid_api_key,
	"x-rapidapi-host": "alpha-vantage.p.rapidapi.com"
    }

r = requests.get(url, headers = headers, params = querystring)
data = r.json()

print(data)