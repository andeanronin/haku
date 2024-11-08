// Get dictionary of credit rating agency for keys and their unique credit rating values inside a list as values

import bondData from "../bonds_table.json" assert { type: "json" };

const ratingTypeByAgency = {
  apoyo: new Set(),
  moodys_local_peru: new Set(),
  pcr: new Set(),
  jcr_latino_america: new Set(),
};

for (let bond of bondData) {
  let agency = bond["credit_rating_agency"];
  ratingTypeByAgency[agency].add(bond["risk_classification"]);
}

console.log(ratingTypeByAgency);

/*
for (let bond of bondData) {
  console.log(bond["credit_rating_agency"]);
}*/

// First try:
/*
for (let bond of bondData) {
  ratingTypeByAgency[bond["credit_rating_agency"]].push(
    bond["risk_classification"]
  );
}*/
