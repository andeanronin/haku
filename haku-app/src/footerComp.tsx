import "./footerComp.css";

function FooterComponent() {
  return (
    <footer className="footer">
      <p className="footerText">Desarrollado x Andean Rōnin</p>
      <div className="footerLinksContainer">
        {["GitHub", "Twitter", "Contact"].map((text, index) => (
          <p key={index} className="footerLink">
            {text}
          </p>
        ))}
      </div>
    </footer>
  );
}

export default FooterComponent;
