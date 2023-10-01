export interface Quiz {
  category: string;
  level: string;
  totalQuestions: number;
  totalTime: number;
  questions: Questions[];
}


export interface Question {
  _id: string;
  question: string;
  category: string;
  level: string;
  answers: string[];
  correct_answer: string
}

export interface Questions {
  _id: string;
  question: string;
  category: string;
  level: string;
  answers: string[];
  correct_answer: string;
}

export interface AxiosResponse<T> {
  data: T;
}




// export interface Questions {
//   question: string; 
//   answers : string[]; 
//   correct_answer: string;
// }

export type QuestionState = Quiz & { question: string; answers : string[]; correct_answer: string; }
