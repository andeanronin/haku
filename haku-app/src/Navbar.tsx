import "./Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar({ show = true }) {
  const navigate = useNavigate();
  if (!show) return null;

  return (
    <nav className="mainHeader">
      <div className="mainHeader-container">
        <p onClick={() => navigate("/")}>Haku</p>
        <div className="mainHeader-subcontainer">
          <p onClick={() => navigate("/explora-fondos")}>Explora Fondos</p>
          <p>Asesórate</p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
