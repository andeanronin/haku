import "./footerComp.css";

function FooterComponent({ show = true }) {
  if (!show) return null;

  return (
    <footer className="footer">
      <p className="footerText">Desarrollado x Haku Latam</p>
      <div className="footerLinksContainer">
        <a className="footerLink" href="https://github.com/andeanronin">
          GitHub
        </a>
        <a className="footerLink" href="https://x.com/HakuLatam">
          {" "}
          Twitter
        </a>
        <a className="footerLink" href="mailto:hakudata01@gmail.com">
          Contact
        </a>
      </div>
    </footer>
  );
}

export default FooterComponent;
