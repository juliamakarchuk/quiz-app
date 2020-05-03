import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Loader from '../../components/UI/Loader/Loader';

import classes from './QuizList.module.css';

import { fetchQuizes } from '../../store/actions/quiz';

const QuizList = ({ fetchQuizes, quizes, loading }) => {

    useEffect(() => {
        fetchQuizes();
    }, [fetchQuizes]);

    let renderQuizes = () => {
        return quizes.map(quiz => {
            return (
                <li
                    key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    return (
        <div className={classes.QuizList}>
            <div>
                <h1>Quiz List</h1>
                {
                    loading && quizes !== 0
                        ? <Loader />
                        : <ul>
                            {renderQuizes()}
                        </ul>
                }
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)