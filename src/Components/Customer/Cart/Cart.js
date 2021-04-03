import React, { useContext } from 'react';
import { GroceryContext } from '../../../App';

import './Cart.css';


const Cart = (props) => {
    const { payment } = useContext(GroceryContext);
    const [grandTotal, setGrandTotal] = payment;

    // console.log(payment)
    const cart = props.cart;
    cart.map(item => {
        console.log(item)
    })
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    let shipping = 0;
    if (totalPrice > 35) {
        shipping = 0
    } else if (totalPrice >= 1 ) {
        shipping = 4.99
    }
        // else if(totalPrice == 0){
        //     shipping = 0
        // }
    
    const grandTotal1 = shipping + totalPrice;
    setGrandTotal(grandTotal1)

    const convertToFixed = (num) => {
        return num.toFixed(2);
    }
    return (
        <div>
            {/* <h3>Order Summery : {cart.length}</h3>
            <p>Shipping : {convertToFixed(shipping)}</p> */}


            <h3><b>Cart:</b></h3>
            <div class="table-responsive-sm">
                <table class="table table-hover table-bordered table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) =>
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                </tr>
                            )
                        }

                        <tr>
                            <th scope="col">Total</th>
                            <th scope="col">Item Price:</th>
                            <th scope="col"></th>
                            <th scope="col">{convertToFixed(totalPrice)}</th>
                        </tr>
                        <tr>
                            <th scope="col">Shipping </th>
                            <th scope="col">price:</th>
                            <th scope="col"></th>
                            <th scope="col">{convertToFixed(shipping)}</th>
                        </tr>
                        <tr>
                            <th scope="col">Grand </th>
                            <th scope="col">Total:</th>
                            <th scope="col"></th>
                            <th scope="col">{convertToFixed(grandTotal1)}</th>
                        </tr>
                    </tbody>
                </table>
            </div>




            {/* <h4>Total Item Price : {convertToFixed(totalPrice)}</h4>
            <h3 className="order-Total">Order Total : {convertToFixed(grandTotal1)}</h3> */}
            {
                props.children
            }

        </div>
    );
};

export default Cart;