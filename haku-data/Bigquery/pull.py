import os 
import time
import pandas as pd
from google.cloud import bigquery

folder_path = "./haku-data/Bigquery"

# Big query credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "bigquery-service-key.json"
client = bigquery.Client()

# The name/path of the SQL query you wish to pull 
query = f'{folder_path}/data_sample.sql'

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
    #df.T.to_json('sample.json') ## uncomment to convert df to json file
else:
    print(job.result())

print(df)