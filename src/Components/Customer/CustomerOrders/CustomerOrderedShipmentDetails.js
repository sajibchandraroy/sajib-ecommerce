import React from 'react';

const CustomerOrderedShipmentDetails = ({shipping}) => {
    
    return (
        <div className="col-12">
            {/* <p>{shipping.name}</p>
            <p>{shipping.phone}</p> */}
            <p>{shipping.address}</p>
            {/* <p>{shipping.email}</p> */}
            {/* <ul>
                <li>{shipping.name}</li>
                <li>{shipping.phone}</li>
                <li>{shipping.address}</li>
                <li>{shipping.email}</li>
            </ul> */}
        </div>
    );
};

export default CustomerOrderedShipmentDetails;