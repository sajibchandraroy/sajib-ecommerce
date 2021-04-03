import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProductDetails from './ProductDetails';
import ShippingDetails from './ShippingDetails';


const OrdersDataTable = (props) => {
    const orders = props.orders
    // orders.map(pd => {
    //     // console.log(pd.products, pd.shipment)       
    // })

    const handleChange = (id, e) => {
        const status = e.target.value;
        const updatedOrder = { id, status };
        console.log(id)

        fetch(`http://localhost:5000/updateOrder/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedOrder)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data) {
                    props.setIsUpdated(Math.random())
                    alert('Status Updated Successfully')
                }
            })

    }


    return (

        <div>
            <table class="table"
            // className="table table-borderless"
            >
                <thead class="thead-dark"
                // style={{ backgroundColor: '#dfe6e9', color: '#636e72' }}
                >
                    <tr>
                        <th className="" scope="col">Sr No</th>
                        {/* <th className="" scope="col">Name</th> */}
                        {/* <th className="" scope="col">Email ID</th> */}
                        <th className="" scope="col">Amount($)</th>
                        <th className="" scope="col">Payment_ID</th>
                        <th className="" scope="col">Product Details</th>
                        <th className="" scope="col">Shipment Details</th>
                        <th className="" scope="col">Status</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, index) =>
                            <tr>
                                <td>{index + 1}</td>
                                {/* <td>{order.name}</td> */}
                                {/* <td>{order.email}</td> */}
                                <td>$ {order.amount}</td>
                                <td><small>{order.paymentId}</small></td>
                                <td>{<ProductDetails product={order.products} />}</td>
                                <td>{<ShippingDetails shipping={order.shipment} />}</td>
                                <td >
                                    <select className={(order.status === "Done" && "btn text-success") ||
                                        (order.status === "Pending" && "btn text-danger") ||
                                        (order.status === "On Going" && "btn text-warning")}
                                        name="status" value={order.status}
                                        onChange={(e) => handleChange(order._id, e)} >
                                        <option className="dropdown-item" value="Done">Done</option>
                                        <option className="dropdown-item" value="Pending">Pending</option>
                                        <option className="dropdown-item" value="On Going">On Going</option>
                                    </select>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>


        </div>





    );
};

export default OrdersDataTable;