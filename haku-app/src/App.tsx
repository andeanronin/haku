// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./landingPage";
import About from "./About.tsx";
import SideBar from "./sideBar.tsx";

// Mutual Funds
import FundPage from "./mutualFunds/fundPage.tsx";
import fundData from "./mutualFunds/data/fondos-mutuos-data-oct24.json";
import FundList from "./mutualFunds/fondosMutuosSquares.tsx";
import FondosMutuosTable from "./mutualFunds/fondosMutuosTable";
import FondosMutuos from "./mutualFunds/fondosMutuos.tsx";

// Fondos Inversion
import FondosInversion from "./fondosInversion/fondosInversion.tsx";

// ETFS
import EtfFunds from "./etfs/etfs.tsx"; // main etf directory
import EtfPage from "./etfs/EtfPage.tsx"; // etf page component
import EtfProfilesData from "./etfs/data/etfs-profiles.json"; // etf profile data for etf page component
import EtfMonthlyValuesData from "./etfs/data/etfs-monthly-values-final.json"; // etf monthly values

// Import types for etf data
import { EtfProfiles, AllEtfMonthlyValues } from "./types/etfTypes.ts";

// Store imported data into variables with explicit types (for type security)
const typedEtfProfilesData: EtfProfiles = EtfProfilesData;
const allEtfMonthlyValues: AllEtfMonthlyValues =
  EtfMonthlyValuesData as AllEtfMonthlyValues;

const etfTickers = Object.keys(typedEtfProfilesData);

// GESTORES SECTION
import GestoresPage from "./gestores/gestores.tsx";
import GestorPage from "./gestores/gestorPage.tsx";
import { AdminType } from "./types/gestoresTypes.ts";

// Array of fund administrators (unique values)
const mutualFundAdmins: Set<AdminType> = new Set(
  fundData.map((item) => item.Administradora)
);

// Set of etf administrators (unique values)
let etfAdmins: Set<AdminType> = new Set();
for (const etf in typedEtfProfilesData) {
  const gestor = typedEtfProfilesData[etf]["gestor"];
  etfAdmins.add(gestor);
}

// Merge Sets
const mergedAdminList: Set<AdminType> = new Set([
  ...etfAdmins,
  ...mutualFundAdmins,
]);
const mergedAdminArray: AdminType[] = Array.from(mergedAdminList);

// Bonos
import BondTable from "./bonds/bondsTable.tsx";

// Rankings Page
import RankingsPage from "./rankings/rankingsPage.tsx";

// Render App
function App() {
  return (
    <Router>
      <div className="app-container">
        <SideBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="bonos-peruanos" element={<BondTable />} />
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
          <Route
            path="/etf"
            element={
              <EtfFunds
                etfProfiles={typedEtfProfilesData}
                etfMonthlyValues={allEtfMonthlyValues}
              />
            }
          />
          {etfTickers.map((ticker) => {
            const path = `/etf/${ticker}`;
            return (
              <Route
                key={path}
                path={path}
                element={
                  <EtfPage
                    etfData={typedEtfProfilesData[ticker]}
                    etfMonthlyValues={allEtfMonthlyValues[ticker]}
                  />
                }
              />
            );
          })}
          <Route path="/fondos-de-inversion" element={<FondosInversion />} />
          <Route path="/About" element={<About />} />
          <Route path="/Rankings" element={<RankingsPage />} />
          <Route
            path="/gestores"
            element={<GestoresPage adminList={mergedAdminArray} />}
          />
          {mergedAdminArray.map((gestor) => {
            const path = `/gestores/${gestor}`;
            return (
              <Route
                path={path}
                element={<GestorPage nombreGestor={gestor} />}
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
