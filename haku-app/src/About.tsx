import Navbar from "./Navbar";
import Footer from "./footerComp";
import { useEffect } from "react";
import "./About.css";

// script tag in HTML loads particlesJS to the global window object
declare global {
  interface Window {
    particlesJS: any;
  }
}

function About() {
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
      <div className="about-page">
        <h2 style={{ color: "white" }}>HAKU</h2>
        <p>
          Haku es una base de datos de todos los vehiculos de inversion del Peru
          y una herramienta para ayudar al inversionista encontrar el mejor
          lugar en donde invertir.
        </p>
        <p>
          En Haku, buscamos democratizar el accesso a los datos financieros de
          todos los vehiculos de inversion del pais, para ayudar a todos los
          Peruanos a invertir y construir riqueza a largo plazo.
        </p>
        <p>
          Hoy, Haku solo abarca vehiculos de inversion del Peru, pero pronto
          buscamos expandirnos a todo latinoamerica.
        </p>
        <p>Escribenos a: hakudata01@gmail.com</p>
        <div id="particles-js" className="particlesContainer"></div>
      </div>
      <Footer />
    </>
  );
}

export default About;
