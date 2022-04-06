import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const EditProduct = () =>{

    // Api call for all categories
    const params = useParams();
    const product_id = params;
    const navigate = useNavigate();
    const [categoryList,setCategory] = useState([]);
    useEffect(()=>{
        axios.get('/api/all-categories').then(res=>{
            // console.warn(res.data.category);
            setCategory(res.data.category);
        })

        // console.warn("params",product_id['id']);

        axios.get(`/api/edit-product/${product_id['id']}`).then(res=>{
            if(res.data.status === 200)
            {

                setProduct(res.data.products);
                // console.warn(res.data.products);
            }
            else if (res.data.status === 404)
            {
                swal('Warning',res.data.message,'warning');

                navigate('/admin');

            }
        });
    },[product_id['id']]);


    // product set state
    const [productInput,setProduct] = useState({});

    const [pic,setImage] = useState([]);

    const handleInput = (e) =>{
        e.preventDefault();

        setProduct({
            ...productInput,
            [e.target.name]: e.target.value
        })
    }

    const handleImage = (e) =>{
        e.preventDefault();

        setImage({
            image: e.target.files[0]
        })


    }

    const [allCheckboxes,setCheckbox] = useState({});
    const handleCheckbox = (e) =>{
        e.preventDefault();
        setCheckbox({...allCheckboxes, [e.target.name]:e.target.checked});
    }

    const updateProduct = (e) =>{
        e.preventDefault();
        console.warn("Catgory id test",productInput     );
        // console.warn("product data ",productInput);
        const formData = new FormData();
        
        formData.append('image',pic.image);
        formData.append('category_id',productInput.category_id);
        formData.append('name',productInput.name);
        formData.append('slug',productInput.slug);
        formData.append('description',productInput.description);
        formData.append('meta_title',productInput.meta_title);
        formData.append('meta_keyword',productInput.meta_keyword);
        formData.append('meta_description',productInput.meta_description);
        formData.append('selling_price',productInput.selling_price);
        formData.append('original_price',productInput.original_price);
        formData.append('qty',productInput.qty);
        formData.append('brand',productInput.brand);
        formData.append('feature',allCheckboxes.feature ? 1 : 0);
        formData.append('popular',allCheckboxes.popular ? 1 : 0);
        formData.append('status',allCheckboxes.status ? 1 : 0);

        // console.warn(formData);

        console.warn("props id",product_id['id']);

        axios.post(`/api/update-product/${product_id['id']}`,formData).then(res =>{
            if(res.data.status === 200)
            {
                // console.log(allCheckboxes);
                swal("Success",res.data.message,'success');
                navigate('/admin/view-product')
            }
            else if(res.data.status === 400)
            {
                swal('Error',res.data.message,'error');
            }
        })

        
        
    }

    return(
        <>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">
                        <h4>
                            Edit Product
                            <Link to="/admin/view-product" className="btn btn-primary btn-sm float-end">View Products</Link>
                        </h4>
                    </div>
                    <div className="card-body">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seo-tab" data-bs-toggle="tab" data-bs-target="#seo" type="button" role="tab" aria-controls="seo" aria-selected="false">SEO Tags</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="other-tab" data-bs-toggle="tab" data-bs-target="#other" type="button" role="tab" aria-controls="other" aria-selected="false">Other Details</button>
                            </li>
                        </ul>
                        <form onSubmit={updateProduct} encType="multipart/form-data" id="add_product">
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="form-group mb-3">
                                            <label>Select Category</label>
                                            <select className="form-control" name="category" onChange={handleInput} value={productInput.category_id}>
                                                <option value="">select category</option>
                                                {
                                                    categoryList.map((item)=>{
                                                        return(
                                                            <option value={item.id} key={item.id}>{item.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                            {/* <span className="text-danger">{productInput.errors_list.category}</span> */}
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Name</label>
                                            <input type="text" name="name" className="form-control" onChange={handleInput} value={productInput.name}/>
                                            {/* <span className="text-danger">{productInput.errors_list.name}</span> */}
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Slug</label>
                                            <input type="text" className="form-control" name="slug" onChange={handleInput}  value={productInput.slug}/>
                                            {/* <span className="text-danger">{productInput.errors_list.slug}</span> */}
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Description</label>
                                            <textarea className="form-control" name="description" onChange={handleInput} value={productInput.description}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="seo" role="tabpanel" aria-labelledby="seo-tab">
                                    <div className="row">
                                        <div className="form-group mb-3">
                                            <label>Meta Title</label>
                                            <input type="text" className="form-control" name="meta_title" onChange={handleInput} value={productInput.meta_title}/>
                                            {/* <span className="text-danger">{productInput.errors_list.meta_title}</span> */}
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Meta Tags</label>
                                            <textarea name="meta_keyword" className="form-control" onChange={handleInput} value={productInput.meta_keyword}></textarea>
                                            {/* <span className="text-danger">{productInput.errors_list.meta_keyword}</span> */}
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Meta Description</label>
                                            <textarea name="meta_description" className="form-control" onChange={handleInput} value={productInput.meta_description}></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="other" role="tabpanel" aria-labelledby="other-tab">
                                    <div className="row">
                                        <div className="col-md-3 mb-3 form-group">
                                            <label>Selling Price</label>
                                            <input type="text" className="form-control" name="selling_price" onChange={handleInput} value={productInput.selling_price}/>
                                            {/* <span className="text-danger">{productInput.errors_list.selling_price}</span> */}
                                        </div>
                                        <div className="col-md-3 mb-3 form-group">
                                            <label>Original Price</label>
                                            <input type="text" className="form-control" name="original_price" onChange={handleInput} value={productInput.original_price}/>
                                            {/* <span className="text-danger">{productInput.errors_list.original_price}</span> */}
                                        </div>
                                        <div className="col-md-3 mb-3 form-group">
                                            <label>Quantity</label>
                                            <input type="text" className="form-control" name="qty" onChange={handleInput} value={productInput.qty}/>
                                            {/* <span className="text-danger">{productInput.errors_list.qty}</span> */}
                                        </div>
                                        <div className="col-md-3 mb-3 form-group">
                                            <label>Brand</label>
                                            <input type="text" className="form-control" name="brand" onChange={handleInput} value={productInput.brand}/>
                                            {/* <span className="text-danger">{productInput.errors_list.brand}</span> */}
                                        </div>
                                        <div className="col-md-8 mb-3 form-group">
                                            <label>Image</label>
                                            <input type="file" className="form-control" name="file" onChange={handleImage}/>
                                        </div>
                                        <div className="col-md-4 mb-3 form-group">
                                            <label>Uploaded Image</label>
                                            <img src={`http://127.0.0.1:8000/${productInput.image}`} alt={productInput.name} height="100px" className="mx-2"/>
                                        </div>
                                        <div className="col-md-4 mb-3 form-group">
                                            <label>Featured(Checked = Shown)</label>
                                            <input type="checkbox" name="feature" onChange={handleCheckbox} defaultChecked={allCheckboxes.feature === 1 ? true:false}/>
                                        </div>
                                        <div className="col-md-4 mb-3 form-group">
                                            <label>Popular(Checked = Shown)</label>
                                            <input type="checkbox" name="popular" onChange={handleCheckbox} defaultChecked={allCheckboxes.popular === 1 ? true:false}/>
                                        </div>
                                        <div className="col-md-4 mb-3 form-group">
                                            <label>Status(Checked = hide)</label>
                                            <input type="checkbox" className="h-50 w-50" name="status" onChange={handleCheckbox} defaultChecked={allCheckboxes.status === 1 ? true:false}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-2 float-end">Update Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditProduct;