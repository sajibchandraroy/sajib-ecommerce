import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GroceryContext } from '../../../App';
import { addToDatabaseCart, getDatabaseCart } from '../../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const { userl, cartItem, category, searchBarStatus, products } = useContext(GroceryContext);
    const [allProducts, setAllProducts] = products;
    const [cart, setCart] = cartItem;
    const [categoryProduct, setCategoryProduct] = category;
    const [loggedInUser, setLoggedInUser] = userl;
    const [searchBar, setSearchBar] = searchBarStatus;


    
    let names = []
    allProducts.map(item => {
        const productsCategory = item.category
        names.push(productsCategory)                
    })
    
    function getUnique(array){
        var uniqueArray = [];
        
        // Loop through array values
        for(let i=0; i < array.length; i++){
            if(uniqueArray.indexOf(array[i]) === -1) {
                uniqueArray.push(array[i]);
            }
        }
        return uniqueArray;
    }

    var uniqueNames = getUnique(names);    

    useEffect(() => {
        setCategoryProduct(allProducts)
        // fetch('http://localhost:5000/products')
        //     .then(res => res.json())
        //     .then(data => {
        //         setProducts(data)
        //         setCategoryProduct(data)
        //     })
    }, [allProducts])

    useEffect(() => {
        const getSavedItem = getDatabaseCart();
        const productKeys = Object.keys(getSavedItem);
        // const itc = getSavedItem[pd.key]
        // console.log(productKeys);
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


    const categorisedProduct = (product) => {       
        const selectedProduct = allProducts.filter(item => item.category === product);
        setCategoryProduct(selectedProduct)
    }

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

    return (
        <div className="m-2">
            <div class="row">
                <div class="col-6 col-md-4">
                    <div className="col-12">
                        <Cart cart={cart} >
                            <Link to={{
                                pathname: "/dashboard",
                                state: 'REVIEWORDERS'
                            }}>
                                <button className="cart-btn" onClick={() => { setSearchBar(false) }}>Order Review</button>
                            </Link>
                        </Cart>
                    </div>
                </div>
                <div class="col-6 col-md-8">
                    <div className="m-2">
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Categories of Products
                            </button>
                            <div class="dropdown-menu bg-light" aria-labelledby="dropdownMenu2">
                                {uniqueNames.map(item => <button class="dropdown-item" type="button" onClick={() => { categorisedProduct(item) }}>{item}</button>)}                                
                            </div>
                        </div>                        
                    </div>
                    <div className="d-flex flex-wrap">
                        {
                            categoryProduct.map(item => <Product key={item.key + Math.random()} product={item} handleCartProduct={handleCartProduct} handleCartProductReduce={handleCartProductReduce} showAddToCart={true} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;