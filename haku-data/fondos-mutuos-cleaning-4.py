import pandas as pd
import os
print("Current working directory:", os.getcwd()) 

# Read CSV
fondos_mutuos_dataframe = pd.read_csv("haku-data/fondos-mutuos-table-3.csv")

# Drop rows with NaN value for CAGR column
fondos_mutuos_dataframe = fondos_mutuos_dataframe.dropna(subset=["CAGR"])

# Update Fund IDs
fondos_mutuos_dataframe['Fund id'] = range(1, len(fondos_mutuos_dataframe) + 1) 

print(fondos_mutuos_dataframe.head())

# Store dataframe in csv file
fondos_mutuos_dataframe.to_csv("haku-data/fondos-mutuos-table-4.csv" , index=False)

fondos_mutuos_dataframe.to_json("haku-data/fondos-mutuos-data-4.json" , orient="records" , indent=4)

