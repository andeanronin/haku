/* 
This component renders all of the mutual fund data in visually appealing boxes for each Fund.
The user can scroll this page to explore mutual funds. 
*/

import fundData from "./assets/fondos-mutuos-whole.json";
import "./FundDirectory.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import FooterComponent from "./footerComp";

function FundList({ showHeader = true, showFooter = true }) {
  const navigate = useNavigate();

  const getColor = (value: number | null) => {
    /*
    Input: the value of a fund's annual return data point 
    Output: a string - 'positive' or 'negative', to set the class of the <td> element. 
    */
    if (value === null) {
      return undefined;
    }
    return value >= 0 ? "positive" : "negative";
  };

  return (
    <>
      <Navbar show={showHeader} />
      <div className="fundDirectoryContainer">
        <h2>Explora Fondos</h2>

        <div className="filtrosContainer">
          <p>Filtra Por: </p>
          <p>Gestor</p>
          <p>Tipo de Fondo</p>
          <p>Moneda</p>
        </div>

        <div className="fundExploreContainer">
          {fundData.map((fund) => {
            const path = `/fund/${fund["Fondo Mutuo"].replace(/\s+/g, "-")}`;
            return (
              <div
                className="fundSquare"
                key={path}
                onClick={() => navigate(path)}
              >
                <h3>{fund["Fondo Mutuo"]}</h3>
                <div className="fundSquare-data-container">
                  <div className="fundSquare-data-div">
                    <p style={{ fontWeight: "bold" }}>Gestor</p>
                    <p>{fund["Administradora"]}</p>
                  </div>
                  <div className="fundSquare-data-div">
                    <p style={{ fontWeight: "bold" }}>Tipo </p>
                    <p>{fund["Tipo Fondo"]}</p>
                  </div>
                  <div className="fundSquare-data-div">
                    <p style={{ fontWeight: "bold" }}>Retorno</p>{" "}
                    <p className={getColor(fund["Rentabilidad 2023"])}>
                      {fund["Rentabilidad 2023"]}%
                    </p>
                  </div>
                  <div className="fundSquare-data-div">
                    <p style={{ fontWeight: "bold" }}>Valor Cuota</p>{" "}
                    <p>{fund["Valor Cuota"]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <FooterComponent show={showFooter} />
    </>
  );
}

export default FundList;
