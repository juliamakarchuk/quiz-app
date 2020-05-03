import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { auth } from '../../store/actions/auth';

import classes from './Auth.module.css';

let controls = {
    email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Input right email',
        valid: false,
        touched: false,
        validation: {
            required: true,
            email: true
        }
    },
    password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Input right password',
        valid: false,
        touched: false,
        validation: {
            required: true,
            minLength: 6
        }
    }
}

const Auth = (props) => {

    let [isFormValid, setIsFormValid] = useState(false);
    let [formControls, setFormControls] = useState(controls);

    let loginHandler = () => {
        props.auth(
            formControls.email.value,
            formControls.password.value,
            true
        );
    }

    let registerHandler = () => {
        props.auth(
            formControls.email.value,
            formControls.password.value,
            false
        );
    }

    let submitHandler = (e) => {
        e.preventDefault()
    }

    let validateControl = (value, validation) => {
        if (!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            let reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,4})$/;
            isValid = reg.test(value) && isValid;
        }

        if (validation.minLength) {
            isValid = value.trim().length >= validation.minLength && isValid
        }

        return isValid;
    }

    let onChangeHandler = (e, controlName) => {
        const newFormControls = { ...formControls };
        const control = { ...newFormControls[controlName] }

        control.value = e.target.value;
        control.touched = true;
        control.valid = validateControl(control.value, control.validation);
        newFormControls[controlName] = control;

        let isFormValid = true

        Object.keys(newFormControls).forEach(name => {
            isFormValid = newFormControls[name].valid && isFormValid
        })

        setIsFormValid(isFormValid);
        setFormControls(newFormControls);
    }

    let renderInputs = () => {
        return Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName];

            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    touched={control.touched}
                    valid={control.valid}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={e => onChangeHandler(e, controlName)}
                />
            )
        })
    }
    return (
        <div className={classes.Auth}>
            <div>
                <h1>Auth</h1>
                <form onSubmit={submitHandler} className={classes.AuthForm}>

                    {renderInputs()}

                    <Button
                        type='success'
                        onClick={loginHandler}
                        disabled={!isFormValid}
                    >
                        Log in</Button>

                    <Button
                        type='primary'
                        onClick={registerHandler}
                        disabled={!isFormValid}
                    >
                        Sign in</Button>
                </form>
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth)