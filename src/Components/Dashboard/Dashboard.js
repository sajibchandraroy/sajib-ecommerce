import { faCartArrowDown, faListAlt, faPlus, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { GroceryContext } from '../../App';
import AddProduct from '../Admin/Creation/AddNewProduct/AddProduct';
import MakeAdmin from '../Admin/Creation/MakeAdmin/MakeAdmin';
import OrdersList from '../Admin/CustomerOrders/OrdersList';
import AdminDelete from '../Admin/Delete/Admin/AdminDelete';
import PriceChangingAndDelete from '../Admin/Delete/ProductsPrice/PriceChangingAndDelete';
import CustomerOrderList from '../Customer/CustomerOrders/CustomerOrderList';
import Review from '../Customer/Review/Review';
import Shop from '../Customer/Shop/Shop';
import Footer from '../Shared/Footer/Footer';
import NavBarDashboard from './NavBarDashboard';


const Dashboard = () => {
    let history = useHistory();
    const location = useLocation();
    const { userl, searchBarStatus} = useContext(GroceryContext);
    const [loggedInUser, setLoggedInUser] = userl;
    const [selectedMenu, setSelectedMenu] = useState([]);
    const [searchBar, setSearchBar] = searchBarStatus;    
    const [isAdmin, setIsAdmin] = useState([]);    
    
    useEffect(() => {
        fetch('https://guarded-bastion-31565.herokuapp.com/isAdmin', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsAdmin(data));
    }, [])

    useEffect(() => {
        setSelectedMenu(location.state)
    }, [location.state])

    const signOut = () => {
        localStorage.clear();
        sessionStorage.clear();
        setLoggedInUser([])
        // handleSignOut()
        //     .then(res => {
        //         // sessionStorage.clear();
        //         setLoggedInUser(res);                
        history.push('/')
        // })
    }
    return (


        <div className="dashboard container-fluid">
            <NavBarDashboard />
            <main>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-2 bg-info " style={{ height: "90vh" }}>
                        <ul className="list-unstyled">
                            <li className={selectedMenu === 'SHOPPING' ? 'm-3 active' : 'm-3'} onClick={() => setSelectedMenu('SHOPPING')} >
                                <Link className="text-dark" onClick={() => { setSearchBar(true) }}>
                                    <FontAwesomeIcon icon={faCartArrowDown} /><span> Shopping Cart</span>
                                </Link>
                            </li>
                            <li className={selectedMenu === 'ORDERS' ? 'm-3 active' : 'm-3'} onClick={() => setSelectedMenu('ORDERS')} >
                                <Link className="text-dark" onClick={() => { setSearchBar(false) }}>
                                    <FontAwesomeIcon icon={faListAlt} /><span> Orders</span>
                                </Link>
                            </li>

                            {isAdmin ?
                                <div>
                                    <li className={selectedMenu === 'serviceList' ? 'm-3 active' : 'm-3'} onClick={() => { setSearchBar(false) }}>
                                        <Link className="text-dark">
                                            <FontAwesomeIcon icon={faListAlt} /> <span onClick={() => setSelectedMenu('serviceList')} >Ordered list</span>
                                        </Link>
                                    </li>
                                    <li className={selectedMenu === 'addService' ? 'm-3 active' : 'm-3'} onClick={() => { setSearchBar(false) }}>
                                        <Link className="text-dark">
                                            <FontAwesomeIcon icon={faPlus} /> <span onClick={() => setSelectedMenu('addService')} >Add New Products</span>
                                        </Link>
                                    </li>
                                    <li className={selectedMenu === 'makeAdmin' ? 'm-3 active' : 'm-3'} onClick={() => { setSearchBar(false) }}>
                                        <Link className="text-dark">
                                            <FontAwesomeIcon icon={faUserPlus} /> <span onClick={() => setSelectedMenu('makeAdmin')} >Make Admin</span>
                                        </Link>
                                    </li>
                                    <li className={selectedMenu === 'changeProducts' ? 'm-3 active' : 'm-3'} onClick={() => { setSearchBar(false) }}>
                                        <Link className="text-dark">
                                            <FontAwesomeIcon icon={faUserPlus} /> <span onClick={() => setSelectedMenu('changeProducts')} >Changing Products</span>
                                        </Link>
                                    </li>
                                    <li className={selectedMenu === 'changeAdmin' ? 'm-3 active' : 'm-3'} onClick={() => { setSearchBar(false) }}>
                                        <Link className="text-dark">
                                            <FontAwesomeIcon icon={faUserPlus} /> <span onClick={() => setSelectedMenu('changeAdmin')} >Changing Admin</span>
                                        </Link>
                                    </li>
                                </div>
                                :
                                ""
                            }
                        </ul>

                        <Link to="/" className="text-dark"><FontAwesomeIcon icon={faSignOutAlt} />
                            <span onClick={signOut}>Logout</span>
                        </Link>
                    </div>
                    <div className="col-12 col-md-10">
                        {selectedMenu === 'SHOPPING' && <Shop />}
                        {selectedMenu === 'REVIEWORDERS' && <Review />}
                        {selectedMenu === 'ORDERS' && <CustomerOrderList />}

                        {selectedMenu === 'serviceList' &&
                            <OrdersList isAdmin={isAdmin} />}
                        {selectedMenu === 'makeAdmin' && <MakeAdmin />}
                        {selectedMenu === 'addService' && <AddProduct />}
                        {selectedMenu === 'changeProducts' && <PriceChangingAndDelete />}
                        {selectedMenu === 'changeAdmin' && <AdminDelete />}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Dashboard;