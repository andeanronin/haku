/* 
  This component renders the funds (in Card view) of each Fund Administrator 
  With this view, the user can see all of the fund under an Admin's management. 
  The user can then navigate to each fund for further details.
*/

import Navbar from "../Navbar";
import FooterComponent from "../footerComp";
import "./gestorPage.css";

// Import data
import mutualFundData from "../mutualFunds/data/fondos-mutuos-data-oct24.json";
import etfProfiles from "../etfs/data/etfs-profiles.json";
import etfMonthlyValues from "../etfs/data/etfs-monthly-values-final.json";

// Import Card components
import EtfCard from "../etfs/etfCard";
import FondoMutuoCard from "../mutualFunds/fondoMutuoCard";
import { GestorPageProps } from "../types/gestoresTypes";
import { EtfProfiles, AllEtfMonthlyValues } from "../types/etfTypes.ts";

const typedEtfProfiles: EtfProfiles = etfProfiles;
const typedEtfMonthlyValues: AllEtfMonthlyValues =
  etfMonthlyValues as AllEtfMonthlyValues;

function GestorPage({ nombreGestor }: GestorPageProps) {
  const etfTickers = Object.keys(etfProfiles);

  const matchedEtfTickers = etfTickers.filter(
    (ticker) => typedEtfProfiles[ticker]["gestor"] == nombreGestor
  );

  const matchedMutualFunds = mutualFundData.filter(
    (mutualFund) => mutualFund["Administradora"] == nombreGestor
  );

  return (
    <>
      <Navbar />
      <div id="gestorPage-container">
        <h2 style={{ color: "white" }}>Fondos de {nombreGestor}</h2>
        <div className="etfCards-container">
          {matchedEtfTickers.map((etfTicker) => {
            const path = `/etf/${etfTicker}`;
            return (
              <EtfCard
                etfProfiles={etfProfiles}
                etfMonthlyValues={typedEtfMonthlyValues}
                etfTicker={etfTicker}
                path={path}
              />
            );
          })}
        </div>
        {/* Container with all Mutual Fund CARDS  */}
        <div className="fundExploreContainer">
          {matchedMutualFunds.map((fund) => {
            const path = `/fund/${fund["Fund id"]}`;
            return <FondoMutuoCard path={path} fund={fund} />;
          })}
        </div>
      </div>
      <FooterComponent />
    </>
  );
}

export default GestorPage;
