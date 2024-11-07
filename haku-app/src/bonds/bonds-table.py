"""
This script querys bond data from Big Query and stores it in a json file for react.
- querys from the general bond data and bond risk tables 
"""

import os 
import time
import pandas as pd
from google.cloud import bigquery

folder_path = "./haku-app/src/bonds"

# Big query credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "bigquery-service-key.json"
client = bigquery.Client()

# The name/path of the SQL query you wish to pull 
query = f'{folder_path}/bonds_table.sql'

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

    print(df["fecha_colocacion"])

    # Save to JSON
    df.to_json("./haku-app/src/bonds/bonds_table.json", orient="records", indent=4, date_format='iso')

else:
    print(job.result())



