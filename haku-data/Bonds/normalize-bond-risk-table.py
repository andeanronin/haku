"""
This script normalizes bond risk table to TIDY format using pandas melt() method.

Saves data to CSV
"""

import pandas as pd
import os
from google.cloud import bigquery
from google.oauth2 import service_account

print("Current Working Directory: ", os.getcwd())

# Set up Big Query 
credentials_path = "./bigquery-service-key.json"
credentials = service_account.Credentials.from_service_account_file(credentials_path)
client = bigquery.Client(credentials=credentials, project=credentials.project_id) # Initialize BigQuery client


# Table to TIDY format
path_bond_risk_table = ("./haku-data/Bonds/bonds_risk_sept_24_semistructured.csv")

bond_risk_df = pd.read_csv(path_bond_risk_table)

column_names = ["bond_key", "emisor", "risk_clasification", "credit_rating_agency"]

tidy_df = pd.melt(bond_risk_df, 
                  id_vars=['bond_key', 'emisor'],         # Columns to keep unchanged
                  value_vars=['apoyo', 'moodys_local_peru', 'jcr_latino_america', 'pcr'], # Columns to melt
                  var_name='credit_rating_agency',         # New column for the agency name
                  value_name='risk_classification'         # New column for the rating
                 )

# Drop rows with missing values in 'risk_classification' if desired
tidy_df = tidy_df.dropna(subset=['risk_classification']).reset_index(drop=True) 


# SAVE TO CSV
tidy_df.to_csv("./haku-data/Bonds/bonds_risk_sept24.csv", index=False)



# UPLOAD TO BIG QUERY
table_id = "acquired-talent-433423-d4.bonds_peru.bonds_risk"  # Update with your project, dataset, and table name

# Configure job
job_config = bigquery.LoadJobConfig(
    write_disposition="WRITE_TRUNCATE"  # Overwrite the table if it already exists
)

# Run load job
job = client.load_table_from_dataframe(tidy_df, table_id, job_config=job_config)
job.result()  # Waits for the job to complete

print(f"Data uploaded to BigQuery table {table_id}")