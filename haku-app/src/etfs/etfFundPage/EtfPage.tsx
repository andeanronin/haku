// ETF Fund Page
import "./EtfPage.css";
import Navbar from "../../Navbar";
import FooterComponent from "../../footerComp";
import EtfPageHeading from "./etfPageHeading";
import EtfAssetAllocationChart from "./EtfAssetAllocChart";
import EtfSectorAllocation from "./EtfSectorAllocation";
import EtfTopHoldings from "./etfTopHoldings";
import EtfHistoricalValues from "./etfPriceChart";
import EtfDownloadButtons from "./etfDownLoadButtons";
import EtfIndicators from "./EtfIndicators";
import EtfIndicatorsTablets from "./EtfIndicatorsTablets";
import React from "react";
import { EtfPageProps } from "../../types/etfTypes";

function EtfsFundPage({ etfData, etfMonthlyValues }: EtfPageProps) {
  return (
    <div id="etfPage-wrapper">
      <Navbar />
      <div id="etfPage-Container">
        <EtfPageHeading etfData={etfData} etfMonthlyValues={etfMonthlyValues} />

        <div id="etfPage-Container-2">
          <EtfHistoricalValues data={etfMonthlyValues} />
          <EtfIndicators
            etfData={etfData}
            etfMonthlyValues={etfMonthlyValues}
          />
        </div>

        <EtfIndicatorsTablets
          etfData={etfData}
          etfMonthlyValues={etfMonthlyValues}
        />

        <div className="etfPage-allocationCharts">
          <EtfAssetAllocationChart data={etfData} />
          <EtfSectorAllocation data={etfData} />
        </div>

        <EtfTopHoldings data={etfData} />

        <EtfDownloadButtons
          etfData={etfData}
          etfMonthlyValues={etfMonthlyValues}
        />
      </div>
      <FooterComponent />
    </div>
  );
}

export default React.memo(EtfsFundPage);
