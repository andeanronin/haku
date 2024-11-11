import "./topTenMutualFunds.css";
import { useNavigate } from "react-router-dom";

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

const getReturnColor = (value: number | null) => {
  if (value === null) {
    return "";
  }
  if (value >= 0) {
    return "green";
  } else return "red";
};

interface TopTenFund {
  fund_id: number;
  fondo_mutuo: string;
  categoria: string;
  administradora: string;
  return: number;
  risk: string;
  year: number;
}

interface TopTenFunds {
  fundData: TopTenFund[];
}

function TopTenMutualFunds({ fundData }: TopTenFunds) {
  const navigate = useNavigate();

  return (
    <>
      <div id="topTenTable-container">
        <table id="topTen-MutualFunds">
          <thead>
            <tr>
              <th>Ranking</th>
              <th>Fondo</th>
              <th>Categoria</th>
              <th>Gestor</th>
              <th>Retorno</th>
              <th>Riesgo</th>
            </tr>
          </thead>
          <tbody>
            {fundData.map((fund, index) => {
              const fundPath = `/fund/${fund.fund_id}`;
              return (
                <tr
                  onClick={() => navigate(fundPath)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{index + 1}</td>
                  <td>{fund.fondo_mutuo}</td>
                  <td>{fund.categoria}</td>
                  <td>{fund.administradora}</td>
                  <td className={getReturnColor(fund.return)}>
                    {(fund.return * 100).toFixed(2)}%
                  </td>
                  <td className={getRiskColor(fund.risk)}>{fund.risk}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TopTenMutualFunds;
