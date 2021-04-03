import './App.css';
import React, { createContext, useState } from "react";
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
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const GroceryContext = createContext();

function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [grandTotal, setGrandTotal] = useState([]);
    const [categoryProduct, setCategoryProduct] = useState([]);
    const [selectedMenu, setSelectedMenu] =  useState([]);
    const [searchBar, setSearchBar] = useState([]);
    const [isUpdated, setIsUpdated] = useState([Math.random()]);
    
    return (
        <GroceryContext.Provider value={{ userl: [loggedInUser, setLoggedInUser], update: [isUpdated, setIsUpdated], searchBarStatus: [searchBar, setSearchBar], setstate: [selectedMenu, setSelectedMenu], products: [allProducts, setAllProducts], cartItem: [cart, setCart], payment: [grandTotal, setGrandTotal], category: [categoryProduct, setCategoryProduct] }}>
            <Router>                
                <Switch>                                       
                    <PrivateRoute path="/dashboard">
                        <Dashboard />
                    </PrivateRoute>

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

                    <Route path="/login">
                        <Login />
                    </Route>
                   
                </Switch>
            </Router>
        </GroceryContext.Provider>

    );
}

export default App;
