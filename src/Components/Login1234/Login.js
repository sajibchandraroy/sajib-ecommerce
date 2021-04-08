
import React, { useState } from 'react';
import { useContext } from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { GroceryContext } from '../../App';
// import { signInWithEmailAndPassword } from './LoginManager';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';


// import LoginBg from '../../Images/Login/background.png';
import googleimage from "../../Images/Login/google-icon.png";
import fbimage from "../../Images/Login/fb.png";
import './Login.css';


const Login = () => {
    const { userl } = useContext(GroceryContext);
    const [loggedInUser, setLoggedInUser] = userl;
    const [newUser, setNewUser] = useState(false);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
    });

    initializeLoginFramework();

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const fbSignIn = () => {
        handleFbSignIn()
            .then(res => {
                handleResponse(res, true);
            })

    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        localStorage.setItem('currentuser', JSON.stringify(res));
        if (redirect) {
            history.replace(from);
        }
    }

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
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                    alert('Welcome to EGrocer, for New User Please logOut first for 1st time entry');
                })
        }

        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault();
    }

    return (

        <div className="container">

            <div className="row align-items-center" style={{ height: "100vh" }}>
                <h4 className="text-info">For Gmail user please login via <span className="text-danger"><b>"Continue with Google"</b></span> Button</h4>
                <div className="col-md-10">
                    <div className="border border-dark" >
                        <div>
                            <Link to="/">
                                {/* <img src={logo} style={{ width: 50, height: 50 }} alt="logo" /> */}
                                <h1>E-Grocery</h1>
                            </Link>
                        </div>
                        <h4>Login</h4>
                        <form onSubmit={handleSubmit}>
                            {newUser && <input type="text" className="inputBox" name="name" onBlur={handleBlur} placeholder="Your Name" />}
                            <br />
                            <input type="text" name="email" className="inputBox" onBlur={handleBlur} placeholder="Your Email address" required />
                            <br />
                            <input type="password" name="password" className="inputBox" onBlur={handleBlur} placeholder="Password" required />
                            <br />

                            <div className="d-flex justify-content-around">
                                <div><input type="checkbox" name="userRemember" id="" />
                                    <label htmlFor="userRemember">Remember me</label></div>
                                <a href="#">Forget Password</a>
                            </div>
                            <input type="submit" className="submitBox" value={newUser ? 'Sign Up' : 'Sign In'} />
                        </form>
                        <p style={{ color: 'red' }}>{user.error}</p>
                        {user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>}

                        <p className="no-account-text text-center">
                            Don't have an account?
                        <span
                                onClick={() => window.open("https://rb.gy/eibnw4", "_blank")}
                                className="create-account-link text-primary"
                            >
                                Create an Google account
                        </span>
                        </p>

                        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                        <label htmlFor="newUser"><b>New User Sign up</b></label><br></br>
                        <div className="d-flex justify-content-center mb-2">
                            <button onClick={googleSignIn} className="button"><img src={googleimage} style={{ width: 20, height: 20 }} alt="" />Continue with Google</button>
                            {/* <button onClick={fbSignIn} className="button"><img src={fbimage} style={{ width: 20, height: 20 }} alt="" />Continue with Facebook</button> */}
                            <br></br>
                        </div>
                    </div>
                </div>


                <div className="col-md-2 d-none d-md-block align-self-end">
                    {/* <img className="img-fluid" src={LoginBg} alt="" /> */}
                </div>
            </div>
        </div>











        // <div style={{ textAlign: 'center' }}>
        //     { user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
        //         <button onClick={googleSignIn}>Sign In</button>
        //     }
        //     <br />
        //     <button onClick={fbSignIn}>Sign in using Facebook</button>
        //     {
        //         user.isSignedIn && <div>
        //             <p>Welcome, {user.name}!</p>
        //             <p>Your email: {user.email}</p>
        //             <img src={user.photo} alt="" />
        //         </div>
        //     }

        //     <h1>Our own Authentication</h1>
        //     <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
        //     <label htmlFor="newUser">New User Sign up</label>
        //     <form onSubmit={handleSubmit}>
        //         {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name" />}
        //         <br />
        //         <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required />
        //         <br />
        //         <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
        //         <br />
        //         <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
        //     </form>
        //     <p style={{ color: 'red' }}>{user.error}</p>
        //     { user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>}
        // </div>
    );
};

export default Login;