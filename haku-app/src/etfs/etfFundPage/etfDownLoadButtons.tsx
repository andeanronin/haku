import { EtfPageProps } from "../../types/etfTypes";
import { EtfProfile } from "../../types/etfTypes"; // Update with correct paths
import Papa from "papaparse";
import "./etfDownloadButtons.css";
function EtfDownloadButtons({ etfData, etfMonthlyValues }: EtfPageProps) {
  // Flatten the EtfProfile data for CSV
  const flattenEtfProfile = (data: EtfProfile) => {
    return {
      ...data,
      ...data.asset_allocation, // Spread asset_allocation into top-level fields
      sectors: JSON.stringify(data.sectors), // Convert sectors to JSON string for CSV
      holdings: JSON.stringify(data.holdings), // Convert holdings to JSON string for CSV
    };
  };
  // CSV download for EtfProfile
  const handleDownloadEtfProfileCSV = () => {
    const csvData = Papa.unparse([flattenEtfProfile(etfData)]);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${etfData.name}_profile.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // CSV download for EtfMonthlyValues
  const handleDownloadEtfMonthlyValuesCSV = () => {
    const flattenedMonthlyValues = Object.keys(
      etfMonthlyValues["Monthly Adjusted Time Series"]
    ).map((date) => ({
      date,
      ...etfMonthlyValues["Monthly Adjusted Time Series"][date],
    }));
    const csvData = Papa.unparse(flattenedMonthlyValues);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${etfMonthlyValues["Meta Data"]["2. Symbol"]}_monthly_values.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="etfPage-downloadButtonContainer">
      <button
        className="etfPage-downloadButton"
        onClick={handleDownloadEtfProfileCSV}
      >
        Download ETF Profile
      </button>

      {/* Button to download EtfMonthlyValues */}
      <button
        className="etfPage-downloadButton"
        onClick={handleDownloadEtfMonthlyValuesCSV}
      >
        Download Monthly Values
      </button>
    </div>
  );
}

export default EtfDownloadButtons;
