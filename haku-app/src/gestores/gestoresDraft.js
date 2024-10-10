import fundData from "./data/fondos-mutuos-data-4.json";

// Array of fund administrators (unique values)
const uniqueFundAdminSet = new Set(fundData.map((item) => item.Administradora));
const uniqueFundAdminArray = Array.from(uniqueFundAdminSet);

console.log(uniqueFundAdminArray);
