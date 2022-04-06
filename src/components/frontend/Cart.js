import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Cart = () =>{
    const navigate = useNavigate();

    let [cart,setCart] = useState([]);
    let [totalPrice,setTotalPrice] = useState(0);
    let [loading,setLoading] = useState(true);

    let total_amount = 0;
    if(!localStorage.getItem('auth_token'))
    {
        navigate("/");
        swal("Warning","Login First to view Cart Data","warning");
    }

    useEffect(()=>{
        axios.get('/api/cart').then(res=>{
            if(res.data.status === 200)
            {
                setCart(res.data.cart);
                setLoading(false);
            }
            else if(res.data.status === 401)
            {
                navigate("/");
                swal("Error",res.data.message,'error');
            }
        });
    },[navigate]);


    // increment decrement functions
    const handleDecrement = (itemId) =>{
        setCart(cart =>
            cart.map((item)=>
                 itemId === item.id ? {...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0)}  : item
            )
        )

        updateCartQuantity(itemId,'dec');
    }
    
    const handleIncrement = (itemId) =>{
        setCart(cart =>
            cart.map((item)=>
                itemId === item.id ? {...item, product_qty: item.product_qty + 1}  : item
            )
        )

        updateCartQuantity(itemId,'inc');
    }

    // Update quantity in database

    function updateCartQuantity(id,scop)
    {
        axios.put(`/api/update-cart/${id}/${scop}`).then(res=>{
            if(res.data.status === 200)
            {
                // swal("Success",res.data.message,'success');
            }
        })
    }

    // remove product from cart

    const removeProduct = (e,id) =>{
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-cart/${id}`).then(res=>{
            if(res.data.status === 200)
            {
                swal('Success',res.data.message,'success');
                thisClicked.closest("tr").remove();

            }
        });
    }

    //  Loading Cart data functionality
    if(loading)
    {
        return <h4>Loading Cart Data...</h4>
    }

    var cart_html = '';

    if(cart.length > 0)
    {
        cart_html =
        <div className="row">  
            <div className="col-md-8">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th className="text-center">Price</th>
                                <th className="text-center">Qty</th>
                                {/* <th className="text-center">Total Price</th> */}
                                <th className="text-center">Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map( (items,idx)=>{

                                    return(

                                        <tr key={idx}>
                                            <td width="10%"><img src={`http://127.0.0.1:8000/${items.product.image}`} alt={items.product.name} width="50px" height="50px"/></td>
                                            <td>{items.product.name}</td>
                                            <td width="15%" className="text-center">{items.product.selling_price}</td>
                                            <td width="15%">
                                                <div className="input-group">
                                                    <button className="input-group-text" onClick={()=>handleDecrement(items.id)}>-</button>
                                                    <div className="form-control text-center">{items.product_qty}</div>
                                                    <button className="input-group-text" onClick={()=>handleIncrement(items.id)}>+</button>
                                                </div>
                                            </td>
                                            {/* <td width="15%" className="text-center">{items.product_qty*items.product.selling_price}</td> */}
                                            <td width="10%"><button className="btn btn-danger btn-sm" onClick={(e)=>removeProduct(e,items.id)}>Remove</button></td>
                                        </tr>
                                    )
                                })

                                
                            }
                        </tbody>
                        
                    </table>
                </div>
            </div>
            <div className="col-md-4">
            <div className="card card-body">
                
                {/* <div className="card-body"> */}
                {
                    cart.map( (item, idx)=>{
                        total_amount += item.product.selling_price*item.product_qty;
                        return <h6 key={idx}>
                            {item.product.name}
                            <span className="float-end">Rs. {item.product.selling_price*item.product_qty}</span>
                            </h6>
                    })
                }
                    <h4>Grand Total<span className="float-end">Rs. {total_amount}</span></h4>
                    <hr/>
                    <Link to="/checkout" className="btn btn-primary btn-block">Checkout</Link>
                {/* </div> */}
            </div>
        </div>
    </div>
    }
    else
    {
        cart_html = <div className="table-responsive">
            <div className="card card-body my-4 text-center shadow-sm">
                <h4>Your Cart is Empty</h4>
            </div>
        </div>

    }

    
    
    return(
        <>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h4>Home {">"} Cart</h4>
                </div>
            </div>
            <div className="container my-4">
                {
                    cart_html
                }
                {/* <div className="row">
                    <div className="col-md-8">
                       {
                           cart_html
                       }
                    </div>
                    <div className="col-md-4">
                        <div className="card card-body">
                            
                           
                            {
                                cart.map( (item, idx)=>{
                                    total_amount += item.product.selling_price*item.product_qty;
                                    return <h6 key={idx}>
                                        {item.product.name}
                                        <span className="float-end">Rs. {item.product.selling_price*item.product_qty}</span>
                                        </h6>
                                })
                            }
                                <h4>Grand Total<span className="float-end">Rs. {total_amount}</span></h4>
                                <hr/>
                                <Link to="/checkout" className="btn btn-primary btn-block">Checkout</Link>
                            
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default Cart;