# Add risk column to bond risk table

import pandas as pd

path = "./haku-data/Bonds/bonds_risk_sept24.csv"

df = pd.read_csv(path)

df['risk'] = None

#  Pandas conditional statements - more readable
df['risk'] = None  # Initialize with None
df.loc[df['risk_classification'].str.contains('A|1', case=True, na=False), 'risk'] = 'low'
df.loc[df['risk_classification'].str.contains('B|2', case=True, na=False), 'risk'] = 'medium low'

print(df.head())

df.to_csv("./haku-data/Bonds/bonds_risk_2.csv", index=False)