import { faMinus, faPlus, faRemoveFormat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const { name, image, price, key, quantity } = props.product;
    
    return (
        <div className="col-md-4 m-2">
            
            <div className="card border-info mb-3" >
                <div className="card-header text-center">                    
                    <img src={`data:image/png;base64,${image.img}`} className="rounded mx-auto d-block" alt="..." style={{ width: '60%', height: '60%' }} />
                </div>
                <div className="card-body text-black text-center">
                    <h4> {name}</h4>
                    <p>Quantity : {quantity}</p>
                    <h5 className="card-text ">${price}</h5>
                    <div className="row justify-content-center">
                        <FontAwesomeIcon icon={faPlus} onClick={() => { props.handleCartProduct(props.product) }} />
                        <button className="mx-3" onClick={() => { props.removeProduct(key) }}>
                            <FontAwesomeIcon icon={faRemoveFormat} /> Remove</button>
                        <FontAwesomeIcon icon={faMinus} onClick={() => { props.handleCartProductReduce(props.product) }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;