import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GroceryContext } from '../../../App';
import logo from '../../../Images/logo/1.png'

const Navbar = () => {
    const { userl, cartItem, searchBarStatus } = useContext(GroceryContext);
    const [loggedInUser, setLoggedInUser] = userl;
    const [cart, setCart] = cartItem;
    const [searchBar, setSearchBar] = searchBarStatus;
    let history = useHistory();

    const handleLogout = () => {
        sessionStorage.clear();
        setLoggedInUser([])
        setLoggedInUser([]);
        setCart([]);
        history.push('/')
    }
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Online E-Store</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>


            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link to="/" > <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a></Link>
                    </li>
                    {loggedInUser.email ?
                        <li class="nav-item">
                            <Link to={{
                                pathname: "/dashboard",
                                state: 'SHOPPING'
                            }} > <a class="nav-link" href="#">Shopping Cart <span class="sr-only">(current)</span></a></Link>

                        </li> :
                        ""}
                </ul>



                <div className="row d-flex justify-content-end mr-3 ">

                    {loggedInUser.email ?
                        <div className="row d-flex justify-content-end ">
                            <img src={loggedInUser.photo} alt="" style={{ borderRadius: '40%', width: '10%' }} />
                            <button className="btn btn-link" style={{ textDecoration: 'none', color: 'black' }}>{loggedInUser.name}</button>
                            <button onClick={handleLogout} className="btn btn-danger my-2 ml-3" style={{ borderRadius: '30px', width: '120px' }}>
                                Logout</button>
                        </div>
                        : <Link to={{
                            pathname: "/dashboard",
                            state: 'SHOPPING'
                        }} > <button onClick={() => { setSearchBar(true) }} className="btn btn-danger my-2 ml-3" style={{ borderRadius: '30px', width: '120px' }}>Login</button> </Link>}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;