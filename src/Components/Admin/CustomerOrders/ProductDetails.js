import React, { useContext, useEffect, useState } from 'react';
import { GroceryContext } from '../../../App';

const ProductDetails = ({ product }) => {
    const { userl, cartItem, payment, products } = useContext(GroceryContext);
    const [allProducts, setAllProducts] = products;
    const productKeys = Object.keys(product); 

    const listItems = productKeys.map(async (number) => {
        const productKey = number
        const productQuantity = product[number]
        const productList = await allProducts;
        const orderedProduct = await productList.find(item => item.key === productKey);        
        const orderedProductName = await orderedProduct.name
        
        return (
            <div className="col-12">
                {/* <ul><small>
                    <li>
                        <b>Product Name:  </b>{orderedProductName}
                        <ul>
                            <li><b>Quantity:  </b><span className="text-danger" >{productQuantity}</span></li>
                        </ul>
                    </li></small>
                </ul> */}                
            </div>
        )
    });

    return (
        <div>
            {/* {listItems} */}
            test 
        </div>
    );
};

export default ProductDetails;