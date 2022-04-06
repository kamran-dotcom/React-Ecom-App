import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const CategoryProducts = () =>{

    let {slug} = useParams();
    let navigate = useNavigate();

    let [products,setProducts] = useState([]);
    let [category,setCategory] = useState([]);

    let [loading,setLoading] = useState(true);

    useEffect(()=>{
        axios.get(`/api/category-products/${slug}`).then(res=>{
            if(res.data.status === 200)
            {
                setProducts(res.data.product_data.products);
                setCategory(res.data.product_data.category)

                setLoading(false);
            }
            else if(res.data.status === 404)
            {
                swal('Warning',res.data.message,'Error');
                navigate('/');
            }
        })
    },[slug,navigate]);

    let showProducts = '';
    if(loading)
    {
        return <h3>Loading...</h3>
    }
    else
    {

        showProducts = products.map((items,idx)=>{
            return (
                <div className="col-md-3" key={idx}>
                    <div className="card text-center">
                        <Link to={`/single-product/${items.slug}`}><img src={`http://127.0.0.1:8000/${items.image}`} alt={items.name} height="150px" width="150px" className="my-2"/></Link>
                        <div className="card-body">
                            <h5><Link to={`/single-product/${items.slug}`}>{items.name}</Link></h5>
                        </div>
                    </div>
                </div>
            )
        })
    }
    
    return(
    <>
        <div className="py-3 bg-warning">
            <div className="container">
                <h4>Category {">"} {category.name}</h4>
            </div>
        </div>
        <div className="container my-4">
            <div className="row">
                {showProducts}
            </div>
        </div>
    </>
    );
}
export default CategoryProducts;