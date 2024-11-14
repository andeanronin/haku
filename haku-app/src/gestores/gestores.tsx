/* 
This component renders a list of all the fund uniqueAdministrators
The user can then click on the administrator of their liking and see a list of all the funds that they manage.
This component receives its props from App.tsx
*/
import "./gestores.css";
import Navbar from "../Navbar";
import FooterComponent from "../footerComp";
import { useNavigate } from "react-router-dom";
import { GestoresPageProps } from "../types/gestoresTypes";

function GestoresPage({ adminList }: GestoresPageProps) {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div id="GestoresPageContainer">
        <h1>Gestores de Fondos</h1>
        <div id="GestoresCards-container">
          {adminList.map((gestor) => {
            return (
              <div
                className="gestorCard"
                onClick={() => navigate(`/gestores/${gestor}`)}
              >
                <h2>{gestor}</h2>
              </div>
            );
          })}
        </div>
      </div>

      <FooterComponent />
    </>
  );
}

export default GestoresPage;
