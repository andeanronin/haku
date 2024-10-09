//import "./landingPage.css";
import landingStyles from "./landingPage.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FooterComponent from "./footerComp";
import Navbar from "./Navbar";

// script tag in HTML loads particlesJS to the global window object
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
    // Text animation:
    const texts = document.querySelectorAll(".fade-in"); // querySelectorAll returns a node list, which is array like.
    texts.forEach((text, index) => {
      // each text is displayed 1 second after the other
      (text as HTMLElement).style.animationDelay = `${index * 1}s`; // animation delay is a css property
    });

    // Initialize Particles Animation:
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
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
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className={landingStyles.landingcontainer}>
        <div className={landingStyles.landingPageContent}>
          <p className="fade-in" id={landingStyles.introText}>
            HAKU
          </p>
          <p className="fade-in">No somos una plataforma de inversion.</p>
          <p className="fade-in">Somos un buscador de fondos.</p>
          <p className="fade-in">Para que encuentres a donde invertir.</p>
          <div className={landingStyles.buttonsContainer}>
            <button
              className={`${landingStyles.exploreButton} fade-in`}
              onClick={handleFondosMutuosClick}
            >
              Fondos Mutuos
            </button>
            <button
              className={`${landingStyles.exploreButton} fade-in`}
              onClick={() => navigate("/etf")}
            >
              ETFs
            </button>
            <button
              className={`${landingStyles.exploreButton} fade-in`}
              onClick={() => navigate("/fondos-de-inversion")}
            >
              Fondos de Inversion
            </button>
          </div>
        </div>
        <div
          id="particles-js"
          className={landingStyles.particlesContainer}
        ></div>
      </div>
      <div className={landingStyles.landingpage2}>
        <p>
          Encuentra todos los Fondos Mutuos, ETFS y Fondos de Inversión del Peru
        </p>
        <p>Explora Alternativas</p>
        <p>Simula tu Inversión</p>
        <p>Descarga Datos</p>
      </div>
      <FooterComponent />
    </>
  );
}

export default LandingPage;
