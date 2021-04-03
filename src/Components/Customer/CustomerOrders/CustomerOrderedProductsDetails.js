import React, { useContext } from 'react';

const CustomerOrderedProductsDetails = ({product, allProducts}) => {
    // const { userl, cartItem, payment, products } = useContext(GroceryContext); 
    // const [allProducts, setAllProducts] = products; 
    // console.log(allProducts)   
    const productKeys = Object.keys(product);
    const productQuantity = Object.values(product)   

     const listItems =  productKeys.map((number) => {      
        const x = number
        const y = product[number]
        const orderedProduct = allProducts.find(item => item.key === x);
        // console.log(orderedProduct)
        const orderedProductName = orderedProduct.name
        // console.log(orderedProductName)
        return <li><b>Product Name:{orderedProductName},</b>  <span className="text-danger" >Quantity: {y}</span></li>
    }); 
    
    return (
        <div>
            {listItems}

        </div>
    );
};

export default CustomerOrderedProductsDetails;