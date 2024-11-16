import Navbar from "../Navbar";
import FooterComponent from "../footerComp";
import "./rankingsPage.css";
// Import Data
import topTenRentaFija from "./topTenMutualFunds/renta_fija.json";
import topTenFlexibles from "./topTenMutualFunds/flexibles.json";
import topTenRentaVariable from "./topTenMutualFunds/renta_variable.json";
import topTenFondodeFondos from "./topTenMutualFunds/fondo_de_fondos.json";
import topTenEtfs from "./TopTenEtfs/topTen2024.json";

// Import React component tables
import TopTenMutualFunds from "./topTenMutualFunds/topTenMutualFunds";
import TopTenBonds from "./TopTenBonds/topTenBonds";
import TopTenEtfs from "./TopTenEtfs/topTenEtfs2024";

function RankingsPage() {
  return (
    <>
      <Navbar />
      <div id="rankingsPage-container">
        <h1 style={{ color: "white" }}>Rankings</h1>
        <p>
          Ranking mensual de los bonos, fondos mutuos y etfs mas rentables del
          Peru.
        </p>
        <p>*Actualizado al 31 de Oct 2024.*</p>
        <h1 className="rankingsPage-seccion-heading">Fondos Mutuos</h1>
        <section className="rankingsPage-tableSection">
          <h2>Renta Fija 2024</h2>
          <TopTenMutualFunds fundData={topTenRentaFija} />
        </section>
        <section className="rankingsPage-tableSection">
          <h2>Fondos Flexibles 2024</h2>
          <TopTenMutualFunds fundData={topTenFlexibles} />
        </section>
        <section className="rankingsPage-tableSection">
          <h2>Renta Variable 2024</h2>
          <TopTenMutualFunds fundData={topTenRentaVariable} />
        </section>
        <section className="rankingsPage-tableSection">
          <h2>Fondo de Fondos 2024</h2>
          <TopTenMutualFunds fundData={topTenFondodeFondos} />
        </section>
        <h1 className="rankingsPage-seccion-heading">Bonos</h1>
        <section className="rankingsPage-tableSection">
          <h2>Mejores Tasas</h2>
          <TopTenBonds />
        </section>
        <h1 className="rankingsPage-seccion-heading">
          Exchage Traded Funds (ETFs)
        </h1>
        <section className="rankingsPage-tableSection">
          <h2>Mas Rentables por Valor Cuota 2024</h2>
          <TopTenEtfs fundData={topTenEtfs} />
        </section>
      </div>
      <FooterComponent />
    </>
  );
}

export default RankingsPage;
