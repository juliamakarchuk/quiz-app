import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader';
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz';

import classes from './Quiz.module.css'

const Quiz = (props) => {

    useEffect(() => {
        props.fetchQuizById(props.match.params.id);

        return () => props.retryQuiz()
        // eslint-disable-next-line
    }, [])

    return (
        <div className={classes.Quiz}>

            <div className={classes.QuizWrapper}>
                <h1>Fill all questions</h1>
                {
                    props.loading || !props.quiz
                        ? <Loader />
                        : props.isFinished
                            ? <FinishedQuiz
                                results={props.results}
                                quiz={props.quiz}
                                onRetry={props.retryQuiz}
                            />
                            : <ActiveQuiz
                                answers={props.quiz[props.activeQuestion].answers}
                                question={props.quiz[props.activeQuestion].question}
                                onAnswerClick={props.quizAnswerClick}
                                quizLength={props.quiz.length}
                                answerNumber={props.activeQuestion + 1}
                                state={props.answerState}
                            />
                }
            </div>
        </div>
    )
}


function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        activeQuestion: state.quiz.activeQuestion,
        isFinished: state.quiz.isFinished,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);