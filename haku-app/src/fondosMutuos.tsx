// Fondos Mutuos Table & Square View
import { useState } from "react";
import Navbar from "./Navbar";
import "./fondosMutuos.css";
import FooterComponent from "./footerComp";
import FondosMutuosTable from "./fondosMutuosTable";
import mutualFundData from "./assets/fondos-mutuos-data-3.json";
import FondosMutuosList from "./fondosMutuosSquares";
import { Rows4, LayoutGrid } from "lucide-react";

function FondosMutuos() {
  const [showTable, setShowTable] = useState(true);
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
          <FondosMutuosTable data={mutualFundData} />
        ) : (
          <FondosMutuosList />
        )}
      </div>
      <FooterComponent />
    </>
  );
}

export default FondosMutuos;
