import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const ViewProduct = () =>{

    const [products,setProducts] = useState([]);
    useEffect(()=>{
        axios.get(`/api/view-products`).then(res=>{
            if(res.data.status === 200)
            {
                // console.warn(res.data.products);
                setProducts(res.data.products);

            }
        })
    },[]);

    const deleteProduct = (e,id) =>{
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-product/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal('Success',res.data.message,'success');
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 400)
            {
                swal('Warning',res.data.message,'warning');
                thisClicked.innerText="Delete";
            }
        });
    }
    return(
        <>
            <div className="container mt-4">
                <div className="card">

                    <div className="card-header">
                        <h2>View Products
                            <Link to="/admin/add-product" className="btn btn-sm btn-primary float-end">Add Product</Link>
                        </h2>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <td>ID</td>
                                    <td>Category</td>
                                    <td>Name</td>
                                    <td>Selling Price</td>
                                    <td>Original Price</td>
                                    <td>Image</td>
                                    <td>Status</td>
                                    <td>Edit</td>
                                    <td>Delete</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((items)=>{
                                        return(
                                            <tr key={items.id}>
                                                <td>{items.id}</td>
                                                <td>{items.category.name}</td>
                                                <td>{items.name}</td>
                                                <td>{items.selling_price}</td>
                                                <td>{items.original_price}</td>
                                                <td><img src={`http://localhost:8000/${items.image}`} height="50px" alt={items.name}/> </td>
                                                <td>{items.status === 0 ? "Shown" : "Hidden" }</td>
                                                <td><Link to={`/admin/edit-product/${items.id}`} className="btn btn-sm btn-primary">Edit</Link></td>
                                                <td><button className="btn btn-sm btn-danger" onClick={(e)=>deleteProduct(e,items.id)}>Delete</button></td>
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

export default ViewProduct;