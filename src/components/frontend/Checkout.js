import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Checkout = () =>{
    
    let navigate = useNavigate();
    let total_amount = 0;
    let [cartProduct,setCartProduct] = useState([]);
    let [loading,setLoading] = useState(true);
    let [error,setError] = useState([]);
    let [orderInput,setOrderInput] = useState({
        'first_name':'',
        'last_name':'',
        'email':'',
        'phone':'',
        'city':'',
        'state':'',
        'zipcode':'',
        'address':'',
        'card_no':'',
        'expiry_month':'',
        'expiry_year':'',
        'cvc':'',
        'amount':''
    });

    const handleInput = (e) =>{
        let name =  e.target.name;
        let value = e.target.value;

        setOrderInput({...orderInput,[name]:value})
    }
    

    useEffect(()=>{
        axios.get('/api/cart').then(res=>{
            if(res.data.status === 200)
            {
                setCartProduct(res.data.cart);
                setLoading(false);
            }
            else if(res.data.status === 401)
            {
                navigate("/");
                swal("Error",res.data.message,'error');
            }
        });
    },[navigate]);

    //  Loading Cart data functionality
    if(loading)
    {
        return <h4>Loading Checkout Page...</h4>
    }

    const submitOrder = (e) =>{
        e.preventDefault();

        axios.post(`/api/place-order`,orderInput).then(res=>{
            if(res.data.status === 200)
            {
                swal("Order Placed Successfully",res.data.message,'success');
                setError([]);
                navigate('/thank-you');
            }
            else if(res.data.status === 422)
            {
                
                swal("error","All fields are manadatory","error");
                setError(res.data.errors);
            }
        });
    }

    const grandTotal=()=>{
        let total = 0; 
        cartProduct.map((item,idx)=>
            total += item.product.selling_price*item.product_qty);

            return total;
    }

    // print checkout data
    let checkoutHTML = '';
    if(cartProduct.length > 0)
    {
        checkoutHTML = 
        <div className="row">
            <div className="col-md-7">
                <div className="card">
                    <div className="card-header">
                        <h5>Client & Payment Information</h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>First Name</label>
                                    <input type="text" name="first_name" onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{error.first_name}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input type="text" name="last_name" onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{error.last_name}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="text" name="email" onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{error.email}</span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input type="text" name="phone" onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{error.phone}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>City</label>
                                    <input type="text" name="city" onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{error.city}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>State</label>
                                    <input type="text" name="state" onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{error.state}</span>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label>Zipcode</label>
                                    <input type="text" name="zipcode" onChange={handleInput} className="form-control"/>
                                    <span className="text-danger">{error.zipcode}</span>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Full Address</label>
                                    <textarea className="form-control" onChange={handleInput} name="address"></textarea>
                                    <span className="text-danger">{error.address}</span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <h6 className="text-center my-2">Card Detail</h6>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Card Number</label>
                                    <input type="number" className="form-control" onChange={handleInput} name="card_no"></input>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>CVC</label>
                                    <input type="number" className="form-control" onChange={handleInput} name="cvc"></input>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Expiry Year</label>
                                    <input type="number" className="form-control" onChange={handleInput} name="expiry_year"></input>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Expiry Month</label>
                                    <input type="number" className="form-control" onChange={handleInput} name="expiry_month"></input>
                                </div>
                            </div>
                            {/* <input type="text" value={grandTotal()} onChange={handleInput} name="amount"/> */}
                        </div>
                            <button className="btn btn-primary my-2 float-end" onClick={(e)=>submitOrder(e)}>Place Order</button>
                    </div>
                </div>
            </div>
            <div className="col-md-5">
                <div className="card">
                    <div className="card-header">
                        <h5>Order Detail</h5>
                    </div>
                    <div className="card-body">
                        {
                            cartProduct.map((item,idx)=>{
                                total_amount += item.product.selling_price*item.product_qty;
                                return (

                                    <h6 key={idx}>
                                        {item.product.name}
                                        <span className="float-end">Rs. {item.product.selling_price*item.product_qty}</span>
                                    </h6>
                                )
                                
                            })
                        }
                        <h4>
                            Grand Total
                            <span className="float-end">Rs. {total_amount}</span>
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    }
    else
    {
        checkoutHTML = <div className="table-responsive">
            <div className="card card-body my-4 text-center shadow-sm">
                <h4>You are in checkout but your cart is empty</h4>
            </div>
        </div>

    }
    return(
        <>
            <div className="py-3 bg-warning">
                <div className="container">
                    <h4>Home {">"} Checkout</h4>
                </div>
            </div>
            <div className="container my-4">
                {
                    checkoutHTML
                }
                {/* <div className="row">
                    <div className="col-md-7">
                        <div className="card">
                            <div className="card-header">
                                <h5>Client Basic Information</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input type="text" name="first_name" onChange={handleInput} className="form-control"/>
                                            <span className="text-danger">{error.first_name}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input type="text" name="last_name" onChange={handleInput} className="form-control"/>
                                            <span className="text-danger">{error.last_name}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="text" name="email" onChange={handleInput} className="form-control"/>
                                            <span className="text-danger">{error.email}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input type="text" name="phone" onChange={handleInput} className="form-control"/>
                                            <span className="text-danger">{error.phone}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input type="text" name="city" onChange={handleInput} className="form-control"/>
                                            <span className="text-danger">{error.city}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>State</label>
                                            <input type="text" name="state" onChange={handleInput} className="form-control"/>
                                            <span className="text-danger">{error.state}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Zipcode</label>
                                            <input type="text" name="zipcode" onChange={handleInput} className="form-control"/>
                                            <span className="text-danger">{error.zipcode}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Full Address</label>
                                            <textarea className="form-control" onChange={handleInput} name="address"></textarea>
                                            <span className="text-danger">{error.address}</span>
                                        </div>
                                    </div>
                                </div>
                                    <button className="btn btn-primary my-2 float-end" onClick={(e)=>submitOrder(e)}>Place Order</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-header">
                                <h5>Order Detail</h5>
                            </div>
                            <div className="card-body">
                                {
                                    cartProduct.map((item,idx)=>{
                                        total_amount += item.product.selling_price*item.product_qty;
                                        return (
                                            <h6 key={idx}>
                                                {item.product.name}
                                                <span className="float-end">Rs. {item.product.selling_price*item.product_qty}</span>
                                            </h6>
                                        )
                                        
                                    })
                                }
                                <h4>
                                    Grand Total
                                    <span className="float-end">Rs. {total_amount}</span>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default Checkout;