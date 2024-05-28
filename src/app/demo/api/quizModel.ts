export interface Question {
    _id?: string;
    content: string;
    options: Option[];
  }
  
  export interface Option {
    _id?: string;
    content: string;
    isCorrect: boolean;
  }
  
  export interface Quiz {
    _id?: string;
    title: string;
    description: string;
    formations: string[];
    createdBy: string;
    questions?: Question[]; // Make questions optional
  }
  