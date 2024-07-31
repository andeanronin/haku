// Component for each fund's independent page

import "./FundPage.css";
import FooterComponent from "./footerComp";
import Header from "./Header";

interface FundData {
  "Tipo Fondo": string;
  "Fondo Mutuo": string;
  Administradora: string;
  "Fec. Inicio Operación": string;
  "Moneda Cuota": string;
  "Valor Cuota": number | null;
  "Rentabilidad al 2024": number | null;
  "Rentabilidad 2023": number | null;
  "Rentabilidad 2022": number | null;
  "Rentabilidad 2021": number | null;
  "Rentabilidad 2020": number | null;
  "Rentabilidad 2019": number | null;
  "Rentabilidad 2018": number | null;
  "Rentabilidad 2017": number | null;
  "Rentabilidad 2016": number | null;
  "Rentabilidad 2015": number | null;
  "Rentabilidad 2014": number | null;
  "Patrimonio S/.": number | null;
  "Partícipes N": number | null;
  [key: string]: string | number | null; // Index signature for dynamic access
}

interface FundPageProps {
  fundData: FundData;
}

const FundPage: React.FC<FundPageProps> = ({ fundData }) => {
  // Helper function to format date strings
  const formatDate = (dateString: string): string => {
    // Split the date string into components
    const parts = dateString.split("/");

    // Ensure we have at least day, month, and year
    if (parts.length < 3) {
      return "Invalid Date";
    }

    let [day, month, year] = parts;

    // Pad the year to 4 digits if it's 2 digits
    if (year.length === 2) {
      const currentYear = new Date().getFullYear();
      const century = Math.floor(currentYear / 100) * 100;
      year = (century + parseInt(year, 10)).toString();
    }

    // Pad day and month with leading zero if necessary
    day = day.padStart(2, "0");
    month = month.padStart(2, "0");

    // Create a new Date object (note: months are 0-indexed in JavaScript)
    const date = new Date(`${year}-${month}-${day}T00:00:00Z`);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    // Format the date
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC", // Use UTC to avoid timezone issues
    });
  };

  // Helper function to format currency values
  const formatCurrency = (value: number | null, currency: string): string => {
    if (value === null) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency === "$" ? "USD" : "PEN",
      minimumFractionDigits: 2,
    }).format(value);
  };

  // Helper function to format percentage values
  const formatPercentage = (value: number | null): string => {
    if (value === null) return "N/A";
    return `${(value * 100).toFixed(2)}%`;
  };

  return (
    <>
      <Header />
      <div className="fund-page">
        <header className="fund-header">
          <h1 className="fund-header__title">{fundData["Fondo Mutuo"]}</h1>
          <p className="fund-header__type">
            Tipo de Fondo: {fundData["Tipo Fondo"]}
          </p>
        </header>

        <section className="fund-info">
          <div className="info-item">
            <h3 className="info-item__title">Gestor</h3>
            <p className="info-item__value">{fundData.Administradora}</p>
          </div>
          <div className="info-item">
            <h3 className="info-item__title">Fecha de Inicio</h3>
            <p className="info-item__value">
              {formatDate(fundData["Fec. Inicio Operación"])}
            </p>
          </div>
          <div className="info-item">
            <h3 className="info-item__title">Moneda</h3>
            <p className="info-item__value">
              {fundData["Moneda Cuota"] === "$" ? "USD" : "PEN"}
            </p>
          </div>
          <div className="info-item">
            <h3 className="info-item__title">Valor Cuota Actual</h3>
            <p className="info-item__value">
              {fundData["Valor Cuota"] !== null
                ? formatCurrency(
                    fundData["Valor Cuota"],
                    fundData["Moneda Cuota"]
                  )
                : "N/A"}
            </p>
          </div>
        </section>

        <section className="fund-stats">
          <div className="stat-item">
            <h3 className="stat-item__title ">Assets Under Management</h3>
            <p className="stat-item__value">
              {fundData["Patrimonio S/."] !== null
                ? formatCurrency(fundData["Patrimonio S/."], "PEN")
                : "N/A"}
            </p>
          </div>
          <div className="stat-item">
            <h3 className="stat-item__title ">Numero de Participantes</h3>
            <p className="stat-item__value">
              {fundData["Partícipes N"] !== null
                ? fundData["Partícipes N"].toLocaleString()
                : "N/A"}
            </p>
          </div>
        </section>

        <section className="fund-performance">
          <h2 className="fund-performance__title">
            Retornos Anuales Historicos
          </h2>
          <table className="fund-yearly-returns">
            <thead className="fund-yearly-returns__header ">
              <tr className="fund-yearly-returns__row">
                <th className="fund-yearly-returns__cell fund-yearly-returns__header">
                  Year
                </th>
                <th className="fund-yearly-returns__cell fund-yearly-returns__header">
                  Return
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015,
                2014,
              ].map((year) => (
                <tr key={year} className="fund-yearly-returns__row">
                  <td className="fund-yearly-returns__cell">{year}</td>
                  <td className="fund-yearly-returns__cell">
                    {formatPercentage(
                      fundData[
                        `Rentabilidad ${year === 2024 ? "al 2024" : year}`
                      ] as number | null
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="buyButtonContainer">
          <button className="buyFundButton">Lo Quiero</button>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};

export default FundPage;