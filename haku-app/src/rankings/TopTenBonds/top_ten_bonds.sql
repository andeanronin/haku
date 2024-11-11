SELECT
  `bonds_peru.bonds_general_data`.bond_key,
  `bonds_peru.bonds_general_data`.emisor,
  `bonds_peru.bonds_general_data`.sector,
  `bonds_peru.bonds_general_data`.valor as `Tipo`,
  round(`bonds_peru.bonds_general_data`.tasa_interes *100, 2) as  `Tasa de Interes %`,
  `bonds_peru.bonds_general_data`.monto_circulacion as `Monto en Circulacion`,
  risk_classification as `Clasificacion de Riesgo`
FROM `bonds_peru.bonds_general_data`
JOIN `bonds_peru.bonds_risk` on `bonds_peru.bonds_risk`.bond_key = `bonds_peru.bonds_general_data`.bond_key
ORDER BY tasa_interes desc 
limit 10