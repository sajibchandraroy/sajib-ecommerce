import React from 'react';

const ShippingDetails = ({shipping}) => {
    // console.log(shipping)
    return (
        <div className="col-12">
            <small>
            <p><b>Name:</b>{shipping.name}</p>
            <p><b>Cell:</b>{shipping.phone}</p>
            <p><b>Address:</b>{shipping.address}</p>
            <p><b>Email:</b>{shipping.email}</p></small>
            {/* <ul>
                <li>{shipping.name}</li>
                <li>{shipping.phone}</li>
                <li>{shipping.address}</li>
                <li>{shipping.email}</li>
            </ul> */}
        </div>
    );
};

export default ShippingDetails;