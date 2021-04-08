import React, { useState } from 'react';

import { handleForgetPassword, handleGoogleSignIn, signInWithEmailAndPassword } from './LoginManager';
import googleimage from "../../Images/Login/google-icon.png";
import fbimage from "../../Images/Login/fb.png";
import './Login.css';


const Login = (props) => {
    const [forgetPassword, setForgetPassword] = useState(false);   

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...props.user };
            newUserInfo[e.target.name] = e.target.value;
            props.setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if (!forgetPassword && props.user.email && props.user.password) {
            console.log("user login")
            signInWithEmailAndPassword(props.user.email, props.user.password)
                .then(res => {
                    props.handleResponse(res, true);
                })
        }
        else if (forgetPassword && props.user.email) {
            handleForgetPassword(props.user.email)
        }
        e.preventDefault();
    }

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                props.handleResponse(res, true);
            })
    }

    

    return (
        <div>
            <div class="login-form">
                <form onSubmit={handleSubmit}>
                    <div class="row">
                        <div class="col-md-6">
                            <label>E-mail / Username</label>
                            <input class="form-control" type="text" name="email" placeholder="E-mail / Username" onBlur={handleBlur} />
                        </div>
                        {!forgetPassword &&
                            <div class="col-md-6">
                                <label>Password</label>
                                <input class="form-control" type="text" name="password" placeholder="Password" onBlur={handleBlur} />
                            </div>}
                        <div class="col-md-12">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" onChange={() => setForgetPassword(!forgetPassword)} class="custom-control-input" id="forgetpassword" />
                                <label class="custom-control-label" for="forgetpassword">Forget Password</label>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <button class="btn mt-4 border-dark text-danger">Submit</button>
                        </div>
                    </div>
                </form>
                <button onClick={googleSignIn} className="btn mt-4 border-dark text-info"><img src={googleimage} style={{ width: 20, height: 20 }} alt="" />Continue with Google</button>
            </div>
        </div>
    );
};

export default Login;