import './App.css';
import React, { createContext, useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Dashboard from './Components/Dashboard/Dashboard';
import Navbar from './Components/Shared/Navbar/Navbar';
import Home from './Components/Home/Home';
import Footer from './Components/Shared/Footer/Footer';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import sslCommerzePayment from './Components/Customer/ProcessPayment/sslCommerzePayment';
import Success from './Components/Customer/Shipment/Success';
import NavBarDashboard from './Components/Dashboard/NavBarDashboard';
import LoginDashboard from './Components/Login/LoginDashboard';

export const GroceryContext = createContext();

function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [grandTotal, setGrandTotal] = useState([]);
    const [categoryProduct, setCategoryProduct] = useState(allProducts);
    const [selectedMenu, setSelectedMenu] = useState([]);
    const [searchBar, setSearchBar] = useState([]);
    const [isUpdated, setIsUpdated] = useState([Math.random()]);
    const currentUser = localStorage.getItem('currentuser');
    const signedInUser = JSON.parse(currentUser);
    useEffect(() => { 
        if(!signedInUser){            
        }
        else{
            setLoggedInUser(signedInUser)            
        }
    }, [])
    
    useEffect(() => {
        fetch('https://guarded-bastion-31565.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            setAllProducts(data)
        })
    }, [isUpdated])

    return (
        <GroceryContext.Provider value={{ userl: [loggedInUser, setLoggedInUser], update: [isUpdated, setIsUpdated], searchBarStatus: [searchBar, setSearchBar], setstate: [selectedMenu, setSelectedMenu], products: [allProducts, setAllProducts], cartItem: [cart, setCart], payment: [grandTotal, setGrandTotal], category: [categoryProduct, setCategoryProduct] }}>
            <Router>
                <Switch>
                    <PrivateRoute path="/dashboard">
                        <Dashboard />
                    </PrivateRoute>

                    <Route path="/login">
                        <LoginDashboard />
                    </Route>
                    <Route path="/success">
                        <NavBarDashboard />
                        <Success />
                    </Route>
                    <Route path="/home">
                        <Navbar />
                        <Home />
                        <Footer />
                    </Route>
                    <Route exact path="/">
                        <Navbar />
                        <Home />
                        <Footer />
                    </Route>
                </Switch>
            </Router>
        </GroceryContext.Provider>

    );
}

export default App;
