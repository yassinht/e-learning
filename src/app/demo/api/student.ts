export interface Student {
    _id?: string; // Optional property for ID
    name: string;
    lastname: string;
    email: string;
    password: string;
    abonnements: any[]; // Replace 'any' with a specific type if known
    formation: any[]; // Replace 'any' with a specific type if known
  }
  