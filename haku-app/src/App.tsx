// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./landingPage";

// Mutual Funds
import FundPage from "./mutualFunds/fundPage.tsx";
import fundData from "./mutualFunds/data/fondos-mutuos-data-4.json";
import FundList from "./mutualFunds/fondosMutuosSquares.tsx";
import FondosMutuosTable from "./mutualFunds/fondosMutuosTable";
import FondosMutuos from "./mutualFunds/fondosMutuos.tsx";

// Fondos Inversion
import FondosInversion from "./fondosInversion/fondosInversion.tsx";

// ETFS
import EtfFunds from "./etfs/etfs.tsx"; // main etf directory
import EtfPage from "./etfs/EtfPage.tsx"; // etf page component
import EtfProfiles from "./etfs/etfPrototyping/ten-etf-profiles.json"; // etf profile data for etf page component
import EtfMonthlyValues from "./etfs/etfPrototyping/ten-monthly-values-final.json"; // etf monthly values

const etfTickers = Object.keys(EtfProfiles);

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="fondos-mutuos-table"
            element={<FondosMutuosTable data={fundData} />}
          />
          <Route path="/fondos-mutuos-list" element={<FundList />} />
          <Route path="/fondos-mutuos" element={<FondosMutuos />} />
          {fundData.map((fund) => {
            const path = `/fund/${fund["Fund id"]}`;
            return (
              <Route
                key={path}
                path={path}
                element={<FundPage fundData={fund} />}
              />
            );
          })}
          <Route path="/etf" element={<EtfFunds />} />
          {etfTickers.map((ticker) => {
            const path = `/etf/${ticker}`;
            return (
              <Route
                key={path}
                path={path}
                element={
                  <EtfPage
                    etfData={EtfProfiles[ticker]}
                    etfMonthlyValues={EtfMonthlyValues[ticker]}
                  />
                }
              />
            );
          })}
          <Route path="/fondos-de-inversion" element={<FondosInversion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
