import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useContext } from 'react';
import { GroceryContext } from '../../../App';
import { getDatabaseCart, processOrder } from '../../../utilities/databaseManager';


const ShipmentSslcommerze = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [shippingData, setShippingData] = useState(null);
    const { userl, cartItem, payment } = useContext(GroceryContext);
    const [loggedInUser, setLoggedInUser] = userl;
    const [grandTotal, setGrandTotal] = payment;
    const [cart, setCart] = cartItem;
    const [sslCommerze, setSslCommerze] = useState(null);
    const [data, setData] = useState([])  

    const onSubmit = data => {
        setShippingData(data);
        const savedCart = getDatabaseCart();
        const orderDetails = {
            ...loggedInUser,
            products: savedCart,            
            shipment: data,
            amount: grandTotal,            
            orderTime: new Date(),
            status: 'Pending'
        };

        console.log(orderDetails);

        fetch('https://guarded-bastion-31565.herokuapp.com/pay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                processOrder();
                if (data) {                   
                    alert('your order placed successfully');
                    // setData(data)
                    // setSslCommerze(data)
                    window.location.replace(`${data.redirectGatewayURL}`)
                    // window.open(`${data.redirectGatewayURL}`, '_blank');
                }
            })
    };
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
                
            </div>
            
        </div>
    );
};

export default ShipmentSslcommerze;