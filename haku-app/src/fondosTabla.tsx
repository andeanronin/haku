/* 
This component creates an interactive table containing fund data 
Each fund corresponds to a row in the table.
The table has additional features, like filtering by fund type, administrator, currency, return and fund size.
*/
import importedData from "./assets/fondos-mutuos-whole.json";
import { useState, useEffect, useMemo } from "react";
import "./fondosTabla.css";
import SearchButton from "./searchButton";
import AdminPopup from "./adminPopup";
import FooterComponent from "./footerComp";
import { useNavigate } from "react-router-dom";
import FundList from "./FundDirectory";
import Navbar from "./Navbar";

interface FondoMutuo {
  "Tipo Fondo": string;
  "Fondo Mutuo": string;
  Administradora: string;
  "Fec. Inicio Operación": string;
  "Moneda Cuota": string;
  "Valor Cuota": number | null;
  "Rentabilidad al 2024": number | null;
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
  [key: string]: string | number | null; // Index signature for dynamic access
}

function TablaFondos() {
  const years = [
    2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
  ];

  const navigate = useNavigate();

  const uniqueCurrencies = ["$", "S/."];

  const [data, setData] = useState<FondoMutuo[]>(importedData as FondoMutuo[]); // data contains the array of objects (fund data) that is renderd in the table while setData ponts to the copy of the origninal array that has been sorted.
  const [sortColumn, setSortColumn] = useState<keyof FondoMutuo | null>(null); // sort column is used to store the key name of the column that is currently being sorted.
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc"); // sort direction is used to store the direction of the current sort
  const [isSorting, setIsSorting] = useState(false); // used to apply dynamic CSS styles when sorting
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<string | null>(null);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [showFundTypeMenu, setShowFundTypeMenu] = useState(false);
  const [selectedFundType, setSelectedFundType] = useState<string | null>(null);

  const getColor = (value: number | null) => {
    /*
    Input: the value of a fund's annual return data point 
    Output: a string - 'positive' or 'negative', to set the class of the <td> element. 
    */
    if (value === null) {
      return undefined;
    }
    return value >= 0 ? "positive" : "negative";
  };

  // SORT: ANNUALIZED RETURN / PATRIMONIO / PARTICIPES
  const sortData = (column: keyof FondoMutuo) => {
    // Function to sort data by a column's annualized return by sorting the objects within the array
    setIsSorting(true);
    const sortedData = [...data].sort((a, b) => {
      if (a[column] === null && b[column] === null) return 0;
      if (a[column] === null) return 1;
      if (b[column] === null) return -1;
      if (a[column]! < b[column]!) return sortDirection === "asc" ? -1 : 1;
      if (a[column]! > b[column]!) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    // Use setTimeout to allow the sorting class to be applied before we update the data
    setTimeout(() => {
      setData(sortedData);
      setSortColumn(column);
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      setIsSorting(false); // Set sorting to false when we're done
    }, 200); // 300ms delay, adjust as needed
  };

  useEffect(() => {
    setData(importedData as FondoMutuo[]);
  }, []);

  const renderSortIcon = (column: keyof FondoMutuo) => {
    /* 
    The Icons are only rendered for the column that is currently clicked.
    Only when sortColumn === column (current column being rendered) are the Sort Icons rendered.
    */
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? "▲" : "▼";
  };

  // FILTER TABLE CONTROL FOR ADMINISTRATOR & CURRENCY & FUND TYPE
  useEffect(() => {
    // Filter data based on selected currency, administrator, and fund type
    const filteredData = importedData.filter((item) => {
      const adminMatch =
        !selectedAdmin || item.Administradora === selectedAdmin;
      const currencyMatch =
        !selectedCurrency || item["Moneda Cuota"] === selectedCurrency;
      const fundTypeMatch =
        !selectedFundType || item["Tipo Fondo"] === selectedFundType;

      return adminMatch && currencyMatch && fundTypeMatch;
    });

    setData(filteredData);
  }, [selectedAdmin, selectedCurrency, selectedFundType]);

  // FUND ADMIN COLUMN FILTER
  const uniqueAdministrators = useMemo(() => {
    // Returns an array of unique administrator names.
    const adminSet = new Set(importedData.map((item) => item.Administradora)); // iterates through all the fund objects, and only returns the value for the admin name keys.
    return Array.from(adminSet);
  }, []);

  const handleAdminSelect = (admin: string) => {
    // runs when admin's li element is clicked in the admin popup   (note: function passed down as prop to popup component.)
    setSelectedAdmin(admin); // updates State Variable selectedAdmin
    setShowAdminPopup(false); // hides popup when an administrator is clicked
  };

  const resetAdminFilter = () => {
    // function runs onClick for clear button -> selectedAdmin = null -> re-renders component without the admin popup.
    setSelectedAdmin(null);
  };

  // CURRENCY COLUMN FILTER
  const handleCurrencySelect = (currency: string) => {
    // Callback function runs when user selects a currency from dropdown menu
    setSelectedCurrency(currency);
    setShowCurrencyDropdown(false);
  };

  const resetCurrencyFilter = () => {
    setSelectedCurrency(null);
  };

  // FUND TYPE COLUMN FILTER
  const uniqueFundTypes = useMemo(() => {
    // Return an array of unique fund type names.
    const fundTypeSet = new Set(importedData.map((item) => item["Tipo Fondo"])); // iterates through all the fund objects, and only returns the value for the admin name keys.
    return Array.from(fundTypeSet);
  }, []);

  const handleFundTypeSelect = (fundType: string) => {
    setSelectedFundType(fundType);
    setShowFundTypeMenu(false);
  };

  const resetFundTypeFilter = () => {
    setSelectedFundType(null);
  };

  return (
    <>
      <Navbar />
      <div className="fondos-mutuos-table-page-container">
        <div className="fondos-mutuos-header">
          <div className="fondos-mutuos-header-main">
            <SearchButton />
            <p className="fondos-mutuos-heading">
              Busca todos los fondos mutuos disponibles en Peru
            </p>
          </div>
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
          </div>
        </div>

        <div className="table-container">
          <table className="fondosMutuosTable">
            <thead>
              <tr>
                <th>
                  <div id="fondoMutuoColumn">Fondo Mutuo</div>
                </th>
                <th
                  onClick={() => setShowFundTypeMenu(true)}
                  style={{ cursor: "pointer" }}
                >
                  Tipo de Fondo
                </th>
                <th
                  onClick={() => setShowAdminPopup(true)}
                  style={{ cursor: "pointer" }}
                >
                  Gestor {selectedAdmin ? "▼" : "▲"}
                </th>
                <th>Inicio Operación</th>
                <th
                  onMouseEnter={() => setShowCurrencyDropdown(true)}
                  onMouseLeave={() => setShowCurrencyDropdown(false)}
                  style={{ cursor: "pointer", position: "relative" }}
                >
                  Moneda {selectedCurrency ? "▼" : "▲"}
                  {showCurrencyDropdown && (
                    <div className="currency-dropdown">
                      {uniqueCurrencies.map((currency) => (
                        <div
                          key={currency}
                          onClick={() => handleCurrencySelect(currency)}
                          className="currency-option"
                        >
                          {currency}
                        </div>
                      ))}
                    </div>
                  )}
                </th>
                <th>Valor Cuota</th>
                {years.map((year) => (
                  <th
                    key={year}
                    onClick={() =>
                      sortData(
                        `Rentabilidad ${year === 2024 ? `al 2024` : year}`
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    Rentabilidad {year === 2024 ? `al 2024` : year}{" "}
                    {renderSortIcon(
                      `Rentabilidad ${year === 2024 ? "al 2024" : year}`
                    )}
                  </th>
                ))}

                <th
                  onClick={() => sortData("Patrimonio S/.")}
                  style={{ cursor: "pointer" }}
                >
                  Patrimonio S/.{" "}
                  {renderSortIcon("Patrimonio S/." as keyof FondoMutuo)}
                </th>

                <th
                  onClick={() => sortData("Partícipes N")}
                  style={{ cursor: "pointer" }}
                >
                  Partícipes N{" "}
                  {renderSortIcon("Partícipes N" as keyof FondoMutuo)}
                </th>
              </tr>
            </thead>

            <tbody className={isSorting ? "sorting" : ""}>
              {data.map((item, index) => {
                const path = `/fund/${item["Fondo Mutuo"].replace(
                  /\s+/g,
                  "-"
                )}`;

                return (
                  <tr
                    key={index}
                    onClick={() => navigate(path)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{item["Fondo Mutuo"]}</td>
                    <td>{item["Tipo Fondo"]}</td>
                    <td>{item["Administradora"]}</td>
                    <td>{item["Fec. Inicio Operación"]}</td>
                    <td>{item["Moneda Cuota"]}</td>
                    <td>{item["Valor Cuota"] ?? "N/A"}</td>
                    {years.map((year) => {
                      const key = `Rentabilidad ${
                        year === 2024 ? "al 2024" : year
                      }` as keyof FondoMutuo;
                      return (
                        <td
                          key={year}
                          className={getColor(item[key] as number | null)}
                        >
                          {item[key]}
                        </td>
                      );
                    })}
                    <td>{item["Patrimonio S/."] ?? "N/A"}</td>
                    <td>{item["Partícipes N"] ?? "N/A"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <FundList showHeader={false} showFooter={false} />

      {showAdminPopup && (
        <AdminPopup
          administrators={uniqueAdministrators}
          onSelect={handleAdminSelect} // function passed as prop to component
          onClose={() => setShowAdminPopup(false)}
        />
      )}

      {showFundTypeMenu && (
        <AdminPopup
          administrators={uniqueFundTypes}
          onSelect={handleFundTypeSelect}
          onClose={() => setShowFundTypeMenu(false)}
        />
      )}

      <FooterComponent />
    </>
  );
}

export default TablaFondos;
