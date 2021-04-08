import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useContext } from 'react';
import { GroceryContext } from '../../../App';
import { getDatabaseCart, processOrder } from '../../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';


const Shipment = () => {
    // const { register, handleSubmit, watch, errors } = useForm();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [shippingData, setShippingData] = useState(null);
    const { userl, cartItem, payment } = useContext(GroceryContext);
    const [loggedInUser, setLoggedInUser] = userl;
    const [grandTotal, setGrandTotal] = payment;
    const [cart, setCart] = cartItem;

    const onSubmit = data => {
        setShippingData(data);
    };

    const handlePaymentSuccess = paymentId => {
        const savedCart = getDatabaseCart();
        console.log(savedCart)
        const orderDetails = {
            ...loggedInUser,
            products: savedCart,
            // products: cart,
            shipment: shippingData,
            amount: grandTotal,
            paymentId,
            orderTime: new Date(),
            status: 'Pending'
        };
        
        fetch('https://guarded-bastion-31565.herokuapp.com/addOrders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder();
                    alert('your order placed successfully');
                }
            })
    }

    console.log(watch("example")); // watch input value by passing the name of it
    return (
        <div className="row">
            <div style={{ display: shippingData ? 'none' : 'block' }} className="col-md-6">
                <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                    <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your Name" />
                    {errors.name && <span className="error">Name is required</span>}

                    <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email" />
                    {errors.email && <span className="error">Email is required</span>}

                    <input name="address" {...register("address", { required: true })} placeholder="Your Address" />
                    {errors.address && <span className="error">Address is required</span>}

                    <input name="phone" {...register("phone", { required: true })} placeholder="Your Phone Number" />
                    {errors.phone && <span className="error">Phone Number is required</span>}

                    <input type="submit" />
                </form>
            </div>
            <div style={{ display: shippingData ? 'block' : 'none' }} className="col-md-6">
                <h2>Please Pay for me</h2>
                <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
            </div>
        </div>
    );
};

export default Shipment;