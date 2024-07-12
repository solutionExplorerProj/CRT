export interface Option {
    id: number;
    text: string;
    nextQuestionId: number | null;
    pdfUrl?: string;
    suggestion?: string;
    type?: string;
    heading?: string;
    smallHeading?: string;
    content?: string;
  }
  
  export interface Question {
    id: number;
    text: string;
    options: Option[];
  }
  