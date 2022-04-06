import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Home = () =>{

    const [category,setCategory] = useState([]);

    const [products,setProducts] = useState([]);

    // const [loading,setLoading] = useState(true);

    
    useEffect(()=>{
        
        
        axios.get(`/api/frontend-categories`).then(res=>{
            if(res.data.status === 200)
            {
                setCategory(res.data.categories);
                // setLoading(false);
            }
        });
        axios.get(`/api/frontend-products`).then(res=>{
            if(res.data.status === 200)
            {
                setProducts(res.data.products);
            }
        });



},[]);

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-12">
                    <h3 className="text-center">Categories Section</h3>
                </div>
            </div>
           <div className="row">
               {
                   category.length ? category.map((items, idx)=>{
                       return (
                            <div className="col-md-3" key={idx}>
                                <div className="card">
                                    {/* <img src="" className="card-img-top" alt="..." 
                                    height="150px"/>             */}
                                    <div className="card-body">
                                        <h5 className="card-title">{items.name}</h5>
                                        <p className="card-text">{items.description}</p>
                                        <Link to={`/category/${items.slug}`} className="btn btn-primary">View Category Products</Link>
                                    </div>
                                </div>
                            </div>
                       )
                   }) : <p>Loading...</p>
               }  
           </div>

           {/* <hr className="my-4"/> */}
           <div className="row my-4">
               <div className="col-md-12">
               <h3 className="text-center">Product Section</h3>
               </div>
           </div>

           <div className="row">
                {
                   products.length ? products.map((items, idx)=>{
                       return (
                            <div className="col-md-3" key={idx}>
                                <div className="card">
                                    <img src={`http://127.0.0.1:8000/${items.image}`} className="card-img-top" alt="..." 
                                    height="150px"/>            
                                    <div className="card-body">
                                        <h5 className="card-title">{items.name}</h5>
                                        <p className="card-text">{items.description}</p>
                                        <Link to={`/single-product/${items.slug}`} className="btn btn-primary">Goto Product Specification</Link>
                                    </div>
                                </div>
                            </div>
                       )
                   }): <p>Loading...</p>
               }
           </div>
        </div>
    );
}
export default Home;