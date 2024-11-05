SELECT 
    sector
    , COUNT(CASE WHEN weight > 0 THEN ticker END) AS etfs_in_sector
    , AVG(CASE WHEN weight > 0 THEN weight END) AS avg_sector_weight
FROM etf_profiles.sectors
GROUP BY 1