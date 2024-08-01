import "./Header.css";
import { useNavigate } from "react-router-dom";

function Header({ show = true }) {
  const navigate = useNavigate();
  if (!show) return null;

  return (
    <header className="mainHeader">
      <div className="mainHeader-container">
        <p onClick={() => navigate("/")}>Haku</p>
        <div className="mainHeader-subcontainer">
          <p onClick={() => navigate("/explora-fondos")}>Explora Fondos</p>
          <p>Asesórate</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
