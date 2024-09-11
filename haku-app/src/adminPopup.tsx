// AdminPopup.tsx
import React from "react";
import "./adminPopup.css";

interface AdminPopupProps {
  administrators: string[];
  onSelect: (admin: string) => void;
  onClose: () => void;
}

const AdminPopup: React.FC<AdminPopupProps> = ({
  administrators,
  onSelect,
  onClose,
}) => {
  return (
    <div className="admin-popup">
      <div className="admin-popup-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h3>Selecciona un Gestor</h3>
        <ul>
          {administrators.map((admin) => (
            <li key={admin} onClick={() => onSelect(admin)}>
              {admin}
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AdminPopup;
