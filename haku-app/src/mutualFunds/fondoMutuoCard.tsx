// Mutual Fund Card Component

import { useNavigate } from "react-router-dom";
import { FondoMutuoCardProps } from "../types/mutualFundTypes"; // interface type for component

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

function FondoMutuoCard({ path, fund }: FondoMutuoCardProps) {
  const navigate = useNavigate();

  return (
    <div className="fundSquare" key={path} onClick={() => navigate(path)}>
      <div id="fundSquare-heading-container">
        <img id="fundSquare-image" src={fund["Logo"]}></img>
        <h3>{fund["Fondo Mutuo"]}</h3>
      </div>
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
          <p>{fund["Valor Cuota"] === 0 ? "N/A" : fund["Valor Cuota"]}</p>
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
}

export default FondoMutuoCard;
