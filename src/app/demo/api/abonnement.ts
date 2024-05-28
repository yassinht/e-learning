import { Formation } from './formation'; // Import the Formation interface

export interface Abonnement {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  formations: Formation[]; // Array of Formation objects
  // Add more fields as needed
}