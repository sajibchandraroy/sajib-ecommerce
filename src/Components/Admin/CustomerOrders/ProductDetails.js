import React, { useContext, useEffect, useState } from 'react';
import { GroceryContext } from '../../../App';

const ProductDetails = ({ product }) => {
    const { userl, cartItem, payment, products } = useContext(GroceryContext);
    const [allProducts, setAllProducts] = products;
    const productKeys = Object.keys(product);
    const productQuantity = Object.values(product)

    const listItems = productKeys.map((number) => {
        const x = number
        const y = product[number]
        const orderedProduct = allProducts.find(item => item.key === x);
        // console.log(orderedProduct)
        const orderedProductName = orderedProduct.name
        // console.log(orderedProductName)
        return (
            <div className="col-12">
                <ul><small>
                    <li>
                        <b>Product Name:  </b>{orderedProductName}
                        <ul>
                            <li><b>Quantity:  </b><span className="text-danger" >{y}</span></li>
                        </ul>
                    </li></small>
                </ul>


                {/* <li>
                    <b>Product Name:</b>{orderedProductName},
                <b>Quantity:</b>  <span className="text-danger" >{y}</span>
                </li> */}



            </div>
        )
    });

    return (
        <div>
            {listItems}
        </div>
    );
};

export default ProductDetails;