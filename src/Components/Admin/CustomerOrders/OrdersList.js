import React, { useContext, useEffect, useState } from 'react';
import { GroceryContext } from '../../../App';
import OrdersDataTable from './OrdersDataTable';



const OrdersList = ({ isAdmin }) => {
    const { userl, cartItem, payment, products } = useContext(GroceryContext);
    const [loggedInUser, setLoggedInUser] = userl;
    const [allProducts, setAllProducts] = products;
    const [orders, setOrders] = useState([]);
    const [isUpdated, setIsUpdated] = useState([Math.random()]);
   

    useEffect(() => {
        fetch('http://localhost:5000/orders?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: { isAdmin }
            },
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setOrders(data)
            })
    }, [isUpdated]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => {
            setAllProducts(data)                
        })  

    }, [])
    return (
        <div className="col-12">
            <div class="d-flex bd-highlight">
                <div class="mr-auto bd-highlight"><h2><b>List of Orders</b></h2></div>
                {/* <div class="p-2 bd-highlight"><img src={loggedInUser.photo} width="50px" height="auto" alt="" /></div>
                <div class="p-2 bd-highlight"><b>User: {loggedInUser.name}</b></div> */}
            </div>
            <OrdersDataTable orders={orders} setIsUpdated={setIsUpdated} />
        </div>

    );
};

export default OrdersList;