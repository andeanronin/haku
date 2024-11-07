// Sidebar
import "./sideBar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChartArea,
  UsersRound,
  ChartNoAxesCombined,
  Info,
  Globe,
  Building2,
  ReceiptText,
} from "lucide-react";

function SideBar() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      id="sideBar-container"
      className={isExpanded ? "expanded" : "collapsed"}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div id="sideBar-heading-container">
        <img src="/logoHaku2.png" id="logoHaku-sidebar"></img>
        <p className="sidebar-text" onClick={() => navigate("/")}>
          Haku
        </p>
      </div>
      {/*<p>Explora Fondos</p>*/}
      <div className="sideBar-item">
        <UsersRound color="white" />
        <p className="sidebar-text" onClick={() => navigate("/fondos-mutuos")}>
          Fondos Mutuos
        </p>{" "}
      </div>

      <div className="sideBar-item">
        <ChartArea color="white" />
        <p className="sidebar-text" onClick={() => navigate("/etf")}>
          ETFs
        </p>
      </div>
      <div className="sideBar-item">
        <ChartNoAxesCombined color="white" />
        <p
          className="sidebar-text"
          onClick={() => navigate("/fondos-de-inversion")}
        >
          Fondos de Inversion
        </p>
      </div>

      <div className="sideBar-item">
        <ReceiptText color="white" />
        <p className="sidebar-text" onClick={() => navigate("/bonos-peruanos")}>
          Bonos
        </p>
      </div>

      <div className="sideBar-item">
        <Building2 color="white" />
        <p className="sidebar-text" onClick={() => navigate("/gestores")}>
          Gestores
        </p>
      </div>

      <p id="sideBar-asesorate">Asesorate</p>
      <div className="sideBar-item">
        <Info color="white" />
        <p className="sidebar-text" onClick={() => navigate("/About")}>
          Sobre Haku
        </p>
      </div>
      <div id="sideBar-location" className="sideBar-item">
        <Globe color="white" />
        <p className="sidebar-text">Location: </p>
        <img src="/FlagOfPeru.svg" id="locationFlag" alt="peruflag" />
      </div>
      <a
        className="sidebar-text"
        id="sideBar-contacto"
        href="mailto:hakudata01@gmail.com"
      >
        Contacto
      </a>
    </div>
  );
}

export default SideBar;
