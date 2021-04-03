import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// npm command for Font Awesome
// npm i--save @fortawesome/fontawesome-svg-core \
// @fortawesome/free-solid-svg-icons \
// @fortawesome/react-fontawesome

const Product = (props) => {
    const { name, image, price, key } = props.product;
    // console.log(name)
    return (

        <div className="col-md-4">
            <div className="card border-info mb-3" >
                <div className="card-header text-center">
                    {/* <img src={img} className="rounded mx-auto d-block" alt="..." style={{ width: '60%', height: '60%' }} /> */}
                    <img src={`data:image/png;base64,${image.img}`} className="rounded mx-auto d-block" alt="..." style={{ width: '60%', height: '60%' }} />
                </div>
                <div className="card-body text-black text-center">
                    {/* <h4 > <Link to={"/product/" + key}>{name}</Link> </h4> */}
                    <h4 >{name}</h4>
                    <h5 className="card-text ">Price: ${price}</h5>
                    <div className="row justify-content-center">
                        <FontAwesomeIcon icon={faPlus} onClick={() => { props.handleCartProduct(props.product) }} />
                        {
                            props.showAddToCart &&
                            <button className="mx-3" onClick={() => { props.handleCartProduct(props.product) }}>
                                <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
                        }
                        <FontAwesomeIcon icon={faMinus} onClick={() => { props.handleCartProductReduce(props.product) }} />
                    </div>

                </div>
            </div>
        </div>




        // <div className="card" style={{ width: '10%', height:'13%' }}>
        //     <img src={img} class="card-img-top" alt="..." />
        //     <div class="card-body">
        //         <h4 > <Link to={"/product/" + key}>{name}</Link> </h4>
        //         <p class="card-text">${price}</p>
        //         {
        //             props.showAddToCart &&
        //             <button onClick={() => { props.handleCartProduct(props.product) }}>
        //                 <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
        //         }
        //     </div>
        // </div>






        // <div className="product">
        //     <div style={{ marginRight: '5px' }}>
        //         <img src={img} alt="" style={{ width:'50%', height:'70%' }}/>
        //     </div>
        //     <div>
        //         <h4 className="product-name"> <Link to={"/product/" + key}>{name}</Link> </h4>
        //         {/* <p><small>by: {seller}</small></p> */}
        //         <p>${price}</p>
        //         {/* <p><small>only {stock} left in stock - order soon</small></p> */}
        //         {
        //              props.showAddToCart &&
        //             <button className="cart-btn" onClick={() => { props.handleCartProduct(props.product) }}>
        //                 <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
        //         }
        //     </div>
        // </div>
    );
};

export default Product;