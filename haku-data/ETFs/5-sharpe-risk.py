import json

# Import monthly values file 
with open("./haku-data/ETFs/etfs-monthly-values.json", "r") as file:
    monthly_values_json = json.load(file) 

risk_free_rate = 0.02

# Calculate & asign sharpe ratio for each category
for etf in monthly_values_json:
    stdev = monthly_values_json[etf]["Meta Data"]["6. Stdev of Returns"]
    cagr = monthly_values_json[etf]["Meta Data"]["5. CAGR"]

    # Only calculate Sharpe ratio if stdev is not None
    if stdev is not None:
        sharpe_ratio = (cagr - risk_free_rate) / stdev
    else:
        sharpe_ratio = None  # Handle cases where stdev is None

    monthly_values_json[etf]["Meta Data"]["7. Sharpe Ratio"] = sharpe_ratio

    # Determine & assign risk category for every fund
    if stdev is not None:
        if stdev > 0.20:
            risk = "High"
        elif stdev > 0.15:
            risk = "Medium High"
        elif stdev > 0.10:
            risk = "Medium"
        elif stdev > 0.05:
            risk = "Medium Low"
        else:
            risk = "Low"
            
        monthly_values_json[etf]["Meta Data"]["8. Risk"] = risk
    else:
        monthly_values_json[etf]["Meta Data"]["8. Risk"] = None


# Store data in JSON file
with open('etfs-monthly-values-final.json', 'w') as json_file:
    json.dump(monthly_values_json, json_file, indent=4)