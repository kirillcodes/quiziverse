export interface CreateTestDto {
  title: string;
  timeLimit: number;
  startDate: Date;
  questions: QuestionDto[];
}

export interface QuestionDto {
  text: string;
  answers: AnswerDto[];
  rightAnswer: number;
  points: number;
}

export interface AnswerDto {
  text: string;
}
