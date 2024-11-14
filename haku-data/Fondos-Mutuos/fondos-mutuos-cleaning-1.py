import pandas as pd

import os
print("Current working directory:", os.getcwd())   # note: this script runs

# PATH - READ csv data
fondos_mutuos_24 = pd.read_csv('haku-data/Fondos-Mutuos/smv-cuadros/fondos-mutuos-10-24.csv', skiprows=6, skipfooter=3, engine='python')
fondos_mutuos_19 = pd.read_csv('haku-data/Fondos-Mutuos/smv-cuadros/fondos-mutuos-resumen-01-19.csv', skiprows=6, skipfooter=3, engine='python')

# Remove any trailing or leading whitespace in the column names.
fondos_mutuos_19.columns = fondos_mutuos_19.columns.str.strip()
fondos_mutuos_24.columns = fondos_mutuos_24.columns.str.strip()

# MERGE Dataframes: left join of 2019 dataset's 2014-2018 columns on 2024 dataset
fondos_mutuos = pd.merge(fondos_mutuos_24, fondos_mutuos_19[['Fondo Mutuo', 'Rentabilidad(A) 2018', 'Rentabilidad(A) 2017', 'Rentabilidad(A) 2016', 'Rentabilidad(A) 2015', 'Rentabilidad(A) 2014']], on='Fondo Mutuo', how='left')

# Rename columns
fondos_mutuos.rename(columns={
    'Rentabilidad(A) 2023': 'Rentabilidad 2023',
    'Rentabilidad(A) 2022': 'Rentabilidad 2022',
    'Rentabilidad(A) 2021': 'Rentabilidad 2021',
    'Rentabilidad(A) 2020': 'Rentabilidad 2020',
    'Rentabilidad(A) 2019': 'Rentabilidad 2019',
    'Rentabilidad(A) 2018': 'Rentabilidad 2018',
    'Rentabilidad(A) 2017': 'Rentabilidad 2017',
    'Rentabilidad(A) 2016': 'Rentabilidad 2016',
    'Rentabilidad(A) 2015': 'Rentabilidad 2015',
    'Rentabilidad(A) 2014': 'Rentabilidad 2014',
    'Variacion desde el Inicio del 2024': 'Rentabilidad 2024',
}, inplace=True)

# Re-order column order.
columns_order = ['Tipo Fondo', 'Fondo Mutuo', 'Administradora', 'Fec. Inicio Operación', 'Moneda Cuota', 
                 'Valor Cuota', 'Rentabilidad 2024', 'Rentabilidad 2023', 'Rentabilidad 2022',
                 'Rentabilidad 2021', 'Rentabilidad 2020', 'Rentabilidad 2019', 'Rentabilidad 2018', 
                 'Rentabilidad 2017', 'Rentabilidad 2016', 'Rentabilidad 2015', 'Rentabilidad 2014', 
                 'Patrimonio S/.', 'Patrimonio %', 'Partícipes N', 'Partícipes %', 'Inf. Atrasada']

# Reset the column order and drop 
fondos_mutuos = fondos_mutuos[columns_order]
fondos_mutuos = fondos_mutuos.drop(columns=['Partícipes %', 'Patrimonio %' , 'Inf. Atrasada'])


# CONVERT data types 
# Function to remove percent (%) sign and convert from str to float
def remove_percent_and_convert(series):    
    return (pd.to_numeric(series.str.replace('%', ''), errors='coerce')/100).round(4)

# Function to remove commas and convert from str to float 
def remove_commas_and_convert(series):
    return pd.to_numeric(series.str.replace(',', ''), errors='coerce')


# List of columns to convert (adjust based on your actual column names)
percent_columns = ['Rentabilidad 2024', 'Rentabilidad 2023', 'Rentabilidad 2022', 'Rentabilidad 2021', 'Rentabilidad 2020', 'Rentabilidad 2019', 'Rentabilidad 2018', 'Rentabilidad 2017', 'Rentabilidad 2016', 'Rentabilidad 2015', 'Rentabilidad 2014']
monetary_columns = ['Patrimonio S/.', 'Partícipes N']

