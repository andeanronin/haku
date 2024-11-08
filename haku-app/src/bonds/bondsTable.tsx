import Navbar from "../Navbar";
import FooterComponent from "../footerComp";
import "./bondsTable.css";
import bondData from "./bonds_table.json";
import { useEffect, useState } from "react";

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
  risk: string;
}

type BondData = Bond[];

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

// Helper function to format date strings
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}

// Get list of sectores for sectores dropdown menu
const uniqueSectoresSet = new Set(bondData.map((bond) => bond.sector));
const uniqueSectoresList = [...uniqueSectoresSet];

// Get list of Valores for Valores dropdown
const valoresSet = new Set(bondData.map((bond) => bond.valor));
const uniqueValoresLIst = [...valoresSet];

// Risk Color
const getRiskColor = (value: string | null) => {
  if (value === null) {
    return undefined;
  } else if (value === "low") {
    return "green";
  } else if (value === "medium low") {
    return "green-orange";
  } else if (value === "Medium") {
    return "orange";
  } else if (value === "Medium High") {
    return "orange-red";
  } else {
    return "red";
  }
};

// Return Color
const getColor = (value: number) => {
  return value >= 0 ? "positive" : "negative";
};

// MAIN COMPONENT
function BondTable() {
  const [bondDataTable, setBondDataTable] = useState<BondData>(bondData);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedValor, setSelectedValor] = useState<string | null>(null);

  // Function to sort data based on numerical columns by descending order
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

  // Sorts data when column is clicked.
  const handleSortClick = (columnToSort: string) => {
    const sortedBonds = sortColumn(bondDataTable, columnToSort);
    setBondDataTable(sortedBonds);
  };

  // Updates the selected currency state variable when user clicks on a currency from dropdown
  const handleCurrencyClick = (currency: string) => {
    setSelectedCurrency(currency);
  };

  const handleSectorClick = (sector: string) => {
    setSelectedSector(sector);
  };

  const handleValorClick = (valor: string) => {
    setSelectedValor(valor);
  };

  useEffect(() => {
    const filteredData3 = bondData.filter((bond) => {
      const currencyMatch =
        !selectedCurrency || bond.moneda === selectedCurrency;
      const sectorMatch = !selectedSector || bond.sector === selectedSector;
      const valorMatch = !selectedValor || bond.valor === selectedValor;
      return currencyMatch && sectorMatch && valorMatch;
    });
    setBondDataTable(filteredData3);
  }, [selectedCurrency, selectedSector, selectedValor]);

  // currency is clicked by user --> handlCurrencyClick is called --> updates selected currency --> filter data function is called when selected currency chagnes --> setBondData table to filtered array

  const resetSectorFilter = () => setSelectedSector(null);
  const resetValorFilter = () => setSelectedValor(null);
  const resetCurrencyFilter = () => setSelectedCurrency(null);

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
          <div className="tableFilters-container">
            {selectedSector && (
              <div className="filtered-funds-heading">
                <button onClick={resetSectorFilter}>Clear</button>
                <p>Fondos de: {selectedSector}</p>
              </div>
            )}
            {selectedCurrency && (
              <div className="filtered-funds-heading">
                <button onClick={resetCurrencyFilter}>Clear</button>
                <p>Currency: {selectedCurrency}</p>
              </div>
            )}
            {selectedValor && (
              <div className="filtered-funds-heading">
                <button onClick={resetValorFilter}>Clear</button>
                <p>Fund Type: {selectedValor}</p>
              </div>
            )}
          </div>
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
                <th className="bondsTable-currencyColumn">
                  {
                    <div
                      id="bondsTable-sectorFilter"
                      className="bondsTable-dropdownFilter"
                    >
                      {uniqueSectoresList.map((sector) => {
                        return (
                          <div onClick={() => handleSectorClick(sector)}>
                            {sector}
                          </div>
                        );
                      })}
                    </div>
                  }
                  Sector
                </th>
                <th className="bondsTable-currencyColumn">
                  {
                    <div
                      id="bondsTable-valorFilter"
                      className="bondsTable-dropdownFilter"
                    >
                      {uniqueValoresLIst.map((valor) => {
                        return (
                          <div onClick={() => handleValorClick(valor)}>
                            {valor}
                          </div>
                        );
                      })}
                    </div>
                  }
                  Valor
                </th>
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
                <th className="bondsTable-currencyColumn">
                  {
                    <div className="bondsTable-dropdownFilter">
                      <div onClick={() => handleCurrencyClick("US$")}>$</div>
                      <div onClick={() => handleCurrencyClick("S/")}>S/.</div>
                    </div>
                  }
                  Moneda
                </th>
                <th>Rating Agency</th>
                <th>Rating Crediticio</th>
                <th>Riesgo</th>
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
                    <td className={getColor(bond["tasa_interes"])}>
                      {(bond["tasa_interes"] * 100).toFixed(2)}%
                    </td>
                    <td>
                      {formatLargeNumbers(String(bond["monto_circulacion"]))}
                    </td>
                    <td>{bond["moneda"]}</td>
                    <td>{bond["credit_rating_agency"]}</td>
                    <td>{bond["risk_classification"]}</td>
                    <td className={getRiskColor(bond["risk"])}>
                      {bond["risk"]}
                    </td>
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
