import FooterComponent from "../../footerComp";
import Navbar from "../../Navbar";
import "./fundPageProto.css";
import data from "./data.json";
import YearlyReturnsTable from "./yearlyReturnsTable";
import FundInfoCard from "./fundInfoCard";
import FundHeader from "./fundHeader";
import CompoundedReturnsGraph from "./compoundedReturnsGraph";
import MutualFundIndicators from "./fundIndicators";

function FundPageProto() {
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
      </div>

      <FooterComponent />
    </>
  );
}

export default FundPageProto;
