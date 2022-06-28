import React from "react";
import { FormAuth } from "../forms/Forms";
import './login-form.scss'

const LoginForm = ({sodienthoai=''}) => {
    return (
        <div className="login-form container">
            <FormAuth/>
            <div className="login-form__slide">
                
            </div>
        </div>
    )
}

export default LoginForm