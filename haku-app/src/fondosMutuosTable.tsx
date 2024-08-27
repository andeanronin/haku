/* 
This component creates an interactive table containing fund data 
Each fund corresponds to a row in the table.
The table has additional features, like filtering by fund type, administrator, currency, return and fund size.
*/
import { useState, useEffect, useMemo } from "react";
import "./fondosMutuosTable.css";
import AdminPopup from "./adminPopup";
import { useNavigate } from "react-router-dom";

interface MutualFundData {
  "Tipo Fondo": string;
  "Fondo Mutuo": string;
  Administradora: string;
  "Fec. Inicio Operación": string;
  "Moneda Cuota": string;
  "Valor Cuota": number | null;
  "Rentabilidad 2024": number | null;
  "Rentabilidad 2023": number | null;
  "Rentabilidad 2022": number | null;
  "Rentabilidad 2021": number | null;
  "Rentabilidad 2020": number | null;
  "Rentabilidad 2019": number | null;
  "Rentabilidad 2018": number | null;
  "Rentabilidad 2017": number | null;
  "Rentabilidad 2016": number | null;
  "Rentabilidad 2015": number | null;
  "Rentabilidad 2014": number | null;
  "Patrimonio S/.": number | null;
  "Partícipes N": number | null;
  Años: number | null;
  Categoria: string;
  "Fund id": number;
  "Highest Return": number | null;
  "Lowest Return": number | null;
  "Avg Return (Arithmetic)": number | null;
  "Standard Deviation of Returns": number | null;
  "Total Cumulative Return": number | null;
  "Cumulative Return Period": number | null;
  "Annualized Cumulative Return": number | null;
  CAGR: number | null;
  "Sharpe Ratio": number | null;
  Risk: string | null;
  [key: string]: string | number | null;
}

function FondosMutuosTable({ data }: { data: MutualFundData[] }) {
  const navigate = useNavigate();

  const [displayData, setDisplayData] = useState<MutualFundData[]>(data);
  const [sortColumn, setSortColumn] = useState<keyof MutualFundData | null>(
    null
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isSorting, setIsSorting] = useState(false);
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<string | null>(null);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [selectedFundType, setSelectedFundType] = useState<string | null>(null);
  const [showRiskDropdown, setShowRiskDropdown] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);
  const [showCategoriaDropdown, setShowCategoriaDropdown] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState<string | null>(
    null
  );

  const columnsToDisplay: (keyof MutualFundData)[] = [
    "Fondo Mutuo",
    "Administradora",
    "Fec. Inicio Operación",
    "Moneda Cuota",
    "Valor Cuota",
    "Categoria",
    "Risk",
    "CAGR",
    "Sharpe Ratio",
  ];

  const percentageColumns: (keyof MutualFundData)[] = ["CAGR"];

  const sortableColumns: (keyof MutualFundData)[] = ["CAGR", "Sharpe Ratio"];

  const formatPercentage = (value: number | null): string => {
    if (value === null) return "N/A";
    return (value * 100).toFixed(2);
  };

  const formatDecimal = (value: number | null): string => {
    if (value === null) return "N/A";
    return value.toFixed(2);
  };

  const getColor = (column: keyof MutualFundData, value: number | null) => {
    if (column === "Valor Cuota") {
      return undefined;
    }
    if (value === null) {
      return undefined;
    }
    return value >= 0 ? "positive" : "negative";
  };

  const getRiskColor = (value: string | null) => {
    if (value === null) {
      return undefined;
    } else if (value === "Low") {
      return "green";
    } else if (value === "Medium Low") {
      return "green-orange";
    } else if (value === "Medium") {
      return "orange";
    } else if (value === "Medium High") {
      return "orange-red";
    } else {
      return "red";
    }
  };

  const sortData = (column: keyof MutualFundData) => {
    setIsSorting(true);
    const sortedData = [...displayData].sort((a, b) => {
      if (a[column] === null && b[column] === null) return 0;
      if (a[column] === null) return 1;
      if (b[column] === null) return -1;
      if (a[column]! < b[column]!) return sortDirection === "asc" ? -1 : 1;
      if (a[column]! > b[column]!) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setTimeout(() => {
      setDisplayData(sortedData);
      setSortColumn(column);
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      setIsSorting(false);
    }, 200);
  };

  const renderSortIcon = (column: keyof MutualFundData) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? "▲" : "▼";
  };

  useEffect(() => {
    const filteredData = data.filter((item) => {
      const adminMatch =
        !selectedAdmin || item.Administradora === selectedAdmin;
      const currencyMatch =
        !selectedCurrency || item["Moneda Cuota"] === selectedCurrency;
      const fundTypeMatch =
        !selectedFundType || item["Tipo Fondo"] === selectedFundType;
      const riskMatch = !selectedRisk || item.Risk === selectedRisk;
      const categoriaMatch =
        !selectedCategoria || item.Categoria === selectedCategoria;
      return (
        adminMatch &&
        currencyMatch &&
        fundTypeMatch &&
        riskMatch &&
        categoriaMatch
      );
    });
    setDisplayData(filteredData);
  }, [
    selectedAdmin,
    selectedCurrency,
    selectedFundType,
    selectedRisk,
    selectedCategoria,
    data,
  ]);

  const uniqueAdministrators = useMemo(() => {
    const adminSet = new Set(data.map((item) => item.Administradora));
    return Array.from(adminSet);
  }, [data]);

  const uniqueCurrencies = ["$", "S/."];

  const uniqueRisks = useMemo(() => {
    const riskSet = new Set(
      data
        .map((item) => item.Risk)
        .filter((risk): risk is string => risk !== null)
    );
    return Array.from(riskSet);
  }, [data]);

  const uniqueCategorias = useMemo(() => {
    const categoriaSet = new Set(data.map((item) => item.Categoria));
    return Array.from(categoriaSet);
  }, [data]);

  const handleAdminSelect = (admin: string) => {
    setSelectedAdmin(admin);
    setShowAdminPopup(false);
  };

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    setShowCurrencyDropdown(false);
  };

  const handleRiskSelect = (risk: string) => {
    setSelectedRisk(risk);
    setShowRiskDropdown(false);
  };

  const handleCategoriaSelect = (categoria: string) => {
    setSelectedCategoria(categoria);
    setShowCategoriaDropdown(false);
  };

  const resetAdminFilter = () => setSelectedAdmin(null);
  const resetCurrencyFilter = () => setSelectedCurrency(null);
  const resetFundTypeFilter = () => setSelectedFundType(null);
  const resetRiskFilter = () => setSelectedRisk(null);
  const resetCategoriaFilter = () => setSelectedCategoria(null);

  return (
    <>
      <div className="fondos-mutuos-table-page-container">
        <div className="fondos-mutuos-header">
          <div className="tableFilters-container">
            {selectedAdmin && (
              <div className="filtered-funds-heading">
                <button onClick={resetAdminFilter}>Clear</button>
                <p>Fondos de: {selectedAdmin}</p>
              </div>
            )}
            {selectedCurrency && (
              <div className="filtered-funds-heading">
                <button onClick={resetCurrencyFilter}>Clear</button>
                <p>Currency: {selectedCurrency}</p>
              </div>
            )}
            {selectedFundType && (
              <div className="filtered-funds-heading">
                <button onClick={resetFundTypeFilter}>Clear</button>
                <p>Fund Type: {selectedFundType}</p>
              </div>
            )}
            {selectedRisk && (
              <div className="filtered-funds-heading">
                <button onClick={resetRiskFilter}>Clear</button>
                <p>Risk: {selectedRisk}</p>
              </div>
            )}
            {selectedCategoria && (
              <div className="filtered-funds-heading">
                <button onClick={resetCategoriaFilter}>Clear</button>
                <p>Categoria: {selectedCategoria}</p>
              </div>
            )}
          </div>
        </div>

        {/* TABLE COMPONENT */}
        <div className="table-container">
          <table className="fondosMutuosTable">
            <thead>
              <tr>
                {columnsToDisplay.map((column) => (
                  <th
                    key={column}
                    onClick={() => {
                      if (sortableColumns.includes(column)) {
                        sortData(column);
                      } else if (column === "Administradora") {
                        setShowAdminPopup(true);
                      }
                    }}
                    style={{
                      cursor:
                        sortableColumns.includes(column) ||
                        column === "Administradora"
                          ? "pointer"
                          : "default",
                      position: "relative",
                    }}
                    onMouseEnter={() => {
                      if (column === "Moneda Cuota")
                        setShowCurrencyDropdown(true);
                      if (column === "Risk") setShowRiskDropdown(true);
                      if (column === "Categoria")
                        setShowCategoriaDropdown(true);
                    }}
                    onMouseLeave={() => {
                      if (column === "Moneda Cuota")
                        setShowCurrencyDropdown(false);
                      if (column === "Risk") setShowRiskDropdown(false);
                      if (column === "Categoria")
                        setShowCategoriaDropdown(false);
                    }}
                  >
                    {column} {/* Only render sort icon for sortable columns */}
                    {sortableColumns.includes(column) && renderSortIcon(column)}
                    {/* Code below renders dropdown menus for the Moneda Cuota, Risk & Fund Type columns*/}
                    {/* Dropdowns are rendered when showXDropdown is set to true, which happens onMouseEnter the <th> element */}
                    {column === "Moneda Cuota" && showCurrencyDropdown && (
                      <div className="table-dropdown-filter table-currency-dropdown">
                        {uniqueCurrencies.map((currency) => (
                          <div
                            key={currency}
                            className="table-dropdown-option"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCurrencySelect(currency);
                            }}
                          >
                            {currency}
                          </div>
                        ))}
                      </div>
                    )}
                    {column === "Risk" && showRiskDropdown && (
                      <div className="table-dropdown-filter">
                        {uniqueRisks.map((risk) => (
                          <div
                            key={risk}
                            className="table-dropdown-option"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRiskSelect(risk);
                            }}
                          >
                            {risk}
                          </div>
                        ))}
                      </div>
                    )}
                    {column === "Categoria" && showCategoriaDropdown && (
                      <div className="table-dropdown-filter">
                        {uniqueCategorias.map((categoria) => (
                          <div
                            key={categoria}
                            className="table-dropdown-option"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCategoriaSelect(categoria);
                            }}
                          >
                            {categoria}
                          </div>
                        ))}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className={isSorting ? "sorting" : ""}>
              {displayData.map((item, index) => {
                const path = `/fund/${item["Fund id"]}`;
                return (
                  <tr
                    key={index}
                    onClick={() => navigate(path)}
                    style={{ cursor: "pointer" }}
                  >
                    {columnsToDisplay.map((column) => (
                      <td
                        key={column}
                        className={`
                        ${
                          column === "Risk"
                            ? getRiskColor(item[column] as string | null)
                            : ""
                        }
                        ${
                          typeof item[column] === "number"
                            ? getColor(column, item[column] as number | null)
                            : ""
                        }
                      `}
                      >
                        {percentageColumns.includes(column)
                          ? `${formatPercentage(
                              item[column] as number | null
                            )}%`
                          : column === "Sharpe Ratio"
                          ? formatDecimal(item[column] as number | null)
                          : item[column] !== null
                          ? item[column]
                          : "N/A"}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {showAdminPopup && (
        <AdminPopup
          administrators={uniqueAdministrators}
          onSelect={handleAdminSelect}
          onClose={() => setShowAdminPopup(false)}
        />
      )}
    </>
  );
}

export default FondosMutuosTable;
