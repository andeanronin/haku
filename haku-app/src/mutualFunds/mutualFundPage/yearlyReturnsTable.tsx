import "./yearlyReturnsTable.css";
import { MutualFundData } from "../../types/mutualFundTypes";

// Helper function to format percentage values
const formatPercentage = (value: number | null): string => {
  if (value === null) return "N/A";
  return `${(value * 100).toFixed(2)}%`;
};

// Helper function to format color of return data
const getReturnColor = (value: number | null) => {
  if (value === null) {
    return "";
  }
  if (value >= 0) {
    return "green";
  } else return "red";
};

function YearlyReturnsTable({ data }: { data: MutualFundData }) {
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
        <tr className="mutualFunds-yearlyReturnsTable__row">
          <td className={getReturnColor(data[`Rentabilidad ${2014}`])}>
            {formatPercentage(data[`Rentabilidad ${2014}`] as number | null)}
          </td>
          <td className={getReturnColor(data[`Rentabilidad ${2015}`])}>
            {formatPercentage(data[`Rentabilidad ${2015}`] as number | null)}
          </td>
          <td className={getReturnColor(data[`Rentabilidad ${2016}`])}>
            {formatPercentage(data[`Rentabilidad ${2016}`] as number | null)}
          </td>
          <td className={getReturnColor(data[`Rentabilidad ${2017}`])}>
            {formatPercentage(data[`Rentabilidad ${2017}`] as number | null)}
          </td>
          <td className={getReturnColor(data[`Rentabilidad ${2018}`])}>
            {formatPercentage(data[`Rentabilidad ${2018}`] as number | null)}
          </td>
          <td className={getReturnColor(data[`Rentabilidad ${2019}`])}>
            {formatPercentage(data[`Rentabilidad ${2019}`] as number | null)}
          </td>
          <td className={getReturnColor(data[`Rentabilidad ${2020}`])}>
            {formatPercentage(data[`Rentabilidad ${2020}`] as number | null)}
          </td>
          <td className={getReturnColor(data[`Rentabilidad ${2021}`])}>
            {formatPercentage(data[`Rentabilidad ${2021}`] as number | null)}
          </td>
          <td className={getReturnColor(data[`Rentabilidad ${2022}`])}>
            {formatPercentage(data[`Rentabilidad ${2022}`] as number | null)}
          </td>
          <td className={getReturnColor(data[`Rentabilidad ${2023}`])}>
            {formatPercentage(data[`Rentabilidad ${2023}`] as number | null)}
          </td>
          <td className={getReturnColor(data[`Rentabilidad ${2024}`])}>
            {formatPercentage(data[`Rentabilidad ${2024}`] as number | null)}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default YearlyReturnsTable;
