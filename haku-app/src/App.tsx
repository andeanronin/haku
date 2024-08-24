// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import TablaFondos from "./fondosTabla";
import LandingPage from "./landingPage";
import FundPage from "./fundPage";
import fundData from "./assets/fondos-mutuos-data-3.json";
import FundList from "./FundDirectory";
import FondosMutuosTable from "./fondosMutuosTable";

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
          <Route path="/fondos-mutuos" element={<TablaFondos />} />
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
          <Route path="/explora-fondos" element={<FundList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
