"""
This script querys top ten bonds by yield
"""

import os 
import time
import pandas as pd
from google.cloud import bigquery

folder_path = "./haku-app/src/rankings/TopTenBonds"

# Big query credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "bigquery-service-key.json"
client = bigquery.Client()

# The name/path of the SQL query you wish to make 
query = f'{folder_path}/top_ten_bonds.sql'

# Read SQL file
with open (query, 'r') as file:
    sql_read = file.read()

# Request the query to google client 
job = client.query(sql_read) # job contains the queried data

# Wait for query to execute, build dataframe and json once done
while job.state != 'DONE':
    job.reload()
    time.sleep(3)

if job.state == 'DONE':
    df = job.to_dataframe()

    # Save to JSON
    df.to_json("./haku-app/src/rankings/TopTenBonds/top_ten_bonds.json", orient="records", indent=4)

else:
    print(job.result())