import json

# Import monthly values file 
with open("./ten-monthly-values-final-copy.json", "r") as file:
    monthly_values_json = json.load(file) 


# Calculate & asign sharpe ratio for each category
for etf in monthly_values_json:

    # Determine & asign risk category for every fund
    if monthly_values_json[etf]["Meta Data"]["6. Stdev of Returns"] is not None:
        if monthly_values_json[etf]["Meta Data"]["6. Stdev of Returns"] > 0.20:
            risk = "Alto"
        elif monthly_values_json[etf]["Meta Data"]["6. Stdev of Returns"] > 0.15:
            risk = "Mediano Alto"
        elif monthly_values_json[etf]["Meta Data"]["6. Stdev of Returns"] > 0.10:
            risk = "Mediano"
        elif monthly_values_json[etf]["Meta Data"]["6. Stdev of Returns"] > 0.05:
            risk = "Mediano Bajo"
        else:
            risk = "Bajo"
            
        monthly_values_json[etf]["Meta Data"]["8. Risk"] = risk
    else:
        monthly_values_json[etf]["Meta Data"]["8. Risk"] = None


# Store data in JSON file
with open('ten-monthly-values-final.json', 'w') as json_file:
    json.dump(monthly_values_json, json_file, indent=4)