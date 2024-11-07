SELECT 
  `bonds_peru.bonds_general_data`.bond_key, 
  `bonds_peru.bonds_general_data`.emisor, 
  `bonds_peru.bonds_general_data`.sector,
  `bonds_peru.bonds_general_data`.valor,
  `bonds_peru.bonds_general_data`.fecha_colocacion,
  `bonds_peru.bonds_general_data`.fecha_vencimiento,
  `bonds_peru.bonds_general_data`.tasa_interes,
  `bonds_peru.bonds_general_data`.monto_circulacion,
  `bonds_peru.bonds_general_data`.moneda,
  credit_rating_agency, 
  risk_classification
FROM `bonds_peru.bonds_general_data`
JOIN `bonds_peru.bonds_risk`
ON `bonds_peru.bonds_general_data`.bond_key = `bonds_peru.bonds_risk`.bond_key
ORDER BY bond_key asc
