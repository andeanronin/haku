import pandas as pd
import re

"""
This script puts the mutual fund table in TIDYs format.
It creates two tables:
    - mutual fund profiles (containing general data about the mutual fund )
    - mutual fund yearly returns  (containing fund's annual returns)
"""

def clean_column_name(column):
    """
    Clean column names to be BigQuery-compatible:
    - Replace spaces with underscores
    - Remove special characters and accents
    - Convert to lowercase
    - Remove any remaining invalid characters
    """
    # Replace spaces and dots with underscores
    clean = column.replace(' ', '_').replace('.', '_')
    
    # Remove special characters and accents
    clean = (
        clean.replace('á', 'a')
        .replace('é', 'e')
        .replace('í', 'i')
        .replace('ó', 'o')
        .replace('ú', 'u')
        .replace('ñ', 'n')
        .replace('/', '_')
        .replace('(', '')
        .replace(')', '')
    )
    
    # Convert to lowercase
    clean = clean.lower()
    
    # Remove any remaining invalid characters
    clean = re.sub(r'[^a-z0-9_]', '', clean)
    
    # Ensure the name doesn't start with a number
    if clean[0].isdigit():
        clean = 'n_' + clean
        
    return clean

def transform_mutual_fund_data(input_csv_path, profile_output_path, returns_output_path):
    # Read the CSV file
    df = pd.read_csv(input_csv_path)
    
    # TASK 1: profile table 
    # Define columns for the profile table (exclude both return columns and derived statistics that depend on returns)
    profile_columns = [
        'Tipo Fondo',
        'Fondo Mutuo',
        'Administradora',
        'Fec. Inicio Operación',
        'Moneda Cuota',
        'Valor Cuota',
        'Patrimonio S/.',
        'Partícipes N',
        'Años',
        'Categoria',
        'Fund id',
        'Risk',
        'Logo'
    ]
    
    # Create Mutual Fund Profile table
    profile_df = df[profile_columns].copy()

     # Clean column names for BigQuery compatibility
    profile_df.columns = [clean_column_name(col) for col in profile_df.columns]
    

    # Task 2: Create Mutual Fund Annual Returns table
    # Identify return columns using regex pattern
    return_columns = [col for col in df.columns if re.match(r'Rentabilidad \d{4}', col)]

    # Melt the return columns
    returns_df = pd.melt(
        df,
        id_vars=['Fund id'],
        value_vars=return_columns,
        var_name='Year',
        value_name='Return'
    )

    # Clean column names for big query format 
    returns_df.columns = [clean_column_name(col) for col in returns_df.columns]
    
    # Clean up the Year column by extracting just the year
    returns_df['year'] = returns_df['year'].str.extract(r'(\d{4})').astype(int)
    
    # Sort the returns dataframe by Fund ID and Year
    returns_df = returns_df.sort_values(['fund_id', 'year'])
    
    # Save both tables to CSV
    profile_df.to_csv(profile_output_path, index=False)
    returns_df.to_csv(returns_output_path, index=False)

    # Print the column mapping for reference
    print("\nColumn name mapping for profile table:")
    for old, new in zip(profile_columns, profile_df.columns):
        print(f"{old} -> {new}")
    
    return profile_df, returns_df

# Example usage
if __name__ == "__main__":
    input_path = "./haku-data/Fondos-Mutuos/fondos-mutuos-table-4.csv" 
    profile_output = "mutual_fund_profiles.csv"
    returns_output = "mutual_fund_annual_returns.csv"
    
    profile_df, returns_df = transform_mutual_fund_data(
        input_path, 
        profile_output, 
        returns_output
    )