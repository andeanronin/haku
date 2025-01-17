import FooterComponent from "../../footerComp";
import Navbar from "../../Navbar";
import "./MutualFundPage.css";
import YearlyReturnsTable from "./yearlyReturnsTable";
import FundInfoCard from "./fundInfoCard";
import FundHeader from "./fundHeader";
import CompoundedReturnsGraph from "./compoundedReturnsGraph";
import MutualFundIndicators from "./fundIndicators";
import YearlyReturnGraph from "./yearlyReturnGraph";
import DonwloadFundDataButton from "./downloadFundData";
import { MutualFundData } from "../../types/mutualFundTypes";

function MutualFundPage({ data }: { data: MutualFundData }) {
  return (
    <div className="mutualFundPage-wrapper">
      <Navbar />
      <div id="fundPage-container">
        <FundHeader data={data} />
        <div id="fundPage-container-2">
          <div id="CompoundReturnsChart-Container">
            <CompoundedReturnsGraph fundData={data} />
          </div>
          <FundInfoCard data={data} />
        </div>
        <MutualFundIndicators data={data} />
        <p id="mutualFundPage-RetornosAnuales__heading">Retornos Anuales</p>
        <YearlyReturnsTable data={data} />
        <YearlyReturnGraph fundData={data} />
        <DonwloadFundDataButton fundData={data} />
      </div>

      <FooterComponent />
    </div>
  );
}

export default MutualFundPage;
