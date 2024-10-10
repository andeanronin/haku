import { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import fondosData from "./mutualFunds/data/fondos-mutuos-data-4.json";
import NavDropDown from "./navDropDown.tsx";
import { MutualFundData } from "./types/mutualFundTypes";

function Navbar({ show = true }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<MutualFundData[]>([]);
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
            HAKU
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
            <p id="navBar-singUp">Sign-Up</p>
          </div>
          {showSideBar && <NavDropDown onClose={() => setShowSideBar(false)} />}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
