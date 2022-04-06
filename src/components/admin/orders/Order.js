import axios from "axios";
import React, { useEffect, useState } from "react";

const Order = () =>{

    let [order,setOrder] = useState([]);
    let [loading,setLoading] = useState(true);

    useEffect(()=>{
        axios.get('/api/get-orders').then(res=>{
            if(res.data.status === 200)
            {
                setOrder(res.data.order);
                setLoading(false);
            }
        })
        
        // setLoading(false);
    },[]);

    if(loading)
    {
        return <h3>Loading ...</h3>
    }
    
    return (
        <>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">
                        <h4>
                            Order Data
                        </h4>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Contact</th>
                                    <th>Tracking Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    order.map((item)=>{
                                        return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.first_name} {item.last_name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.tracking_number}</td>
                                            
                                            {/* <td>Delete</td> */}
                                        </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Order;