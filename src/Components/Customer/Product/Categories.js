import React from 'react';

const Categories = (props) => {
    const { category } = props.product;
    return (
        <div class="list-group">            
            <button type="button" class="list-group-item list-group-item-action" onClick={() => { props.categorisedProduct(props.product) }} >
                <h5>{category}</h5>
                </button>            
        </div>

    );
};

export default Categories;