# Apply the data type conversions the the above columns:
for col in percent_columns:
    fondos_mutuos[col] = remove_percent_and_convert(fondos_mutuos[col])

for col in monetary_columns:
    fondos_mutuos[col] = remove_commas_and_convert(fondos_mutuos[col])

# Round columns 'valor cuota' and 'patrimonio s/.' to 2 decimal places
fondos_mutuos['Valor Cuota'] = fondos_mutuos['Valor Cuota'].round(2)
fondos_mutuos['Patrimonio S/.'] = fondos_mutuos['Patrimonio S/.'].round(2)

# Remove the number codes for "Tipo de Fondo Column"
fondos_mutuos["Tipo Fondo"] = fondos_mutuos["Tipo Fondo"].str[5:]

# Change Rentabilidad 2024 --> -100 values to zero or null
for i in range(len(fondos_mutuos)):
    if fondos_mutuos.loc[i, 'Rentabilidad 2024'] == -1.0:
        fondos_mutuos.loc[i, 'Rentabilidad 2024'] = None
    elif fondos_mutuos.loc[i, 'Rentabilidad 2023'] == -1.0:
        fondos_mutuos.loc[i, 'Rentabilidad 2023'] = None
    elif fondos_mutuos.loc[i, 'Rentabilidad 2022'] == -1.0:
        fondos_mutuos.loc[i, 'Rentabilidad 2022'] = None
    elif fondos_mutuos.loc[i, 'Rentabilidad 2021'] == -1.0:
        fondos_mutuos.loc[i, 'Rentabilidad 2021'] = None
    elif fondos_mutuos.loc[i, 'Rentabilidad 2020'] == -1.0:
        fondos_mutuos.loc[i, 'Rentabilidad 2020'] = None
    elif fondos_mutuos.loc[i, 'Rentabilidad 2019'] == -1.0:
        fondos_mutuos.loc[i, 'Rentabilidad 2019'] = None
    elif fondos_mutuos.loc[i, 'Rentabilidad 2018'] == -1.0:
        fondos_mutuos.loc[i, 'Rentabilidad 2018'] = None
    elif fondos_mutuos.loc[i, 'Rentabilidad 2017'] == -1.0:
        fondos_mutuos.loc[i, 'Rentabilidad 2017'] = None
    elif fondos_mutuos.loc[i, 'Rentabilidad 2016'] == -1.0:
        fondos_mutuos.loc[i, 'Rentabilidad 2016'] = None
    elif fondos_mutuos.loc[i, 'Rentabilidad 2015'] == -1.0:
        fondos_mutuos.loc[i, 'Rentabilidad 20 15'] = None
    elif fondos_mutuos.loc[i, 'Rentabilidad 2014'] == -1.0:
        fondos_mutuos.loc[i, 'Rentabilidad 2014'] = None



# Make a df copy with whole numbers (as opposed to decimals) for the annualized return columns
fondos_mutuos_whole = fondos_mutuos.copy()
for col in percent_columns:
    fondos_mutuos_whole[col] = fondos_mutuos_whole[col] * 100

# Remove the number codes for the Tipo de Fondo Column 
#fondos_mutuos_whole["Tipo Fondo"] = fondos_mutuos_whole["Tipo Fondo"].str[5:]

# Display the first few rows of the updated DataFrame
print(fondos_mutuos["Fondo Mutuo"][24])
print(fondos_mutuos["Rentabilidad 2024"][24])


# Save dataframe to a csv file.
fondos_mutuos.to_csv('haku-data/Fondos-Mutuos/fondos-mutuos-table-1.csv', index=False)

# Save dataframe to JSON files 
fondos_mutuos.to_json('haku-data/Fondos-Mutuos/fondos-mutuos-data-1.json', orient='records', indent=4)
#fondos_mutuos_whole.to_json('haku-data/fondos-mutuos-whole.json', orient='records', indent=4)