import Navbar from "../Navbar";
import FooterComponent from "../footerComp";
import "./bondsTable.css";
import bondData from "./bonds_table.json";
import { useState } from "react";

interface Bond {
  bond_key: number;
  emisor: string;
  sector: string;
  valor: string;
  fecha_colocacion: string;
  fecha_vencimiento: string;
  tasa_interes: number;
  monto_circulacion: number | null;
  moneda: string | null;
  credit_rating_agency: string;
  risk_classification: string;
}

type BondData = Bond[];

function BondTable() {
  const [bondDataTable, setBondDataTable] = useState<BondData>(bondData);

  // Helper function to format large values in billions or millions
  const formatLargeNumbers = (value: string) => {
    if (value.length >= 10) {
      const inBillions = value.slice(0, -9);
      return `${inBillions} Mil Millones`;
    } else if (value.length >= 7) {
      const inMillions = value.slice(0, -6);
      return `${inMillions} Millones`;
    } else {
      return value;
    }
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  }

  // Function to sort numerical columns by descending order
  function sortColumn(data: BondData, columnToSort: string) {
    if (columnToSort === "interes") {
      return [...data].sort((a, b) => b["tasa_interes"] - a["tasa_interes"]);
    } else if (columnToSort === "circulacion") {
      return [...data].sort(
        (a, b) => (b["monto_circulacion"] ?? 0) - (a["monto_circulacion"] ?? 0)
      );
    }
    return data; // if neither condition is met, still return the original data
  }

  // Function called when user clicks on one of the table headers
  const handleSortClick = (columnToSort: string) => {
    const sortedBonds = sortColumn(bondDataTable, columnToSort);
    setBondDataTable(sortedBonds);
  };

  return (
    <>
      <Navbar />
      <div id="bond-table-page-container">
        <div id="bond-table-header">
          <h2>Bonos Peruanos</h2>
          <p>
            Todos los bonos listados en la Bolsa de Valores de Lima, reportados
            por la SMV.
          </p>
        </div>
        <div id="bond-table-container">
          <table className="fondos-table">
            <thead>
              <tr>
                <th>Bond Id</th>
                <th id="emisor-column">
                  <p>------------</p>
                  Emisor
                  <p>------------</p>
                </th>
                <th>Sector</th>
                <th>Valor</th>
                <th>Fecha Colocacion</th>
                <th>Fecha Vencimiento</th>
                <th
                  onClick={() => handleSortClick("interes")}
                  style={{ cursor: "pointer" }}
                >
                  Tasa de Interes
                </th>
                <th
                  onClick={() => handleSortClick("circulacion")}
                  style={{ cursor: "pointer" }}
                >
                  Monto en Circulacion
                </th>
                <th>Moneda</th>
                <th>Rating Agency</th>
                <th>Rating Crediticio</th>
              </tr>
            </thead>
            <tbody>
              {bondDataTable.map((bond) => {
                return (
                  <tr>
                    <td>{bond["bond_key"]}</td>
                    <td>{bond["emisor"]}</td>
                    <td>{bond["sector"]}</td>
                    <td>{bond["valor"]}</td>
                    <td>{formatDate(bond["fecha_colocacion"])}</td>
                    <td>{formatDate(bond["fecha_vencimiento"])}</td>
                    <td>{(bond["tasa_interes"] * 100).toFixed(2)}%</td>
                    <td>
                      {formatLargeNumbers(String(bond["monto_circulacion"]))}
                    </td>
                    <td>{bond["moneda"]}</td>
                    <td>{bond["credit_rating_agency"]}</td>
                    <td>{bond["risk_classification"]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}

export default BondTable;
