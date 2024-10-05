# Get the Standard Deviations of Returns of all Etf funds

import pandas as pd
import json
import math


# Import yearly returns csv table 
yearly_returns_table = pd.read_csv("./haku-data/ETFs/etf-yearly-returns.csv")

# 1. Calculate each fund's Standard Deviation of annual returns 
stdev_table = yearly_returns_table.groupby('ticker')["annualized_return"].std()

print(stdev_table["PAVE"])
print(stdev_table)

# 1.2 Export table with Standard Deviations to csv 
stdev_table.to_csv("etf-standard-deviations.csv", index=True)

# 2. Import monthly values file 
with open("./haku-data/ETfs/etfs-monthly-values.json", "r") as file:
    monthly_values_json = json.load(file) 

# 2.2 Store Standard Devs in Monthly Values File 
for ticker in stdev_table.index:
    stdev_value = stdev_table[ticker]
    if math.isnan(stdev_value):
        monthly_values_json[ticker]["Meta Data"]["6. Stdev of Returns"] = None
    else:
        monthly_values_json[ticker]["Meta Data"]["6. Stdev of Returns"] = stdev_value


# 2.3 Update monthly values file with STDev data
with open('etfs-monthly-values.json', 'w') as json_file:
    json.dump(monthly_values_json, json_file, indent=4)