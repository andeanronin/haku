// AdminPopup.tsx
import React from "react";

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
        <h3>Selecciona un Administrador</h3>
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
