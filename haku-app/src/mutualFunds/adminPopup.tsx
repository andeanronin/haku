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

/*
<ResponsiveContainer width="100%" height={chartHeight}>
<LineChart
  data={compoundedReturnsChartData}
  margin={lineChartMargin}
>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis
    dataKey="year"
    label={
      showXaxisLabel
        ? { value: "Año", position: "bottom", offset: 5 }
        : undefined
    }
    tick={tickStyle}
  />
  <YAxis
    label={
      showYaxisLabelLineChart
        ? {
            value: "Valor de Inversion",
            angle: -90,
            position: "insideLeft",
            offset: 0,
          }
        : undefined
    }
    domain={[0, yAxisMax]}
    ticks={yAxisTicks}
    tick={tickStyle}
    tickFormatter={(value) => `${value.toFixed(0)}`}
  />
  { tooltip Formats the valor cuota number  when user hover over }
  <Tooltip formatter={(value) => `$ ${Number(value).toFixed(2)}`} />{" "}
  <Legend
    verticalAlign="bottom"
    align="left"
    wrapperStyle={{ paddingLeft: "100px" }}
  />
  <Line
    type="monotone"
    dataKey="Valor"
    stroke="#8884d8"
    activeDot={{ r: 8 }}
    connectNulls
  />
</LineChart>
</ResponsiveContainer>
*/
