import React, { useContext, useEffect, useState } from 'react';
import { GroceryContext } from '../../../App';
import CustomerOrderedShortList from './CustomerOrderedShortList';

const CustomerOrderList = () => {
    const [orders, setOrders] = useState([]);
    const { userl, cartItem, payment, products } = useContext(GroceryContext);
    const [loggedInUser, setLoggedInUser] = userl;
    const [allProducts, setAllProducts] = products;
    
    useEffect(() => {
        fetch('https://guarded-bastion-31565.herokuapp.com/customerOrders?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // authorization: `Bearer ${sessionStorage.getItem('token')}`
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            });
    }, [])    
    return (
        <div>
            <div class="d-flex bd-highlight">
                <div class="mr-auto bd-highlight"><h2><b>Customer Ordered details</b></h2></div>                
            </div>           
            <div>
                {
                    orders.length > 0 ? <CustomerOrderedShortList orders={orders} />
                        :
                        <div className="p-5">
                            <h4 className="lead text-center">No orders found. Order now!</h4>
                        </div>
                }
            </div>
        </div>
    );
};

export default CustomerOrderList;