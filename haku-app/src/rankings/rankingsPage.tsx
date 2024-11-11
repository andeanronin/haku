import data from "./topTenMutualFunds/top_ten_renta_fija.json";
import topTenFlexibles from "./topTenMutualFunds/top_ten_flexibles.json";
import topTenRentaVariable from "./topTenMutualFunds/top_ten_renta_variable.json";
import topTenFondodeFondos from "./topTenMutualFunds/fondo_de_fondos.json";
import Navbar from "../Navbar";
import FooterComponent from "../footerComp";
import "./rankingsPage.css";
import TopTenMutualFunds from "./topTenMutualFunds/topTenMutualFunds";

function RankingsPage() {
  return (
    <>
      <Navbar />
      <div id="rankingsPage-container">
        <h1 style={{ color: "white" }}>Rankings</h1>
        <section className="rankingsPage-tableSection">
          <h2>Fondos Mutuos - Renta Fija 2023</h2>
          <TopTenMutualFunds fundData={data} />
        </section>
        <section className="rankingsPage-tableSection">
          <h2>Fondos Mutuos - Flexibles 2024</h2>
          <TopTenMutualFunds fundData={topTenFlexibles} />
        </section>
        <section className="rankingsPage-tableSection">
          <h2>Fondos Mutuos - Renta Variable 2024</h2>
          <TopTenMutualFunds fundData={topTenRentaVariable} />
        </section>
        <section className="rankingsPage-tableSection">
          <h2>Fondos Mutuos - Fondo de Fondos 2024</h2>
          <TopTenMutualFunds fundData={topTenFondodeFondos} />
        </section>
      </div>
      <FooterComponent />
    </>
  );
}

export default RankingsPage;
