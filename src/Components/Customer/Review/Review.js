import React, { useState, useEffect, useContext } from 'react';
import { GroceryContext } from '../../../App';
import { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import Shipment from '../Shipment/Shipment';
import ShipmentSslcommerze from '../Shipment/ShipmentSslcommerze';

const Review = () => {
    const { cartItem, payment } = useContext(GroceryContext);
    const [grandTotal, setGrandTotal] = payment;
    const [cart, setCart] = cartItem;
    const [orderPlace, setOrderPlace] = useState(false);
    // const [bill, setBill] = useState(grandTotal);

    useEffect(() => {
        const getSavedItem = getDatabaseCart();        
        const productKeys = Object.keys(getSavedItem);       
        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => {
                data.map(pd => {
                    const itc = getSavedItem[pd.key]
                    pd.quantity = itc                   
                })
                setCart(data)
            })
    }, [])
    let count = 1;
    let totalCartProduct = [];

    const handleCartProductReduce = (product) => {
        const productKey = product.key;
        const sameProduct = cart.find(item => item.key === productKey);
        // let count = 1;
        // let totalCartProduct = [];          
        if (sameProduct) {
            let x = sameProduct.quantity
            if (x >= 1) {
                count = sameProduct.quantity - 1;
                sameProduct.quantity = count;
                const othersProduct = cart.filter(item => item.key !== productKey);
                totalCartProduct = [...othersProduct, sameProduct];
                setCart(totalCartProduct);
                addToDatabaseCart(product.key, count);
            }
        }
        else {
            // product.quantity = 0;
            totalCartProduct = [...cart];
        }
    }

    const handleCartProduct = (product) => {
        const productKey = product.key;
        const sameProduct = cart.find(item => item.key === productKey);
        // let count = 1;
        // let totalCartProduct = [];
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const othersProduct = cart.filter(item => item.key !== productKey);
            totalCartProduct = [...othersProduct, sameProduct];
        } else {
            product.quantity = 1;
            totalCartProduct = [...cart, product];
        }
        setCart(totalCartProduct);
        addToDatabaseCart(product.key, count);
    }

    const removeProduct = (productKey) => {
        const product = cart.filter(item => item.key !== productKey)
        setCart(product);
        removeFromDatabaseCart(productKey);
    }

    const orderPlaceHandle = () => {        
        setOrderPlace(true);
    }
    
    return (
        <div className="m-2" >
            { orderPlace ?
                // <Shipment
                // grandTotal={bill}
                // /> 
                <ShipmentSslcommerze/>
                
                
                :
                <div className="m-2">
                    <div class="row">
                        <div class="col-6 col-md-3">
                            <div className="col-11">
                                <Cart cart={cart}>
                                    <button className="cart-btn" onClick={orderPlaceHandle}>Place Order</button>
                                </Cart>
                            </div>
                        </div>
                        <div class="col-6 col-md-9 ">
                            <div className="pl-4">
                                <h3 className="ml-4">Products in Cart:</h3>
                                <div >
                                    <div className="d-flex flex-wrap ">
                                        {
                                            cart.map(item => <ReviewItem key={item.key} product={item} removeProduct={removeProduct} handleCartProduct={handleCartProduct} handleCartProductReduce={handleCartProductReduce}></ReviewItem>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default Review;