import pandas as pd
import json
from datetime import datetime
import os
print("Current working directory:", os.getcwd())   



with open("./haku-data/ETFs/Prototypes2/ten-etf-monthly-values.json", "r") as file:
    data = json.load(file) 


for etf in data:
    monthly_values = data[etf]["Monthly Adjusted Time Series"]
    
    monthly_values_keys = list(monthly_values.keys())

    current_date = datetime.strptime(monthly_values_keys[0],  "%Y-%m-%d").date()
    start_date = datetime.strptime(monthly_values_keys[-1],  "%Y-%m-%d").date()
    
    duration = (current_date - start_date) # duration is a datetime object 

    fund_years = duration.days / 365.25
    
    current_etf_price = float(monthly_values[monthly_values_keys[0]]["4. close"])

    start_etf_price = float(monthly_values[monthly_values_keys[-1]]["4. close"])

    cagr = ((current_etf_price / start_etf_price)**(1/fund_years)) - 1

    data[etf]["Meta Data"]["5. CAGR"] = cagr

    print(f"{etf} CAGR: ", cagr)

print(data['ARKK']["Meta Data"])

# Store data in JSON file
with open('ten-etf-monthly-values.json', 'w') as json_file:
    json.dump(data, json_file, indent=4)

