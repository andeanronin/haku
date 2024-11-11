SELECT 
    `MutualFunds.MutualFundProfiles`.fund_id,
    fondo_mutuo,
    categoria,
    administradora,
    return,
    risk,
    year
FROM `MutualFunds.MutualFundProfiles`
JOIN `MutualFunds.MutualFundsAnnualReturns` on `MutualFunds.MutualFundsAnnualReturns`.fund_id = `MutualFunds.MutualFundProfiles`.fund_id
WHERE categoria = 'Fondo de Fondos' and year = 2024
ORDER BY return desc 
LIMIT 10
