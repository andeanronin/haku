// This component renders the Fondos Mutuos Page with Table & Square views
import Navbar from "../Navbar";
import FooterComponent from "../footerComp";
import "./fondosMutuos.css";

// Import fondos mutuos table & list Components
import FondosMutuosTable from "./fondosMutuosTable";
import FondosMutuosList from "./fondosMutuosSquares";

// Imports Mutual Fund Data
import mutualFundData from "./data/fondos-mutuos-data-oct24.json";
import { useState } from "react";
import { Rows4, LayoutGrid } from "lucide-react";

function FondosMutuos() {
  const [showTable, setShowTable] = useState(false);
  return (
    <>
      <Navbar />
      <div id="fondosMutuos-container">
        <div id="fondosMutuos-heading">
          <div id="fondosMutuos-heading-controls">
            <Rows4
              onClick={() => setShowTable(true)}
              className="fondosMutuos-toggle-icons"
            />
            <LayoutGrid
              onClick={() => setShowTable(false)}
              className="fondosMutuos-toggle-icons"
            />
          </div>
          <h2>Explora Fondos Mutuos</h2>
        </div>
        {showTable ? (
          <div className="fondosMutuos-table-alt-container">
            <FondosMutuosTable data={mutualFundData} />
          </div>
        ) : (
          <FondosMutuosList />
        )}
      </div>
      <FooterComponent />
    </>
  );
}

export default FondosMutuos;
