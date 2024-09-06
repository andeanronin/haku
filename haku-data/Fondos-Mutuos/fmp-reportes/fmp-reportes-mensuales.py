import tabula
import pandas as pd
import os

# Scripts that uses tabula to scrape a PDF FILE 

# Ensure JavaHome is Set:
os.environ['JAVA_HOME'] = '/Library/Internet Plug-Ins/JavaAppletPlugin.plugin/Contents/Home' 

 # Path to the PDF file
pdf_completo = 'fmp-reportes/Reporte-Enero-2024.pdf'

column_names = ['Fondo', 'SAFM', 'Moneda', 'Valor Cuota', 'Mes', 'Status', 'Variación Anual 2023', 'Últimos 12 Meses',]


# Extract tables from page 4  FIX: not reading all pages
tables = tabula.read_pdf(pdf_completo , area=(50,0,1000,900) , multiple_tables=True, pages=[4,5,6,7,8], stream=True, columns=[200, 320,350, 385, 400, 450, 500,550])

cleaned_tables = []

for table in tables:
    if len(table.columns) == 9: 
        table = table.iloc[:, :-1] # remove 9th column from table
    table.columns = column_names
    cleaned_tables.append(table) # 

#print("Cleaned Tables:")
#print(cleaned_tables)

combined_df = pd.concat(cleaned_tables, ignore_index=True)

combined_df.to_csv('fmp-reporte-enero-2024.csv', index=False)

