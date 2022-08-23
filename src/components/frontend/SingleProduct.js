import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

const SingleProduct = () =>{
    let [product, setProduct] = useState({});
    let [loading, setLoading] = useState(true);
    let [quantity,setQuantity] = useState(1);
    let {slug} = useParams();
    
    useEffect(()=>{
        
        axios.get(`/api/single-product/${slug}`).then(res=>{
            // console.warn(res.data.product);
            if(res.data.status === 200)
            {
                setProduct(res.data.product);
                setLoading(false);
            }
        });
    },[slug]);

    // Increment decrement hooks -start
    const incrementQty = () =>{
        if(quantity < product.qty)
        {

            setQuantity(prevValue => prevValue + 1)
        }
    }
    const decrementQty = () =>{
        if(quantity > 1)
        {

            setQuantity(prevValue => prevValue - 1)
        }
    }
    // increment decrement End 

    // loading Start
        if(loading)
        {
            return <h1>Loading...</h1>
        }

// Stack available or not
    if(product.qty > 0)
    {
        var stack = 
        <div>
            <label className="btn btn-success btn-sm px-4 mt-4">{product.qty} products In Stock</label>
            <div className="row">
                <div className="col-md-3 mt-3">

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <button onClick={decrementQty} className="input-group-text">-</button>
                        </div>
                        {/* <input type="text"  value=/> */}
                        <div className="form-control">{quantity}</div>
                        <div className="input-group-append">
                            <button onClick={incrementQty} className="input-group-text">+</button>
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-3 mt-3">
                    <button className="btn btn-sm btn-primary" onClick={(e)=>addToCart(e)}>ADD to Cart</button>
                </div> */}
            </div>
            <div className="row">
            <div className="col-md-3 mt-3">
                    <button className="btn btn-sm btn-primary" onClick={(e)=>addToCart(e)}>ADD to Cart</button>
                </div>
                <div className="col-md-3 mt-3">
                    <button className="btn btn-sm btn-info" onClick={(e)=>addToWishlist(e)}>Add Wishlist</button>
                </div>

            </div>
        </div>
    }
    else
    {
        stack = <div>
             <label className="btn btn-danger btn-sm px-4 mt-4">Out of Stock</label>
        </div>
    }


    // addToCart 
    const addToCart = (e) =>{
        e.preventDefault();

        // alert("test");
        let cart_data = {
            'product_id': product.id,
            'product_qty': quantity
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
            });
        });

    }

    // add to wishlist
    const addToWishlist = (e)=>{
        e.preventDefault();
        let wish_data ={
            'product_id':product.id,
            'product_qty':product.qty
        }

        axios.get('/sanctum/csrf-cookie').then(response =>{
            axios.post(`/api/add-to-wishlist`,wish_data).then(res=>{
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
            });
        });
    }
   
    return (
    <>
        <div className="py-3 bg-warning">
            <div className="container">
                <h4>Category {">"} {product?.category?.name} {">"} {product?.name}</h4>
            </div>
        </div>
        <div className="container my-2">
            <div className="row">
                <div className="col-md-4">
                    <img src={`http://127.0.0.1:8000/${product?.image}`} alt={product?.name} className="border-end w-100"/>
                </div>
                <div className="col-md-8">
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <h4 className="mb-1">
                        Rs. {product?.selling_price}
                        <s className="ms-2">Rs. {product?.original_price}</s>
                    </h4>
                    {
                        stack
                    }

                    {/* <div>
                        <label className="btn btn-success btn-sm px-4 mt-4">In Stock</label>
                        <div className="row">
                            <div className="col-md-3 mt-3">

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">-</span>
                                    </div>
                                    <input type="text" className="form-control" value={1}/>
                                    <div className="input-group-append">
                                        <button className="input-group-text">+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 mt-3">
                                <button className="btn btn-sm btn-primary">ADD to Cart</button>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </>
    // <h1>abc</h1>
    );
}

export default SingleProduct;