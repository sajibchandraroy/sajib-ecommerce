import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { name, image, price, key } = props.product;    
    return (

        <div className="col-md-4">
            <div className="card border-info mb-3" >
                <div className="card-header text-center">                    
                    <img src={`data:image/png;base64,${image.img}`} className="rounded mx-auto d-block" alt="..." style={{ width: '60%', height: '60%' }} />
                </div>
                <div className="card-body text-black text-center">
                    <h4 > <Link to={"/product/" + key}>{name}</Link> </h4>
                    {/* <h4 >{name}</h4> */}
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
    );
};

export default Product;