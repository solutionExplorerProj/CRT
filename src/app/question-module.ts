export interface Option {
    id: number;
    text: string;
    nextQuestionId: number | null;
   
  }
  
  export interface Question {
    id: number;
    text: string;
    options: Option[];
    pdfUrl?: string;
  suggestion?: string;
  type?: string;
  heading?: string;
  smallHeading?: string;
  content?: string;
  }
  