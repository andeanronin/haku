import "./footerComp.css";

function FooterComponent({ show = true }) {
  if (!show) return null;

  return (
    <footer className="footer">
      <p className="footerText">Desarrollado x Haku Latam</p>
      <div className="footerLinksContainer">
        <a className="footerLink" href="https://github.com/andeanronin">
          {" "}
          <img src="gitHubLogo.svg" alt="Github" />
        </a>
        <a className="footerLink" href="https://x.com/HakuLatam">
          <img src="xLogo.svg" alt="X/Twitter"></img>
        </a>
        <a className="footerLink" href="mailto:hakudata01@gmail.com">
          <img src="mailLogo.svg" alt="Mail"></img>
        </a>
      </div>
    </footer>
  );
}

export default FooterComponent;
