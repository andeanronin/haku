// ETF Funds
import "./etfs.css";
import Navbar from "../Navbar";
import FooterComponent from "../footerComp";
import { AllEtfData } from "../types/etfTypes";
import { Rows4, LayoutGrid } from "lucide-react";
import EtfCards from "./etfCardsView";
import { useState } from "react";
import EtfTable from "./etfTable";

function EtfFunds({ etfProfiles, etfMonthlyValues }: AllEtfData) {
  const [showTable, setShowTable] = useState(false);

  return (
    <>
      <Navbar />

      {/* ETF Section Heading */}
      <div id="etfSection-heading">
        <Rows4
          onClick={() => setShowTable(true)}
          className="fondosMutuos-toggle-icons"
        />
        <LayoutGrid
          onClick={() => setShowTable(false)}
          className="fondosMutuos-toggle-icons"
        />
        <h2>Explora Etfs</h2>
      </div>

      {/* Table & Cards Components */}
      {showTable ? (
        <EtfTable
          etfProfiles={etfProfiles}
          etfMonthlyValues={etfMonthlyValues}
        />
      ) : (
        <EtfCards
          etfProfiles={etfProfiles}
          etfMonthlyValues={etfMonthlyValues}
        />
      )}

      <FooterComponent />
    </>
  );
}

export default EtfFunds;
