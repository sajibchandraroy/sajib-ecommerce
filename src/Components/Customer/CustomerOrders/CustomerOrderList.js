import React, { useContext, useEffect, useState } from 'react';
import { GroceryContext } from '../../../App';
import CustomerOrderedShortList from './CustomerOrderedShortList';

const CustomerOrderList = () => {
    const [orders, setOrders] = useState([]);
    const { userl, cartItem, payment, products } = useContext(GroceryContext);
    const [loggedInUser, setLoggedInUser] = userl;
    const [allProducts, setAllProducts] = products;

    useEffect(() => {
        fetch('http://localhost:5000/customerOrders?email=' + loggedInUser.email, {
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

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                setAllProducts(data)
            })

    }, [])
    return (
        <div>
            <h1>Customer Ordered details</h1>
            <div className="row">
                {
                    orders.length > 0 ? <CustomerOrderedShortList orders={orders} allProducts={allProducts} />
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