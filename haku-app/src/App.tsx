// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./landingPage";
// Mutual Funds
import FundPage from "./fundPage";
import fundData from "./assets/fondos-mutuos-data-4.json";
import FundList from "./fondosMutuosSquares";
import FondosMutuosTable from "./fondosMutuosTable";
import FondosMutuos from "./fondosMutuos";
import FondosInversion from "./fondosInversion";
// ETFS
import EtfFunds from "./etfs/etfs.tsx";
import EtfPage from "./etfs/EtfPage.tsx";
import EtfProfiles from "./etfs/etfPrototyping/sample-etf-profiles.json"; // etf data for etf page component
import EtfMonthlyValues from "./etfs/etfPrototyping/sample-monthly-values.json";

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
