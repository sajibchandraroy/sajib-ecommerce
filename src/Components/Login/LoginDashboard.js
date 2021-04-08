import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { GroceryContext } from '../../App';
import Navbar from '../Shared/Navbar/Navbar';
import Login from './Login';
import { initializeLoginFramework } from './LoginManager';
import Registration from './Registration';

const LoginDashboard = () => {
    const [newUserRegistration, setNewUserRegistration] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        photo: '',
        cell: ''
    });
    const { userl } = useContext(GroceryContext);
    const [loggedInUser, setLoggedInUser] = userl;
    const [newUser, setNewUser] = useState(false);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };     

    initializeLoginFramework();
    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        localStorage.setItem('currentuser', JSON.stringify(res));
        if (redirect) {
            history.replace(from);
        }
    }
    return (
        <div class="login">  
        <Navbar/>         
            <div class="container m-4">
                <div class="custom-control custom-checkbox mb-4">
                    <input type="checkbox" class="custom-control-input" id="newaccount" onChange={() => setNewUserRegistration(!newUserRegistration)} />
                    <label class="custom-control-label" for="newaccount">New User Registration</label>
                </div>
                <div class="row">
                    {newUserRegistration ?
                        <div class="col-lg-8 card p-3 border-warning">
                            <Registration handleResponse={handleResponse} user={user} setUser={setUser} />
                        </div>
                         : 
                        <div class="col-lg-8 card p-3 border-warning" >
                            <Login handleResponse={handleResponse} user={user} setUser={setUser} />                            
                        </div>
                     } 
                </div>
            </div>
        </div>
    );
};

export default LoginDashboard;