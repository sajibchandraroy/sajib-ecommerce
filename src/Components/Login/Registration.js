import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from './LoginManager';

const Registration = (props) => {   

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
        if (props.user.email && props.user.password) {
            createUserWithEmailAndPassword(props.user.firstName, props.user.lastName, props.user.email, props.user.password, props.user.cell)
                .then(res => {
                    props.handleResponse(res, true);
                    alert('Welcome to EGrocer, for New User Please logOut first for 1st time entry');
                })
        }
        
        e.preventDefault();
    }


    return (
        <div>
            <div class="register-form">
            <form onSubmit={handleSubmit}>
                <div class="row">
                    <div class="col-md-6">
                        <label>First Name</label>
                        <input class="form-control" type="text" name="firstName" placeholder="First Name" onBlur={handleBlur}/>
                    </div>
                    <div class="col-md-6">
                        <label>Last Name"</label>
                        <input class="form-control" type="text" name="lastName" placeholder="Last Name" onBlur={handleBlur}/>
                    </div>
                    <div class="col-md-6">
                        <label>E-mail</label>
                        <input class="form-control" type="text" name="email" placeholder="E-mail" onBlur={handleBlur} />
                    </div>
                    <div class="col-md-6">
                        <label>Mobile No</label>
                        <input class="form-control" type="text" name="cell" placeholder="Mobile No" onBlur={handleBlur}/>
                    </div>
                    <div class="col-md-6">
                        <label>Password</label>
                        <input class="form-control" type="text" placeholder="Password" />
                    </div>
                    <div class="col-md-6">
                        <label>Retype Password</label>
                        <input class="form-control" type="text" name="password" placeholder="Password" onBlur={handleBlur}/>
                    </div>
                    <div class="col-md-12">
                        <button class="btn mt-4 border-dark text-danger">Submit</button>
                    </div>
                </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;