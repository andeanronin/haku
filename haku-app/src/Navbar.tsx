import { useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import fondosData from "./assets/fondos-mutuos-data-3.json";

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
  [key: string]: string | number | null; // Index signature for dynamic access
};

function Navbar({ show = true }) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Fund[]>([]);

  useEffect(() => {
    if (searchTerm) {
      const results = fondosData.filter((fund) =>
        Object.values(fund).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setSearchResults(results.slice(0, 8)); // Limit to 8 results for better performance
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  if (!show) return null;

  return (
    <nav className="mainHeader">
      <div className="mainHeader-container">
        <p onClick={() => navigate("/")}>Haku</p>
        <div className="search-container">
          <input
            type="text"
            placeholder="Busca Fondos"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchResults.length > 0 && (
            <ul className="search-results">
              {searchResults.map((fund, index) => (
                <li
                  key={index}
                  onClick={() => navigate(`/fund/${fund["Fund id"]}`)}
                >
                  {fund["Fondo Mutuo"]} - {fund["Administradora"]} -{" "}
                  {fund["Categoria"]}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mainHeader-subcontainer">
          <p onClick={() => navigate("/explora-fondos")}>Fondos Mutuos</p>
          <p>Asesórate</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
