import json

# Import monthly values file 
with open("./haku-data/ETFs/Prototypes2/ten-etf-monthly-values.json", "r") as file:
    monthly_values_json = json.load(file) 

risk_free_rate = 0.02

for etf in monthly_values_json:
    monthly_values_json[etf]["Meta Data"]["7. Sharpe Ratio"] = (monthly_values_json[etf]["Meta Data"]["5. CAGR"] - risk_free_rate) / monthly_values_json[etf]["Meta Data"]["6. Stdev of Returns"]


# Store data in JSON file
with open('ten-monthly-values-final.json', 'w') as json_file:
    json.dump(monthly_values_json, json_file, indent=4)