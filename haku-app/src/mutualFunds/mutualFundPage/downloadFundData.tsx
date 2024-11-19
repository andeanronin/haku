import Papa from "papaparse";
import { MutualFundData } from "../../types/mutualFundTypes";

function DonwloadFundDataButton({ fundData }: { fundData: MutualFundData }) {
  // Function to allow user to download data to csv
  const handleDownloadCSV = () => {
    const csvData = Papa.unparse([fundData]); // Converts the object to CSV format
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fundData["Fondo Mutuo"]}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="downloadFundData-container">
      <button className="downloadFundData-button" onClick={handleDownloadCSV}>
        Download Fund Data
      </button>
    </div>
  );
}

export default DonwloadFundDataButton;
