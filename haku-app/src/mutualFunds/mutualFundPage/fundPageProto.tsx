import FooterComponent from "../../footerComp";
import Navbar from "../../Navbar";
import "./fundPageProto.css";
import data from "./data.json";
import YearlyReturnsTable from "./yearlyReturnsTable";
import FundInfoCard from "./fundInfoCard";
import FundHeader from "./fundHeader";
import CompoundedReturnsGraph from "./compoundedReturnsGraph";
import MutualFundIndicators from "./fundIndicators";
import YearlyReturnGraph from "./yearlyReturnGraph";
import Papa from "papaparse";

function FundPageProto() {
  // Function to allow user to download data to csv
  const handleDownloadCSV = () => {
    const csvData = Papa.unparse([data]); // Converts the object to CSV format
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${data["Fondo Mutuo"]}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Navbar />
      <div id="fundPage-container">
        <FundHeader />
        <div id="fundPage-container-2">
          <div id="CompoundReturnsChart-Container">
            <CompoundedReturnsGraph fundData={data} />
          </div>
          <FundInfoCard />
        </div>
        <MutualFundIndicators />
        <YearlyReturnsTable />
        <YearlyReturnGraph fundData={data} />
        <div className="downloadFundData-container">
          <button
            className="downloadFundData-button"
            onClick={handleDownloadCSV}
          >
            Download Fund Data
          </button>
        </div>
      </div>

      <FooterComponent />
    </>
  );
}

export default FundPageProto;
