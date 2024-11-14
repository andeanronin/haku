SELECT 
    `MutualFunds.MutualFundProfiles2`.fund_id,
    fondo_mutuo,
    categoria,
    administradora,
    return,
    risk,
    year
FROM `MutualFunds.MutualFundProfiles2`
JOIN `MutualFunds.MutualFundsAnnualReturns2` on `MutualFunds.MutualFundsAnnualReturns2`.fund_id = `MutualFunds.MutualFundProfiles2`.fund_id
WHERE categoria = 'Renta Variable' and year = 2024
ORDER BY return desc 
LIMIT 10
