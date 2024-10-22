import os 
import time
import pandas as pd
from google.cloud import bigquery

# Big query credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'bq_credentials.json'
client = bigquery.Client()


# The name/path of the SQL file you wish to pull 
query = 'data_sample.sql'

# Read file
with open (query, 'r') as file:
    sql_read = file.read()

# Request google client 
job = client.query(sql_read)

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


