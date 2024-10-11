//import mutualFundData from "../mutualFunds/data/fondos-mutuos-data-4.json" assert { type: "json" };
//import etfData from "../etfs/data/etfs-profiles.json" assert { type: "json" };

/*
// Array of fund administrators (unique values)
const mutualFundAdmins = new Set(
  mutualFundData.map((item) => item.Administradora)
);

// Set of etf administrators (unique values)
let etfAdmins = new Set();
for (const etf in etfData) {
  const gestor = etfData[etf]["gestor"];
  etfAdmins.add(gestor);
}

// Merge Sets
const mergedAdminList = new Set([...etfAdmins, ...mutualFundAdmins]);
console.log(mergedAdminList);
const mergedAdminArray = Array.from(mergedAdminList);

function GestoresPage() {
  return (
    <>
      <div className="GestoresPageContainer">
        {mergedAdminArray.map((gestor) => {
          return (
            <div className="gestorCard">
              <h2>{gestor}</h2>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default GestoresPage;
*/
