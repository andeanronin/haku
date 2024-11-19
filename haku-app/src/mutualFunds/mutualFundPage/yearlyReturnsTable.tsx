import data from "./data.json";
import "./yearlyReturnsTable.css";

// Helper function to format percentage values
const formatPercentage = (value: number | null): string => {
  if (value === null) return "N/A";
  return `${(value * 100).toFixed(2)}%`;
};

function YearlyReturnsTable() {
  return (
    <table className="mutualFunds-yearlyReturnsTable">
      <thead>
        <tr className="mutualFunds-yearlyReturnsTable__year">
          <td>2014</td>
          <td>2015</td>
          <td>2016</td>
          <td>2017</td>
          <td>2018</td>
          <td>2019</td>
          <td>2020</td>
          <td>2021</td>
          <td>2022</td>
          <td>2023</td>
          <td>2024</td>
        </tr>
      </thead>
      <tbody>
        <tr className="fund-yearly-returns__row">
          <td>
            {formatPercentage(data[`Rentabilidad ${2014}`] as number | null)}
          </td>
          <td>
            {formatPercentage(data[`Rentabilidad ${2015}`] as number | null)}
          </td>
          <td>
            {formatPercentage(data[`Rentabilidad ${2016}`] as number | null)}
          </td>
          <td>
            {formatPercentage(data[`Rentabilidad ${2017}`] as number | null)}
          </td>
          <td>
            {formatPercentage(data[`Rentabilidad ${2018}`] as number | null)}
          </td>
          <td>
            {formatPercentage(data[`Rentabilidad ${2019}`] as number | null)}
          </td>
          <td>
            {formatPercentage(data[`Rentabilidad ${2020}`] as number | null)}
          </td>
          <td>
            {formatPercentage(data[`Rentabilidad ${2021}`] as number | null)}
          </td>
          <td>
            {formatPercentage(data[`Rentabilidad ${2022}`] as number | null)}
          </td>
          <td>
            {formatPercentage(data[`Rentabilidad ${2023}`] as number | null)}
          </td>
          <td>
            {formatPercentage(data[`Rentabilidad ${2024}`] as number | null)}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default YearlyReturnsTable;
