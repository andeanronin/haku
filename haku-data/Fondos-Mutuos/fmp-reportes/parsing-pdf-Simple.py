import tabula
import pandas as pd
import os

# Ensure JavaHome is Set:
os.environ['JAVA_HOME'] = '/Library/Internet Plug-Ins/JavaAppletPlugin.plugin/Contents/Home' 

 # Path to the PDF file
pdf_path = 'fmp-reportes/reporte-enero-simple.pdf'

column_names = ['Fondo', 'SAFM', 'Moneda', 'Valor Cuota', 'Mes', 'Variación Anual 2023', 'Últimos 12 Meses']

# Extract tables from page 4 
tables = tabula.read_pdf(pdf_path, area=(140,0,400,900) , pages=1)

first_table = tables[0]
print(first_table)


#first_table.columns = column_names

#first_table.to_csv('fmp-reporte-enero-simple.csv', index=False)
