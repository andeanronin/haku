import { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import fondosData from "./assets/fondos-mutuos-data-4.json";
import SideBar from "./sideBar";

// Define the data structure & tyes of a fund object
type Fund = {
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
  "A\u00f1os": number | null;
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
  Logo?: string;
  [key: string]: string | number | null | undefined; // Index signature for dynamic access
};

function Navbar({ show = true }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Fund[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      const results = fondosData.filter((fund) =>
        Object.values(fund).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setSearchResults(results.slice(0, 15)); // Limit to 8 results for better performance
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  if (!show) return null;

  const formatCAGR = (decimal: number | null) => {
    if (decimal === null) {
      return "N/A";
    } else {
      return (decimal * 100).toFixed(2);
    }
  };

  return (
    <>
      <nav className="mainHeader">
        <div className="mainHeader-container">
          <img
            onClick={() => setShowSideBar(true)}
            src="/logoHaku2.png"
            id="logoHaku"
            alt="HakuLogo"
          ></img>
          <p onClick={() => navigate("/")} id="navBar-hakuName">
            Haku
          </p>
          <div className="search-container">
            <input
              type="text"
              placeholder="Busca Fondos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
            {showResults && searchResults.length > 0 && (
              <ul className="search-results">
                {searchResults.map((fund, index) => {
                  const fundLogo = fund["Logo"];
                  return (
                    <li
                      key={index}
                      onClick={() => navigate(`/fund/${fund["Fund id"]}`)}
                    >
                      <img
                        src={fundLogo}
                        className="navbar-logo"
                        alt="Fund Logo"
                      ></img>

                      <div className="Navbar-search-item">
                        <span className="Navbar-fund-name">
                          {fund["Fondo Mutuo"]}
                        </span>
                        <span className="Navbar-fund-descriptor">
                          {fund["Categoria"]} {formatCAGR(fund["CAGR"])}%
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <div className="mainHeader-subcontainer">
            <p
              onClick={() => navigate("/fondos-mutuos")}
              className="navbar-text"
            >
              Fondos Mutuos
            </p>
            <p id="navBar-asesorate">Asesórate</p>
          </div>
        </div>
      </nav>
      {showSideBar && <SideBar onClose={() => setShowSideBar(false)} />}
    </>
  );
}

export default Navbar;
