/* prop interface for page with all the fund admins */
export interface GestoresPageProps {
  adminList: string[]; // Assuming adminList is an array of strings
}

export interface GestorPageProps {
  nombreGestor: AdminType;
}

/* prop interface for the page for each individual fund manager */
export type AdminType = string;
