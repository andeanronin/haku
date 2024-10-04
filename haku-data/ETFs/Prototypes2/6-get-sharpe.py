import json

# Import monthly values file 
with open("./haku-data/ETFs/Prototypes2/twenty-etf-monthly-values.json", "r") as file:
    monthly_values_json = json.load(file) 

risk_free_rate = 0.02

# Calculate & asign sharpe ratio for each category
for etf in monthly_values_json:
    monthly_values_json[etf]["Meta Data"]["7. Sharpe Ratio"] = (monthly_values_json[etf]["Meta Data"]["5. CAGR"] - risk_free_rate) / monthly_values_json[etf]["Meta Data"]["6. Stdev of Returns"]

    # Determine & asign risk category for every fund
    if monthly_values_json[etf]["Meta Data"]["6. Stdev of Returns"] is not None:
        if monthly_values_json[etf]["Meta Data"]["6. Stdev of Returns"] > 0.20:
            risk = "High"
        elif monthly_values_json[etf]["Meta Data"]["6. Stdev of Returns"] > 0.15:
            risk = "Medium High"
        elif monthly_values_json[etf]["Meta Data"]["6. Stdev of Returns"] > 0.10:
            risk = "Medium"
        elif monthly_values_json[etf]["Meta Data"]["6. Stdev of Returns"] > 0.05:
            risk = "Medium Low"
        else:
            risk = "Low"
            
        monthly_values_json[etf]["Meta Data"]["8. Risk"] = risk
    else:
        monthly_values_json[etf]["Meta Data"]["8. Risk"] = None


# Store data in JSON file
with open('twenty-monthly-values-final.json', 'w') as json_file:
    json.dump(monthly_values_json, json_file, indent=4)