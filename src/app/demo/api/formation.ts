// src/app/demo/api/formation.ts

export interface Formation {
  _id?: string;
  name: string;
  description: string;
  image?: string | File; // Updated to allow for both string URL and File object
  cours?: string[]; // Array of Cours IDs associated with the Formation
  createdBy?: string; // ID of the user who created the formation
}
