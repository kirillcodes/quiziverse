import { QuestionDto } from '@dto/create-test.dto';
import React, { useState } from 'react';
import { CustomInput } from './CustomInput';
import { CustomButton } from './CustomButton';
import scss from "@styles/components/CreateQuestionForm.module.scss";

interface CreateQuestionFormProps {
  addQuestion: (question: QuestionDto) => void;
}

export const CreateQuestionForm: React.FC<CreateQuestionFormProps> = ({ addQuestion }) => {
  const [questionText, setQuestionText] = useState('');

  const handleSubmit = () => {
    if (questionText.trim() !== '') {
      addQuestion({ text: questionText, answers: [], rightAnswer: 0, points: 0 });
      setQuestionText('');
    }
  };

  return (
    <form className={scss.questionForm}>
      <label>
        Question:
        <CustomInput type="text" placeholder='Enter question' value={questionText} handleInput={e => setQuestionText(e.target.value)} />
      </label>
      <CustomButton title='Add question' handleSubmit={handleSubmit}/>
    </form>
  );
};
