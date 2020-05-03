import React from 'react';

import AnswerItem from './AnswerItem/AnswersItem';

import classes from './AnswersList.module.css';

const AnswersList = ({ state, answers, onAnswerClick }) => (
  <ul className={classes.AnswersList}>
    {answers.map((answer, index) => {
      return (
        <AnswerItem
          key={index}
          answer={answer}
          state={state ? state[answer.id] : null}
          onAnswerClick={onAnswerClick}
        />
      )
    })}
  </ul>
)

export default AnswersList;