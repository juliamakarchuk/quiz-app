import React, { useState } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Select from '../../components/UI/Select/Select';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

import { createControl, validate, validateForm } from '../../form/formFramework';
import { finishCreateQuiz, createQuizQuestion } from '../../store/actions/create';

import classes from './QuizCreator.module.css';

function createOptionControl(number) {
    return createControl({
        label: `Option ${number}`,
        id: number,
        errorMessage: 'The Option can`t be empty'
    }, { required: true })
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Input Question',
            errorMessage: 'The Question can`t be empty'
        }, { required: true }),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

const QuizCreator = (props) => {

    let [isFormValid, setIsFormValid] = useState(false);
    let [rightAnswerId, setRightAnswerId] = useState(1);
    let [formControls, setFormControls] = useState(createFormControls());

    let submitHandler = (e) => {
        e.preventDefault();
    }

    let addQuestionHandler = (e) => {
        e.preventDefault();

        const { question, option1, option2, option3, option4 } = formControls;
        const questionItem = {
            question: question.value,
            id: props.length + 1,
            rightAnswerId: rightAnswerId,
            answers: [
                { text: option1.value, id: option1.id },
                { text: option2.value, id: option2.id },
                { text: option3.value, id: option3.id },
                { text: option4.value, id: option4.id }
            ]
        }

        props.createQuizQuestion(questionItem);

        setIsFormValid(false);
        setRightAnswerId(1);
        setFormControls(createFormControls());
    }

    let createQuizHandler = e => {
        e.preventDefault();

        setIsFormValid(false);
        setRightAnswerId(1);
        setFormControls(createFormControls());

        props.finishCreateQuiz()
    }

    let changeHandler = (value, controlName) => {
        const newFormControls = { ...formControls };
        const control = { ...newFormControls[controlName] }

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        newFormControls[controlName] = control;

        setIsFormValid(validateForm(formControls));
        setFormControls(newFormControls);

    }

    let renderControls = () => {
        return Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName]

            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={e => changeHandler(e.target.value, controlName)}
                    />
                    {index === 0 ? <hr /> : null}
                </Auxiliary>
            )
        })
    }

    let selectChangeHandler = e => {
        setRightAnswerId(+e.target.value);
    }

    const select = <Select
        label="Choose rights answer"
        value={rightAnswerId}
        onChange={selectChangeHandler}
        options={[
            { text: 1, value: 1 },
            { text: 2, value: 2 },
            { text: 3, value: 3 },
            { text: 4, value: 4 }
        ]}
    />

    return (
        <div className={classes.QuizCreator}>
            <div>
                <h1>Quiz Creator</h1>

                <form onSubmit={submitHandler}>

                    {renderControls()}

                    {select}


                    <Button
                        type="primary"
                        onClick={addQuestionHandler}
                        disabled={!isFormValid}
                    >Add quiz</Button>

                    <Button
                        type="success"
                        onClick={createQuizHandler}
                        disabled={props.quiz.length === 0}
                    >Create quiz</Button>
                </form>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)