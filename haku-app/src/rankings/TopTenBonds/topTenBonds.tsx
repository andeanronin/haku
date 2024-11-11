import bondData from "./top_ten_bonds.json";

const getReturnColor = (value: number | null) => {
  if (value === null) {
    return "";
  }
  if (value >= 0) {
    return "green";
  } else return "red";
};

function TopTenBonds() {
  return (
    <>
      <table id="topTen-MutualFunds">
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Emisor</th>
            <th>Sector</th>
            <th>Categoria</th>
            <th>Tasa de Interes</th>
            <th>Riesgo</th>
          </tr>
        </thead>
        <tbody>
          {bondData.map((bond, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{bond.emisor}</td>
                <td>{bond.sector}</td>
                <td>{bond.Tipo}</td>
                <td className={getReturnColor(bond["Tasa de Interes %"])}>
                  {bond["Tasa de Interes %"].toFixed(2)}%
                </td>
                <td>{bond["Clasificacion de Riesgo"]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default TopTenBonds;
