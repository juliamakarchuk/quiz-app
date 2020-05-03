import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../UI/Button/Button';

import classes from './FinishedQuiz.module.css';

const FinishedQuiz = ({ results, quiz, onRetry }) => {

    let successCount = Object.keys(results).reduce((total, key) => {
        if (results[key] === 'success') total++

        return total
    }, 0);

    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {
                    quiz.map((quizItem, index) => {
                        const cls = [
                            'fa',
                            results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                            classes[results[quizItem.id]]
                        ]
                        return (
                            <li key={index}>
                                <strong>{index + 1}. </strong> &nbsp;
                          {quizItem.question}
                                <i className={cls.join(' ')} />
                            </li>
                        )
                    })
                }
            </ul>

            <p>Amount of right answers {successCount} : {quiz.length}</p>

            <div>
                <Button onClick={onRetry} type='primary'>Try again</Button>
                <Link to='/'>
                    <Button type='success'>List of tests</Button>
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz;