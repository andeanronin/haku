WITH CTE as (
  SELECT 
    `fondosDataTest.etfMonthlyValues`.ticker,
    `etf_profiles.etfs`.gestor,
    `dividend amount`,
    FIRST_VALUE(close) OVER (PARTITION BY `fondosDataTest.etfMonthlyValues`.ticker ORDER BY timestamp ASC) as january_close,
    FIRST_VALUE(close) OVER (PARTITION BY `fondosDataTest.etfMonthlyValues`.ticker ORDER BY timestamp DESC) as latest_close
  FROM `fondosDataTest.etfMonthlyValues`
  JOIN `etf_profiles.etfs`
    ON `etf_profiles.etfs`.ticker = `fondosDataTest.etfMonthlyValues`.ticker
  WHERE EXTRACT(YEAR FROM timestamp) = 2024
)
SELECT 
  ticker,
  gestor,
  SUM(`dividend amount`) as total_dividends,
  MAX(january_close) as january_close,
  MAX(latest_close) as latest_close,
  ROUND(((MAX(latest_close) - MAX(january_close)) / MAX(january_close)) * 100, 2) as yearly_return_percentage
FROM CTE
GROUP BY ticker, gestor;
