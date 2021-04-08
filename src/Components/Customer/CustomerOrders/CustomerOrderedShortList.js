import React from 'react';
import CustomerOrderedProductsDetails from './CustomerOrderedProductsDetails';
import CustomerOrderedShipmentDetails from './CustomerOrderedShipmentDetails';

const CustomerOrderedShortList = ({ orders, allProducts}) => {   
    return (
        
            <div className="table-responsive">
                <table class="table table-bordered table-sm">
                    <thead class="thead-dark">
                        <tr>
                            <th className="" scope="col">Sr No</th>                            
                            <th className="" scope="col" style={{width: "6rem"}}>Amount($)</th>
                            <th className="" scope="col" style={{width: "6rem"}}>Payment_ID</th>
                            <th className="" scope="col">Product Details</th>
                            <th className="" scope="col">Shipment Details</th>
                            <th className="" scope="col">Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, index) =>
                                <tr key={order._id}>
                                    <td>{index + 1}</td>                                    
                                    <td>$ {order.amount}</td>
                                    <td>{order.paymentId}</td>
                                    <td>{<CustomerOrderedProductsDetails product={order.products} allProducts={allProducts}/>}</td>
                                    <td>{<CustomerOrderedShipmentDetails shipping={order.shipment} />}</td>
                                    <td >{order.status}</td>
                                </tr>
                            )
                        } 
                    </tbody>
                </table>
            </div>        
    );
};

export default CustomerOrderedShortList;