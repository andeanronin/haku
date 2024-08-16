/* 
This component renders all of the mutual fund data in visually appealing boxes for each Fund.
The user can scroll this page to explore mutual funds. 
*/

import fundData2 from "./assets/fondos-mutuos-data-3.json";
import "./FundDirectory.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import FooterComponent from "./footerComp";

function FundList({ showHeader = true, showFooter = true }) {
  const navigate = useNavigate();

  const getReturnColor = (value: number | null) => {
    /*
    Input: the value of a fund's annual return data point 
    Output: a string - 'positive' or 'negative', to set the class of the <td> element. 
    */
    if (value === null) {
      return undefined;
    }
    return value >= 0 ? "positive" : "negative";
  };

  const getRiskColor = (value: string | null) => {
    if (value === null) {
      return undefined;
    } else if (value === "Low") {
      return "green";
    } else if (value === "Medium Low") {
      return "green-orange";
    } else if (value === "Medium") {
      return "orange";
    } else if (value === "Medium High") {
      return "orange-red";
    } else {
      return "red";
    }
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
          <p>Riesgo</p>
          <p>Retorno</p>
        </div>

        <div className="fundExploreContainer">
          {fundData2.map((fund) => {
            const path = `/fund/${fund["Fund id"]}`;
            return (
              <div
                className="fundSquare"
                key={path}
                onClick={() => navigate(path)}
              >
                <h3>{fund["Fondo Mutuo"]}</h3>
                <div className="fundSquare-data-container">
                  {/* Gestor */}
                  <div className="fundSquare-data-div">
                    <p style={{ fontWeight: "bold" }}>Gestor</p>
                    <p>{fund["Administradora"]}</p>
                  </div>

                  {/* Tipo de Fondo */}
                  <div className="fundSquare-data-div">
                    <p style={{ fontWeight: "bold" }}>Tipo De Fondo</p>
                    <p>{fund["Categoria"]}</p>
                  </div>

                  {/* Retorno  (CAGR) */}
                  <div className="fundSquare-data-div">
                    <p style={{ fontWeight: "bold" }}>Retorno Histórico</p>{" "}
                    <p className={getReturnColor(fund["CAGR"])}>
                      {" "}
                      {fund["CAGR"] === null
                        ? "N/A"
                        : `${(fund["CAGR"] * 100).toFixed(2)} %`}
                    </p>
                  </div>

                  {/* Valor Cuota */}
                  <div className="fundSquare-data-div">
                    <p style={{ fontWeight: "bold" }}>Valor Cuota</p>{" "}
                    <p>
                      {fund["Valor Cuota"] === 0 ? "N/A" : fund["Valor Cuota"]}
                    </p>
                  </div>

                  {/* Riesgo */}
                  <div className="fundSquare-data-div">
                    <p style={{ fontWeight: "bold" }}>Riesgo</p>{" "}
                    <p className={getRiskColor(fund["Risk"])}>
                      {fund["Risk"] === null ? "N/A" : fund["Risk"]}
                    </p>
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
