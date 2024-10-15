/* 
This component renders all of the mutual fund data in visually appealing boxes for each Fund.
The user can scroll this page to explore mutual funds. 
*/

import fundData from "./data/fondos-mutuos-data-4.json";
import "./fondosMutuosSquares.css";
import { useState, useEffect, useMemo } from "react";
import AdminPopup from "./adminPopup";
import FondoMutuoCard from "./fondoMutuoCard";

function FundList() {
  const [data, setData] = useState(fundData);

  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showFundTypeDropdown, setShowFundTypeDropdown] = useState(false);
  const [showFundAdminPopUp, setshowFundAdminPopUp] = useState(false);
  const [showRiskDropdown, setShowRiskDropdown] = useState(false);

  const [selectedAdmin, setSelectedAdmin] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [selectedFundType, setSelectedFundType] = useState<string | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);

  // useMemo improves performance by caching the result and only recomputing it if the dependencies change, only when empty array [] changes (mounts) the code is recomputed
  // useMemo also prevents unecessary re-renders when fundData changes, but unique categories dont
  const uniqueFundTypes = useMemo(() => {
    // Return an array of unique fund type names.
    const fundTypeSet = new Set(fundData.map((fund) => fund.Categoria)); // iterates through all the fund objects, and only returns the value for the admin name keys.
    return Array.from(fundTypeSet);
  }, []);

  // Array of fund administrators (unique values)
  const uniqueFundAdmins = useMemo(() => {
    const uniqueFundAdminSet = new Set(
      fundData.map((item) => item.Administradora)
    );
    return Array.from(uniqueFundAdminSet);
  }, []);

  // Risk Types
  const uniqueRiskTypes2 = [
    "Low",
    "Medium Low",
    "Medium",
    "Medium High",
    "High",
  ];

  // HANDLE FILTER SELECTS
  const handleAdminSelect = (admin: string) => {
    // runs when admin's li element is clicked in the admin popup   (note: function passed down as prop to popup component.)
    setSelectedAdmin(admin); // updates State Variable selectedAdmin
    setshowFundAdminPopUp(false); // hides popup when an administrator is clicked
  };

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    setShowCurrencyDropdown(false);
  };

  const handleFundTypeSelect = (fundType: string) => {
    setSelectedFundType(fundType);
  };

  const handleRiskSelect = (riskType: string) => {
    setSelectedRisk(riskType);
  };

  // RESET FILTERS
  const resetAdminFilter = () => {
    // function runs onClick for clear button -> selectedAdmin = null -> re-renders component without the admin popup.
    setSelectedAdmin(null);
  };

  const resetCurrencyFilter = () => {
    setSelectedCurrency(null);
  };

  const resetFundTypeFilter = () => {
    setSelectedFundType(null);
  };

  const resetRiskFilter = () => {
    setSelectedRisk(null);
  };

  // FILTERED DATA CONTROL FOR ADMINISTRATOR & CURRENCY & FUND TYPE
  useEffect(() => {
    // Filter data based on selected currency, administrator, and fund type
    const filteredData = fundData.filter((item) => {
      const adminMatch =
        !selectedAdmin || item.Administradora === selectedAdmin;
      const currencyMatch =
        !selectedCurrency || item["Moneda Cuota"] === selectedCurrency;
      const fundTypeMatch =
        !selectedFundType || item["Categoria"] === selectedFundType;
      const riskMatch = !selectedRisk || item["Risk"] === selectedRisk;

      return adminMatch && currencyMatch && fundTypeMatch && riskMatch;
    });
    setData(filteredData);
  }, [selectedAdmin, selectedCurrency, selectedFundType, selectedRisk]);

  return (
    <>
      <div className="fundDirectoryContainer">
        {/* Container for FILTERS  */}
        <div className="filtrosContainer">
          <p>Filtra Por: </p>

          <div id="filtrosContainer-subcontainer">
            {/* Filtro Gestor */}
            <p
              onClick={() => setshowFundAdminPopUp(true)}
              style={{ cursor: "pointer" }}
            >
              Gestor
            </p>

            {/* Filtro Tipo de Fondo */}
            <p
              onMouseEnter={() => setShowFundTypeDropdown(true)}
              onMouseLeave={() => setShowFundTypeDropdown(false)}
              style={{ cursor: "pointer" }}
            >
              Tipo de Fondo
              {showFundTypeDropdown && (
                <div className="dropdown-filter">
                  {uniqueFundTypes.map((item) => (
                    <div
                      key={item}
                      className="dropdown-option"
                      onClick={() => handleFundTypeSelect(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </p>

            {/* Filtro Moneda */}
            <p
              onMouseEnter={() => setShowCurrencyDropdown(true)}
              onMouseLeave={() => setShowCurrencyDropdown(false)}
              style={{ cursor: "pointer" }}
            >
              Moneda
              {showCurrencyDropdown && (
                <div className="dropdown-filter">
                  <div
                    onClick={() => handleCurrencySelect("$")}
                    className="dropdown-option"
                  >
                    $
                  </div>
                  <div
                    onClick={() => handleCurrencySelect("S/.")}
                    className="dropdown-option"
                  >
                    S/.
                  </div>
                </div>
              )}
            </p>

            {/* Filtro Nivel de Riesgo */}
            <p
              onMouseEnter={() => setShowRiskDropdown(true)}
              onMouseLeave={() => setShowRiskDropdown(false)}
              style={{ cursor: "pointer" }}
            >
              Riesgo
              {showRiskDropdown && (
                <div className="dropdown-filter">
                  {uniqueRiskTypes2.map((type) => (
                    <div
                      key={type}
                      className="dropdown-option"
                      onClick={() => handleRiskSelect(type)}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </p>
          </div>
        </div>

        {/* Container for CLEARING FILTERS  */}
        <div className="filters-container">
          {selectedAdmin && (
            <div className="fund-filter-reset">
              <button onClick={resetAdminFilter}>Clear</button>
              <p>Fondos de: {selectedAdmin}</p>
            </div>
          )}
          {selectedCurrency && (
            <div className="fund-filter-reset">
              <button onClick={resetCurrencyFilter}>Clear</button>
              <p>Currency: {selectedCurrency}</p>
            </div>
          )}
          {selectedFundType && (
            <div className="fund-filter-reset">
              <button onClick={resetFundTypeFilter}>Clear</button>
              <p>Fund Type: {selectedFundType}</p>
            </div>
          )}
          {selectedRisk && (
            <div className="fund-filter-reset">
              <button onClick={resetRiskFilter}>Clear</button>{" "}
              {/*CHECK onClick should call callback function not function directly */}
              <p>Risk: {selectedRisk}</p>
            </div>
          )}
        </div>

        {/* Container with all Mutual Fund CARDS  */}
        <div className="fundExploreContainer">
          {data.map((fund) => {
            const path = `/fund/${fund["Fund id"]}`;
            return <FondoMutuoCard path={path} fund={fund} />;
          })}
        </div>
      </div>

      {/* POPUP for fund administrator filter */}
      {showFundAdminPopUp && (
        <AdminPopup
          administrators={uniqueFundAdmins}
          onSelect={handleAdminSelect} // function passed as prop to component
          onClose={() => setshowFundAdminPopUp(false)}
        />
      )}
    </>
  );
}

export default FundList;
