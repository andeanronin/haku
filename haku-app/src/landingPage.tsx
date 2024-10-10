import "./landingPage.module.css";
import landingStyles from "./landingPage.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FooterComponent from "./footerComp";
import Navbar from "./Navbar";

declare global {
  interface Window {
    particlesJS: any;
  }
}

function LandingPage() {
  const navigate = useNavigate();

  const handleFondosMutuosClick = () => {
    navigate("/fondos-mutuos");
  };

  useEffect(() => {
    // Text animation
    const texts = document.querySelectorAll(".fade-in");
    texts.forEach((text, index) => {
      (text as HTMLElement).style.animationDelay = `${index * 1}s`;
    });

    // Initialize Particles Animation for multiple containers
    if (window.particlesJS) {
      [
        "particles-js-1",
        "particles-js-2",
        "particles-js-3",
        "particles-js-4",
      ].forEach((containerId) => {
        window.particlesJS(containerId, {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { particles_nb: 4 },
            },
          },
          retina_detect: true,
        });
      });
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className={landingStyles.sectionContainer}>
        <div className={landingStyles.landingPageContent}>
          <p className="fade-in" id={landingStyles.introText}>
            HAKU
          </p>
          <p className="fade-in">No somos una plataforma de inversion.</p>
          <p className="fade-in">Somos un buscador de fondos.</p>
          <p className="fade-in">Para que encuentres a donde invertir.</p>
        </div>
        <div
          id="particles-js-1"
          className={landingStyles.particlesContainer}
        ></div>
      </div>

      <div className={landingStyles.sectionContainer}>
        <div className={landingStyles.landingPageContent}>
          <h1>20-Year Historical Data </h1>
          <div id={landingStyles.landingPage2Fondos}>
            <h2>Fondos Mutuos - </h2>
            <h2>ETFS -</h2>
            <h2>Fondos de Inversion</h2>
          </div>
        </div>
        <div
          id="particles-js-2"
          className={landingStyles.particlesContainer}
        ></div>
      </div>

      <div className={landingStyles.sectionContainer}>
        <div className={landingStyles.landingPageContent}>
          <h1>Explora Fondos</h1>
          <div className={landingStyles.buttonsContainer}>
            <button
              className={landingStyles.exploreButton}
              onClick={handleFondosMutuosClick}
            >
              Fondos Mutuos
            </button>
            <button
              className={landingStyles.exploreButton}
              onClick={() => navigate("/etf")}
            >
              ETFs
            </button>
            <button
              className={landingStyles.exploreButton}
              onClick={() => navigate("/fondos-de-inversion")}
            >
              Fondos de Inversion
            </button>
          </div>
        </div>
        <div
          id="particles-js-3"
          className={landingStyles.particlesContainer}
        ></div>
      </div>

      <div className={landingStyles.sectionContainer}>
        <div className={landingStyles.landingPageContent}>
          <h1>Descarga Datos</h1>
          <h1>&</h1>
          <h1>Arma tu Portafolio</h1>
        </div>
        <div
          id="particles-js-4"
          className={landingStyles.particlesContainer}
        ></div>
      </div>

      <FooterComponent />
    </>
  );
}

export default LandingPage;
