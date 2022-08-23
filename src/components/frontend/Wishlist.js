import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Wishlist = ()=>{
    const navigate = useNavigate();

    let [wishlist,setWishlist] = useState([]);
    let [loading,setLoading] = useState(true);

    if(!localStorage.getItem('auth_token'))
    {
        navigate("/");
        swal("Warning","Login First to view Wishlist Data","warning");
    }

    useEffect(()=>{
        axios.get('/api/wishlist').then(res=>{
            if(res.data.status === 200)
            {
                setWishlist(res.data.wishlist);
                setLoading(false);
            }
            else if(res.data.status === 401)
            {
                navigate("/");
                swal("Error",res.data.message,'error');
            }
        });
    },[navigate]);


    // remove product from wishlist

    const removeProduct = (e,id) =>{
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting"; 

        axios.delete(`/api/delete-wishlist/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal('Success',res.data.message,'success');
                thisClicked.closest("tr").remove();

            }
        });
    }

    // product add to cart

    const addToCart = (e,id)=>{
        e.preventDefault();
        let cart_data ={
            product_id : id,
            product_qty : 1
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/add-to-cart`,cart_data).then(res=>{
                if(res.data.status === 201)
                {
                    swal("Success",res.data.message,'success');
                }
                else if(res.data.status === 409)
                {
                    swal("Warning",res.data.message,'warning');
                }
                else if(res.data.status === 401)
                {
                    swal("Error",res.data.message,'error');

                }
                else if(res.data.status === 404)
                {
                    swal("Error",res.data.message,'error');
                }
            });
        });
    }

    //  Loading Wishlist data functionality
    if(loading)
    {
        return <h4>Loading Wishlist Data...</h4>
    }

    var wishlist_html = '';

    if(wishlist.length > 0)
    {
        wishlist_html =
        <div className="row">  
            <div className="col-md-10">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th className="text-center">Price</th>
                                {/* <th className="text-center">Qty</th> */}
                                {/* <th className="text-center">Total Price</th> */}
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                wishlist.map( (items,idx)=>{

                                    return(

                                        <tr key={idx}>
                                            <td width="10%"><img src={`http://127.0.0.1:8000/${items.product.image}`} alt={items.product.name} width="50px" height="50px"/></td>
                                            <td>{items.product.name}</td>
                                            <td width="15%" className="text-center">{items.product.selling_price}</td>
                                            {/* <td width="15%">
                                                
                                                    <div className="form-control text-center">{items.product_qty}</div>
                                                   
                                            </td> */}
                                            <td width="21%">
                                                <button className="btn btn-primary btn-sm mx-1" onClick={(e)=>addToCart(e,items.product.id)}>add to cart</button>
                                                <button className="btn btn-danger btn-sm" onClick={(e)=>removeProduct(e,items.id)}>Remove</button>
                                            </td>
                                        </tr>
                                    )
                                })

                                
                            }
                        </tbody>
                        
                    </table>
                </div>
            </div>
    </div>
    }
    else
    {
        wishlist_html = <div className="table-responsive">
            <div className="card card-body my-4 text-center shadow-sm">
                <h4>Your Wishlist is Empty</h4>
            </div>
        </div>

    }

    
    
    return(
        <>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h4>Home {">"} Wishlist</h4>
                </div>
            </div>
            <div className="container my-4">
                {
                    wishlist_html
                }
                
            </div>
        </>
    );
}

export default Wishlist;