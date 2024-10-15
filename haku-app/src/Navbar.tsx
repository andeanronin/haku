import { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import fondosData from "./mutualFunds/data/fondos-mutuos-data-4.json";
import etfData from "./etfs/data/etfs-profiles.json";
import NavDropDown from "./navDropDown.tsx";
import { MutualFundData } from "./types/mutualFundTypes";

interface ETFData {
  name: string;
  logo: string;
  gestor: string;
  ticker: string;
  [key: string]: any;
}

type SearchResult = MutualFundData | ETFData;

function Navbar({ show = true }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    // if the user writes in the SearchBar, there IS a searchTerm
    if (searchTerm) {
      const mutualFundResults = fondosData.filter((fund) =>
        Object.values(fund).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      const etfResults = Object.entries(etfData)
        .filter(
          ([ticker, etf]) =>
            etf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            etf.gestor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticker.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(([ticker, etf]) => ({ ...etf, ticker }));

      console.log(etfResults);

      setSearchResults([...mutualFundResults, ...etfResults].slice(0, 15)); // search results is a merged array of the filtered mutual & etf funds
    } else {
      setSearchResults([]); // if there is no searchTerm (user hasn't searched), searchResults is set to empty array
    }
  }, [searchTerm]); // useEffect re-runs whenever searchTerm changes (whenever the user changes their search)

  if (!show) return null;

  const formatCAGR = (decimal: number | null) => {
    if (decimal === null) {
      return "N/A";
    } else {
      return (decimal * 100).toFixed(2);
    }
  };

  const renderSearchResult = (result: SearchResult, index: number) => {
    if ("Fondo Mutuo" in result) {
      // It's a mutual fund
      const mutualFund = result as MutualFundData;
      return (
        <li
          key={index}
          onClick={() => navigate(`/fund/${mutualFund["Fund id"]}`)}
        >
          <img
            src={mutualFund["Logo"]}
            className="navbar-logo"
            alt="Fund Logo"
          />
          <div className="Navbar-search-item">
            <span className="Navbar-fund-name">
              {mutualFund["Fondo Mutuo"]}
            </span>
            <span className="Navbar-fund-descriptor">
              {mutualFund["Categoria"]} {formatCAGR(mutualFund["CAGR"])}%
            </span>
          </div>
        </li>
      );
    } else {
      // It's an ETF
      const etf = result as ETFData;
      return (
        <li key={index} onClick={() => navigate(`/etf/${etf.ticker}`)}>
          <img
            src={`/logosGestoresEtfs/${etf.logo}`}
            className="navbar-logo"
            alt="ETF Logo"
          />
          <div className="Navbar-search-item">
            <span className="Navbar-fund-name">{etf.name}</span>
            <span className="Navbar-fund-descriptor">
              ETF - Ticker: {etf.ticker}
            </span>
          </div>
        </li>
      );
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
          />
          <p onClick={() => navigate("/")} id="navBar-hakuName">
            HAKU
          </p>
          <div className="search-container">
            <input
              type="text"
              placeholder="Busca Fondos"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // event listener --> listents to user writing in search bar, sets the searchTerm variable to whatever the user writes
              onFocus={() => setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
            />
            {showResults && searchResults.length > 0 && (
              <ul className="search-results">
                {searchResults.map((result, index) =>
                  renderSearchResult(result, index)
                )}
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
