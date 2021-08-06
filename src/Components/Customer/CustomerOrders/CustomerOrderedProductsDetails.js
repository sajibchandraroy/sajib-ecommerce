import React, { useContext } from 'react';
import { GroceryContext } from '../../../App';

const CustomerOrderedProductsDetails = ({ product }) => {
    const { products } = useContext(GroceryContext);
    const [allProducts, setAllProducts] = products;
    const productKeys = Object.keys(product);
    const productQuantity = Object.values(product)

    const listItems = productKeys.map((key) => {
        const quantity = product[key];
        const orderedProduct = allProducts.find(item => item.key === key);
        const orderedProductName = orderedProduct.name;
        return <li><b>Product Name:{orderedProductName},</b>  <span className="text-danger" >Quantity: {quantity}</span></li>
    });

    return (
        <div>
            {listItems}
        </div>
    );
};

export default CustomerOrderedProductsDetails;