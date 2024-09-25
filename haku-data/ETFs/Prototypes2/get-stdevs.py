# Get the fund's standard deviation of returns

import pandas as pd
import json


# Import yearly returns csv table 
yearly_returns_table = pd.read_csv("./haku-data/ETFs/Prototypes2/ten-yearly-returns.csv")

# 1. Calculate each fund's Standard Deviation of annual returns 
stdev_table = yearly_returns_table.groupby('ticker')["annualized_return"].std()

print(stdev_table)

# 1.2 Export table with Standard Deviations to csv 
stdev_table.to_csv("ten-standard-deviations.csv", index=True)


# 2. Import monthly values file 
with open("./haku-data/ETfs/Prototypes2/ten-etf-monthly-values.json", "r") as file:
    monthly_values_json = json.load(file) 

# 2.2 Store Standard Devs in Monthly Values File 
for ticker in stdev_table.index:
    monthly_values_json[ticker]["Meta Data"]["6. Stdev of Returns"] = stdev_table[ticker]

print(monthly_values_json['ARKK']["Meta Data"])

# 2.3 Update monthly values file with STDev data
with open('ten-etf-monthly-values.json', 'w') as json_file:
    json.dump(monthly_values_json, json_file, indent=4)