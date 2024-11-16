"""
This script transform the etf-profiles.json file received from api and uploads it to big query in 4 tables
Input: etf-profiles.json
Output: tables in big query
    - main table
    - asset allocation table
    - sectors table
    - holdings table
"""


import os
from google.cloud import bigquery
import pandas as pd
import json

# Set your Google Cloud credentials
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'bigquery-service-key.json'

# Initialize BigQuery client
client = bigquery.Client()

# Define your project and dataset
PROJECT_ID = 'acquired-talent-433423-d4'  # Google Cloud project ID
DATASET_ID = 'etf_profiles'     # Dataset in Big Query to upload to

# Create dataset if it doesn't exist
dataset_ref = f"{PROJECT_ID}.{DATASET_ID}"
try:
    client.get_dataset(dataset_ref)
except Exception as e:
    # Dataset does not exist, create it
    dataset = bigquery.Dataset(dataset_ref)
    dataset.location = "US"  # Specify the location
    client.create_dataset(dataset, timeout=30)

# Function to create tables
def create_tables():
    # Create ETFs table
    etfs_table = f"""
    CREATE TABLE IF NOT EXISTS `{PROJECT_ID}.{DATASET_ID}.etfs` (
        ticker STRING,
        net_assets NUMERIC,
        net_expense_ratio FLOAT64,
        portfolio_turnover FLOAT64,
        dividend_yield FLOAT64,
        inception_date DATE,
        leveraged STRING
    )
    """
    
    # Create Asset Allocations table
    asset_allocations_table = f"""
    CREATE TABLE IF NOT EXISTS `{PROJECT_ID}.{DATASET_ID}.asset_allocations` (
        ticker STRING,
        domestic_equities FLOAT64,
        foreign_equities FLOAT64,
        bond FLOAT64,
        cash FLOAT64,
        other FLOAT64
    )
    """
    
    # Create Sectors table
    sectors_table = f"""
    CREATE TABLE IF NOT EXISTS `{PROJECT_ID}.{DATASET_ID}.sectors` (
        ticker STRING,
        sector STRING,
        weight FLOAT64
    )
    """
    
    # Create Holdings table
    holdings_table = f"""
    CREATE TABLE IF NOT EXISTS `{PROJECT_ID}.{DATASET_ID}.holdings` (
        ticker STRING,
        holding_symbol STRING,
        description STRING,
        weight FLOAT64
    )
    """
    
    # Execute CREATE TABLE statements
    queries = [etfs_table, asset_allocations_table, sectors_table, holdings_table]
    for query in queries:
        try:
            client.query(query).result()
            print(f"Successfully created table")
        except Exception as e:
            print(f"Error creating table: {str(e)}")

def safe_float_convert(value):
    """Convert string to float, return None if value is 'n/a' or invalid"""
    if value in ('n/a', '', None):
        return None
    try:
        return float(value)
    except (ValueError, TypeError):
        return None
    
def load_etf_data(json_file_path):
    # Read JSON file
    with open(json_file_path, 'r') as f:
        data = json.load(f)
    
    # Initialize empty lists for each table
    etfs_data = []
    asset_allocations_data = []
    sectors_data = []
    holdings_data = []
    
    for ticker, etf in data.items():
        # Main ETF data
        etfs_data.append({
            'ticker': ticker,
            'net_assets': safe_float_convert(etf['net_assets']),
            'net_expense_ratio': safe_float_convert(etf['net_expense_ratio']),
            'portfolio_turnover': safe_float_convert(etf['portfolio_turnover']),
            'dividend_yield': safe_float_convert(etf['dividend_yield']),
            'inception_date': etf['inception_date'],
            'leveraged': etf['leveraged'],
            'name': etf['name'],
            'gestor': etf['gestor'],
            'isin': etf['ISIN'],
            'logo': etf['logo']
        })
        
        # Asset allocations
        asset_allocations_data.append({
            'ticker': ticker,
            **{k: safe_float_convert(v) for k, v in etf['asset_allocation'].items()}
        })
        
        # Sectors
        for sector in etf['sectors']:
            sectors_data.append({
                'ticker': ticker,
                'sector': sector['sector'],
                'weight': safe_float_convert(sector['weight'])
            })
        
        # Holdings
        for holding in etf['holdings']:
            holdings_data.append({
                'ticker': ticker,
                'holding_symbol': holding['symbol'],
                'description': holding['description'],
                'weight': safe_float_convert(holding['weight'])
            })
    
    # Convert to DataFrames
    etfs_df = pd.DataFrame(etfs_data)
    asset_allocations_df = pd.DataFrame(asset_allocations_data)
    sectors_df = pd.DataFrame(sectors_data)
    holdings_df = pd.DataFrame(holdings_data)
    
    # Define table references
    table_refs = {
        'etfs': f"{PROJECT_ID}.{DATASET_ID}.etfs",
        'asset_allocations': f"{PROJECT_ID}.{DATASET_ID}.asset_allocations",
        'sectors': f"{PROJECT_ID}.{DATASET_ID}.sectors",
        'holdings': f"{PROJECT_ID}.{DATASET_ID}.holdings"
    }
    
    # Load data to BigQuery
    job_config = bigquery.LoadJobConfig(write_disposition="WRITE_TRUNCATE")
    
    # Dictionary mapping DataFrames to their table names
    df_map = {
        'etfs': etfs_df,
        'asset_allocations': asset_allocations_df,
        'sectors': sectors_df,
        'holdings': holdings_df
    }
    
    # Load each DataFrame to its corresponding table
    for table_name, df in df_map.items():
        try:
            job = client.load_table_from_dataframe(
                df, 
                table_refs[table_name], 
                job_config=job_config
            )
            job.result()  # Wait for the job to complete
            print(f"Loaded {len(df)} rows into {table_name}")
        except Exception as e:
            print(f"Error loading {table_name}: {str(e)}")

# Main execution
if __name__ == "__main__":
    # Create tables first
    create_tables()
    
    # Then load the data
    json_file_path = "./haku-data/ETFs/EtfProfiles/etfs-profiles.json" 
    load_etf_data(json_file_path)