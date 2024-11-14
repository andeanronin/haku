import pandas as pd
import os
print("Current working directory:", os.getcwd()) 

# Read CSV
fondos_mutuos_dataframe = pd.read_csv("haku-data/Fondos-Mutuos/fondos-mutuos-table-3.csv")

# Drop rows with NaN value for CAGR column
fondos_mutuos_dataframe = fondos_mutuos_dataframe.dropna(subset=["CAGR"])

# Remove blanco safi's funds from dataset
fondos_mutuos_dataframe = fondos_mutuos_dataframe[fondos_mutuos_dataframe["Administradora"] != "BLANCO SAFI S.A.C."]

# Update Fund IDs
fondos_mutuos_dataframe['Fund id'] = range(1, len(fondos_mutuos_dataframe) + 1) 

# ADD LOGO ROUTES
fondos_list = fondos_mutuos_dataframe.to_dict('records')

logo_map = {
    "BTG PACTUAL PERU SAF": "/logosFondosMutuos/logoBtg.png",
    "BLUM SAF": "/logosFondosMutuos/logoBlum.png",
    "PROMOINVEST SAF": "/logosFondosMutuos/logoPromoInvest.png",  
    "FONDOS SURA SAF": "/logosFondosMutuos/logoSura.png",
    "INTERFONDO": "/logosFondosMutuos/logoInterFondos.png",
    "INDEPENDIENTE SAF": "/logosFondosMutuos/logoIndependiente.png",
    "SCOTIA FONDOS": "/logosFondosMutuos/logoScotia2.png",
    "FARO CAPITAL SAFI": "/logosFondosMutuos/logoFaro.png",
    "PRUDENTIALSAF SAF": "/logosFondosMutuos/logoPrudential.png",
    "DIVISO FONDOS SAF S.A.": "/logosFondosMutuos/logoDiviso.png",  
    "CORIL SAF": "/logosFondosMutuos/logoCoril.png",
    "CONTINENTAL FM": "/logosFondosMutuos/logoBbva.svg",
    "ANDEAN CROWN SAF S.A.C.": "/logosFondosMutuos/logoAC.png",
    "EL DORADO SAF": "/logosFondosMutuos/logoDorado.png",
    "BD CAPITAL SAF": "/logosFondosMutuos/logoBD.png",
    "CREDIFONDO SAF": "/logosFondosMutuos/logoCredicorp.png"
}

for item in fondos_list:
  item["Logo"] = logo_map[item["Administradora"]]


# SERIALIZE DATA: csv & json
fondos_mutuos_dataframe = pd.DataFrame(fondos_list)

fondos_mutuos_dataframe.to_csv("haku-data/Fondos-Mutuos/fondos-mutuos-table-4.csv" , index=False)

fondos_mutuos_dataframe.to_json("haku-data/Fondos-Mutuos/fondos-mutuos-data-4.json" , orient="records" , indent=4)

