"""
This scripts cleans  the bond general data table before uploading to BIG Query
- saves cleaned table to CSV
- uploads to big query
"""


import pandas as pd
from google.cloud import bigquery
from google.oauth2 import service_account


# Set up Big Query 
credentials_path = "./bigquery-service-key.json"
credentials = service_account.Credentials.from_service_account_file(credentials_path)
client = bigquery.Client(credentials=credentials, project=credentials.project_id) # Initialize BigQuery client


csv_path= ("./haku-data/Bonds/bonds_sept_24.csv")

bond_risk_df = pd.read_csv(csv_path)

def clean_interest_rate(interest_rate): 
    if isinstance(interest_rate, str) and '%' in interest_rate and '+' not in interest_rate:  # 
        try:
            return float(interest_rate.strip().replace('%','')) / 100
        except ValueError: 
            return interest_rate
    return interest_rate

bond_risk_df["tasa_interes"] = bond_risk_df["tasa_interes"].apply(clean_interest_rate)

# Save data to CSV
bond_risk_df.to_csv("./haku-data/Bonds/bonds_sept_24.csv", index=False)


# UPLOAD TO BIG QUERY
table_id = "acquired-talent-433423-d4.bonds_peru.bonds_general_data"  # Update with your project, dataset, and table name

# Configure job
job_config = bigquery.LoadJobConfig(
    write_disposition="WRITE_TRUNCATE"  # Overwrite the table if it already exists
)

# Run load job
job = client.load_table_from_dataframe(bond_risk_df, table_id, job_config=job_config)
job.result()  # Waits for the job to complete

print(f"Data uploaded to BigQuery table {table_id}")

