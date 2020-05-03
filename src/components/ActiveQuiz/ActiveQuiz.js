import React from 'react';

import AnswerList from './AnswersList/AnswersList';

import classes from './ActiveQuiz.module.css';

const ActiveQuiz = ({ answerNumber, question, quizLength, state, answers, onAnswerClick }) => (
  <div className={classes.ActiveQuiz}>
    <p className={classes.Question}>
      <span>
        <strong>{answerNumber}.</strong> &nbsp;
          {question}
      </span>
      <small>{answerNumber} from {quizLength}</small>
    </p>

    <AnswerList
      state={state}
      answers={answers}
      onAnswerClick={onAnswerClick}
    />
  </div>
)

export default ActiveQuiz;