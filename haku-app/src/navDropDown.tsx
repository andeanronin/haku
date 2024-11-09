// Navigation Dropdown for Small Screens (tablets & phones)
// Sidebar
import "./navDropDown.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChartArea,
  UsersRound,
  ChartNoAxesCombined,
  Info,
  Globe,
  Building2,
  ReceiptText,
} from "lucide-react";

interface SideBarProps {
  onClose: () => void;
}

function NavDropDown({ onClose }: SideBarProps) {
  const sideBarRef = useRef<HTMLDivElement>(null); // useRef used to access Div element in the dom
  const navigate = useNavigate();

  // this Effect is used to hide the sidebar whenever a user clicks outside of it.
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // function takes Mouse Event as an argument, which is a Mouse Click, checks if the mouse click is outside the SideBar, if it is, it calls onClose() to close the sidebar
      if (
        sideBarRef.current && // checks ref is attached to the DOM element (div) of the SideBar
        !sideBarRef.current.contains(event.target as Node) // checks if the clicked html element (event.target) is not contained within (is outside) the sidebar element
      ) {
        onClose(); // calls onClose() to close the SideBar
      }
    }

    // Use setTimeout to add the event listener for a click after the initial render.
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside); // mousedown event listener to the entire document allows the detection of clicks anywhere on the page, wand runs handleClickOutside whenever it detects a click
    }, 0); // delay of 0ms ensures that the component has fully mounted before we add the listener

    // Cleanup function: called when component unmounts or when dependencies of useEffect change (when onClose changes from false --> true or vice-versa, when sidebar is ordered to open or close )
    return () => {
      clearTimeout(timeoutId); //
      document.removeEventListener("mousedown", handleClickOutside); // removes event listener to prevent memory leaks
    };
  }, [onClose]); // onClose dependency array --> ensures that this effect runs again if onClose changes --> event listener remains up-to-date

  return (
    <div id="navBarDropdown-container" ref={sideBarRef}>
      <div id="navBarDropdown-heading-container">
        <img src="/logoHaku2.png" id="logoHaku-navBarDropdown"></img>
        <p className="navBarDropdown-text" onClick={() => navigate("/")}>
          Haku
        </p>
      </div>
      {/*<p>Explora Fondos</p>*/}
      <div className="navBarDropdown-item">
        <UsersRound color="white" />
        <p
          className="navBarDropdown-text"
          onClick={() => navigate("/fondos-mutuos")}
        >
          Fondos Mutuos
        </p>{" "}
      </div>

      <div className="navBarDropdown-item">
        <ChartArea color="white" />
        <p className="navBarDropdown-text" onClick={() => navigate("/etf")}>
          ETFs
        </p>
      </div>
      <div className="navBarDropdown-item">
        <ChartNoAxesCombined color="white" />
        <p
          className="navBarDropdown-text"
          onClick={() => navigate("/fondos-de-inversion")}
        >
          Fondos de Inversion
        </p>
      </div>

      <div className="navBarDropdown-item">
        <ReceiptText color="white" />
        <p
          className="navBarDropdown-text"
          onClick={() => navigate("/bonos-peruanos")}
        >
          Bonos
        </p>
      </div>

      <div className="navBarDropdown-item">
        <Building2 color="white" />
        <p
          className="navBarDropdown-text"
          onClick={() => navigate("/gestores")}
        >
          Gestores
        </p>
      </div>

      <p id="navBarDropdown-asesorate">Asesorate</p>
      <div className="navBarDropdown-item">
        <Info color="white" />
        <p className="navBarDropdown-text" onClick={() => navigate("/About")}>
          Sobre Haku
        </p>
      </div>
      <div id="navBarDropdown-location" className="navBarDropdown-item">
        <Globe color="white" />
        <p className="navBarDropdown-text">Location: </p>
        <img src="/FlagOfPeru.svg" id="locationFlag" alt="peruflag" />
      </div>
      <a
        className="navBarDropdown-text"
        id="navBarDropdown-contacto"
        href="mailto:hakudata01@gmail.com"
      >
        Contacto
      </a>
    </div>
  );
}

export default NavDropDown;
