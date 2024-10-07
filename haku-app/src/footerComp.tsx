import "./footerComp.css";
import { useNavigate } from "react-router-dom";

function FooterComponent({ show = true }) {
  if (!show) return null;
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <p className="footerText">Desarrollado x Andean Rōnin</p>
      <div className="footerLinksContainer">
        <a className="footerLink" href="https://github.com/andeanronin">
          GitHub
        </a>
        <p className="footerLink">Twitter</p>
        <a className="footerLink" href="mailto:hakudata01@gmail.com">
          Contact
        </a>
      </div>
    </footer>
  );
}

export default FooterComponent;
