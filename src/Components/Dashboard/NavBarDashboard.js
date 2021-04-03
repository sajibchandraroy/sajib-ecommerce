import React, { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { GroceryContext } from '../../App';
import { handleSignOut } from '../Login/LoginManager';



const NavBarDashboard = () => {
    const { userl, cartItem, category, products, searchBarStatus} = useContext(GroceryContext);   
    const [allProducts, setAllProducts] = products;
    const [loggedInUser, setLoggedInUser] = userl;
    const [cart, setCart] = cartItem;
    const [categoryProduct, setCategoryProduct] = category;   
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const currentform = useRef(null);
    const [info, setInfo] = useState({});    
    const [searchBar, setSearchBar] = searchBarStatus;    

    const handleSearch = e => {
        var searchText = e.target.value.toLowerCase();
        var matched = allProducts.filter(item => 
            // item.category.toLowerCase().includes(searchText) || 
            // item.name.toLowerCase().includes(searchText));
            item.name.toLowerCase().startsWith(searchText));
        setCategoryProduct(matched);
    }

    const onSubmit = data => {
        var searchText = data.search.toLowerCase();
        var matched = allProducts.filter(item => 
            // item.category.toLowerCase().includes(searchText) || 
            item.name.toLowerCase().includes(searchText));
        setCategoryProduct(matched);
        currentform.current.reset();        
    }

    let history = useHistory();

    const handleLogout = () => {
        handleSignOut()
            .then(res => {
                localStorage.clear();
                sessionStorage.clear();
                setLoggedInUser(res);
                history.push('/home')
            })
    }
    
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">E-GROCERY</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link to="/" > <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a></Link>
                    </li>
                    <li class="nav-item" onClick={() => {setSearchBar(true)}}>
                        <Link to={{
                            pathname: "/dashboard",
                            state: 'SHOPPING'
                        }} > <a class="nav-link" href="#" >Shopping Cart <span class="sr-only">(current)</span></a></Link>
                    </li>
                    <li class="nav-item"><Link to="/#contact" >
                        <a class="nav-link" href="#">Contact Us</a></Link>
                    </li>
                </ul>
                {searchBar ?
                <form class="form-inline my-2 my-lg-0" ref={currentform} onSubmit={handleSubmit(onSubmit)} >
                    <input onKeyUp={handleSearch} class="form-control mr-sm-2" {...register("search", { required: true })} placeholder="Search" aria-label="Search" />
                    {errors.search && <span>This field is required</span>}
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
                 : "" } 


                {loggedInUser.email ?
                    <div className="row d-flex justify-content-end "><img src={loggedInUser.photo} alt="" style={{ borderRadius: '40%', width: '10%' }} /><button className="btn btn-link" style={{ textDecoration: 'none', color: 'black' }}>{loggedInUser.name}</button>

                        <button onClick={handleLogout} className="btn btn-danger my-2 ml-3" style={{ borderRadius: '30px', width: '120px' }}>
                            Logout</button>

                    </div>
                    : <Link to="/dashboard" > <button className="btn btn-danger my-2 ml-3" style={{ borderRadius: '30px', width: '120px' }}>Login</button> </Link>}
            </div>
        </nav>
    );
};

export default NavBarDashboard;