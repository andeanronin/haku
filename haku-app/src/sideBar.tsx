// Sidebar
import "./sideBar.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface SideBarProps {
  onClose: () => void;
}

function SideBar({ onClose }: SideBarProps) {
  const sideBarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    // Use setTimeout to add the event listener after the initial render
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div id="sideBar-container" ref={sideBarRef}>
      <div id="sideBar-heading-container">
        <img src="/logoHaku2.png" id="logoHaku-sidebar"></img>
        <p onClick={() => navigate("/")}>Haku</p>
      </div>
      {/*<p>Explora Fondos</p>*/}
      <p onClick={() => navigate("/fondos-mutuos")}>Fondos Mutuos</p>{" "}
      <p>ETFs</p>
      <p>Fondos de Inversion</p>
      <p>Asesorate</p>
      <p id="sideBar-contacto">Contacto</p>
    </div>
  );
}

export default SideBar;
