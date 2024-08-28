// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./landingPage";
import FundPage from "./fundPage";
import fundData from "./assets/fondos-mutuos-data-4.json";
import FundList from "./fondosMutuosSquares";
import FondosMutuosTable from "./fondosMutuosTable";
import FondosMutuos from "./fondosMutuos";

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
