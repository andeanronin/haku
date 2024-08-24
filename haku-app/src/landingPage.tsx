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
    navigate("/fondos-mutuos-table");
  };

  const handleExploraFondosClick = () => {
    navigate("/explora-fondos");
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
          <p
            className="fade-in"
            style={{ fontSize: "3.5em" }}
            id={landingStyles.introText}
          >
            Bienvenido a Haku
          </p>
          <p className="fade-in">No somos una plataforma de inversion.</p>
          <p className="fade-in">Somos un buscador de fondos.</p>
          <p className="fade-in">Para que encuentres a donde invertir.</p>
          <div className={landingStyles.buttonsContainer}>
            <button
              className={`${landingStyles.exploreButton} fade-in`}
              onClick={handleFondosMutuosClick}
            >
              Explora Fondos Mutuos
            </button>
            <button className={`${landingStyles.exploreButton} fade-in`}>
              Explora ETF's
            </button>
            <button
              className={`${landingStyles.exploreButton} fade-in`}
              onClick={handleExploraFondosClick}
            >
              Explora Fondos
            </button>
          </div>
        </div>
        <div
          id="particles-js"
          className={landingStyles.particlesContainer}
        ></div>
      </div>
      <FooterComponent />
    </>
  );
}

export default LandingPage;
