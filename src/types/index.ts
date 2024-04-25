export type CreateTest = {
  title: string;
  timeLimit: number;
  startDate: Date;
  questions: Question[];
};

export type Question = {
  text: string;
  answers: Answer[];
  rightAnswer: number;
  points: number;
};

export type Answer = {
  text: string;
};
