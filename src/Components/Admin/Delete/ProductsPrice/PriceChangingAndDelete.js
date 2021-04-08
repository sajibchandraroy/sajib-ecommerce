import React, { useContext, useEffect, useState } from 'react';
import { GroceryContext } from '../../../../App';
import ProductDetailsForDelete from './ProductDetailsForDelete';

const PriceChangingAndDelete = () => {
    const { userl, cartItem, payment, products, searchBarStatus, update } = useContext(GroceryContext);
    const [allProducts, setAllProducts] = products;
    const [isUpdated, setIsUpdated] = update; 
    
    
    const handleDelete = (product, e) => {
        const id = product._id
        fetch(`https://guarded-bastion-31565.herokuapp.com/deleteproduct/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {
                    console.log(data)
                    e.target.parentNode.style.display = 'none';
                }
            })
    }

    return (
        <div>
            <h2><b>Changing Product Price from DataBase:</b></h2>
            <div className="row">
                {
                    allProducts.length > 0 ?                    
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Price Changing Action</th>
                                    <th scope="col">Product Delete Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    allProducts.map((item, index) => <ProductDetailsForDelete index={index} key={item.key + Math.random()} product={item} setIsUpdated={setIsUpdated} handleDelete={handleDelete} />)
                                }
                            </tbody>
                        </table>
                        :

                        <div className="p-5">
                            <h4 className="lead text-center">No Products found. !</h4>
                        </div>
                }
            </div>
        </div>
    );
};

export default PriceChangingAndDelete;