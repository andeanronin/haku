import "./topTenEtfs2024.css";
import { useNavigate } from "react-router-dom";

const getReturnColor = (value: number | null) => {
  if (value === null) {
    return "";
  }
  if (value >= 0) {
    return "green";
  } else return "red";
};

interface TopTenFund {
  ticker: string;
  name: string;
  gestor: string;
  january_close: number;
  latest_close: number;
  yearly_return_percentage: number;
}

interface TopTenFunds {
  fundData: TopTenFund[];
}

function TopTenEtfs({ fundData }: TopTenFunds) {
  const navigate = useNavigate();

  return (
    <>
      <div id="topTenTable-container">
        <table className="topTen-Table">
          <thead>
            <tr>
              <th>Ranking</th>
              <th>Fondo</th>
              <th>Ticker</th>
              <th>Gestor</th>
              <th>Valor Inicio '24</th>
              <th>Valor Oct '24</th>
              <th>Retorno 2024</th>
            </tr>
          </thead>
          <tbody>
            {fundData.map((fund, index) => {
              const fundPath = `/etf/${fund.ticker}`;
              return (
                <tr
                  onClick={() => navigate(fundPath)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{index + 1}</td>
                  <td>{fund.name}</td>
                  <td>{fund.ticker}</td>
                  <td>{fund.gestor}</td>
                  <td>{fund.january_close}</td>
                  <td>{fund.latest_close}</td>
                  <td className={getReturnColor(fund.yearly_return_percentage)}>
                    {fund.yearly_return_percentage.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TopTenEtfs;
