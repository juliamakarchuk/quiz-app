import React from 'react';

import classes from './AnswersItem.module.css';

const AnswersItem = ({ state, onAnswerClick, answer }) => {
    const cls = [classes.AnswersItem];

    if (state) {
        cls.push(classes[state])
    }

    return (
        <li
            className={cls.join(' ')}
            onClick={() => onAnswerClick(answer.id)}
        >
            {answer.text}
        </li>
    )
}

export default AnswersItem;