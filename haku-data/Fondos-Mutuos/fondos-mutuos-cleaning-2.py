import pandas as pd
from datetime import datetime 

"""
This script does a little bit of data cleaning on the fondos mutuos table 1. 
    - remove fund manager names from fund names 
    - adds column with the fund's # of years 
    - remove's  excel errors 
    - add "Categoria" de tipo de fondo column to simplify fund type categories 

Input: fondos-mutuos-table-1.csv
Output: fondos-mutuos-data-2 .csv & .json
"""

# Read Dataset
fondos_mutuos_dataframe = pd.read_csv("haku-data/Fondos-Mutuos/fondos-mutuos-table-1.csv")

# 1. Remove fund manager name from fund name column values 
# 1.1 Get set de los gestores 
gestores = set(fondos_mutuos_dataframe["Administradora"])

# 1.2 Function to remove gestor text from fund names 
def remove_gestor(fondo, gestores):
    for gestor in gestores:
        fondo = fondo.replace(gestor, "").strip()
    return fondo 

# 1.3 Use .apply to apply function on every row 
fondos_mutuos_dataframe["Fondo Mutuo"] = fondos_mutuos_dataframe["Fondo Mutuo"].apply(remove_gestor, gestores = gestores)


# 2. ADD COLUMN WITH FUND'S NUMBER OF YEARS
from datetime import datetime 

# 2.1 Changes the values in this column from strings to date objects 
fondos_mutuos_dataframe["Fec. Inicio Operación"] = pd.to_datetime(fondos_mutuos_dataframe["Fec. Inicio Operación"], format='mixed')

current_year = datetime.now().year 

# 2.2 Create new column for the amount of years fund has been active 
fondos_mutuos_dataframe["Años"] = current_year - fondos_mutuos_dataframe["Fec. Inicio Operación"].dt.year

# 2.3 Revert data back to string format
fondos_mutuos_dataframe["Fec. Inicio Operación"] = fondos_mutuos_dataframe["Fec. Inicio Operación"].dt.strftime("%d/%m/%Y")

"""
# 3. UPDATE Excel !DIV Error to Empty String
for i in range(len(fondos_mutuos_dataframe)):
    fondos_mutuos_dataframe.loc[i,"Standard Dev"] = fondos_mutuos_dataframe.loc[i,"Standard Dev"].replace("#DIV/0!", "")
    fondos_mutuos_dataframe.loc[i, "Avg Return Arithmetic"] = fondos_mutuos_dataframe.loc[i,"Avg Return Arithmetic"].replace("#DIV/0!", "")


# 4. Convert Values in Std. Dev & Average Arithmetic from Strings --> floats
fondos_mutuos_dataframe["Standard Dev"] = pd.to_numeric(fondos_mutuos_dataframe["Standard Dev"], errors = "coerce")
fondos_mutuos_dataframe["Avg Return Arithmetic"] = pd.to_numeric(fondos_mutuos_dataframe["Avg Return Arithmetic"] , errors = "coerce")
"""

# 5. Add "Categoria" column
# 5.1 Set de tipos de fondos 
tipo_de_fondos = set(fondos_mutuos_dataframe["Tipo Fondo"])

categorias_renta_fija = ["Corto Plazo Soles","Corto Plazo Dólares", "Inst. Deuda Mediano Plazo S/", "Inst. Deuda Mediano Plazo $",
                         "Inst. Deuda Corto Plazo S/", "Inst. Deuda Corto Plazo $", "Inst Deuda Duración Flexibl S/" , 
                         "Inst Deuda Duración Flexibl $" , "Instrumento de Deuda"]

categorias_renta_mixta = ["Renta Mixta Crecimiento Soles", "Renta Mixta Balanceado Dólares", "Renta Mixta Moderado Soles", 
                          "Renta Mixta Moderado Dólares"]

# 5.2 
for i in range(len(fondos_mutuos_dataframe)):
    if fondos_mutuos_dataframe.loc[i, "Tipo Fondo"] in categorias_renta_fija:
        fondos_mutuos_dataframe.loc[i, "Categoria"] = "Renta Fija"
    elif fondos_mutuos_dataframe.loc[i, "Tipo Fondo"] in categorias_renta_mixta:
        fondos_mutuos_dataframe.loc[i, "Categoria"] = "Renta Mixta"
    elif fondos_mutuos_dataframe.loc[i, "Tipo Fondo"] == "Flexible" or fondos_mutuos_dataframe.loc[i, "Tipo Fondo"] == "Flexible Dólares":
        fondos_mutuos_dataframe.loc[i, "Categoria"] = "Flexible"
    else:
        fondos_mutuos_dataframe.loc[i, "Categoria"] = fondos_mutuos_dataframe.loc[i]["Tipo Fondo"]

# 6. Add column with unique fund ID
fondos_mutuos_dataframe['Fund id'] = range(1, len(fondos_mutuos_dataframe) + 1) 


# Print the updated dataframe to verify changes
print(fondos_mutuos_dataframe.head())


# 6. SERIALIZE DATA TO CSV & JSON 
fondos_mutuos_dataframe.to_csv("haku-data/Fondos-Mutuos/fondos-mutuos-table-2.csv" , index=False)

fondos_mutuos_dataframe.to_json("haku-data/Fondos-Mutuos/fondos-mutuos-data-2.json" , orient="records" , indent=4)

