import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

const EditCategory = (props) =>{
    const [categoryInput,setCategory] = useState([]);

    const params = useParams();

    const navigate = useNavigate();

    const category_id = params;

    useEffect(() =>{

        // const id = {category_id};
        console.warn(category_id['id']);
        axios.get(`/api/edit-category/${category_id['id']}`).then(res=>{
            if(res.data.status === 200)
            {
                setCategory(res.data.category);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                
                navigate('/admin');
            }

        })
    },[category_id['id']]);

    const handleInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;

        setCategory({
            ...categoryInput,
            [name] : value
        });

    }

    const updateCategory = (e) =>{
        e.preventDefault();

        axios.put(`/api/update-category/${category_id['id']}`,categoryInput).then(res=>{
            if(res.data.status === 200)
            {
                // alert("data updated");
                swal("Success",res.data.message,"success");
                navigate('/admin/view-categories')
            }
            else if(res.data.status === 400)
            {
                swal("Error",res.data.message,"error");
                
                navigate('/admin/edit-category/:id');
            }
        })
    }
    return (
        <>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">
                        <h4 className="mt-4">Edit Category
                        <Link to="/admin/category" className="btn btn-sm btn-primary float-end">Back</Link>
                        </h4>
                    </div>
                    <div className="card-body">
                    
                    <form onSubmit={updateCategory}>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="seo-tags-tab" data-bs-toggle="tab" data-bs-target="#seo-tags" type="button" role="tab" aria-controls="seo-tags" aria-selected="false">SEO Tags</button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="form-group mb-3">
                                    <label>Slug</label>
                                    <input type="text" className="form-control" name="slug" onChange={handleInput} value={categoryInput.slug}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" className="form-control" name="name" onChange={handleInput} value={categoryInput.name}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Description</label>
                                    <textarea className="form-control" name="description" onChange={handleInput} value={categoryInput.description}></textarea>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Status</label>
                                    <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status}/>Status=0 Shown/1=Hidden 
                                </div>
                            </div>
                            <div className="tab-pane card-body border fade" id="seo-tags" role="tabpanel" aria-labelledby="seo-tags-tab">
                                <div className="form-group mb-3">
                                    <label>Meta Title</label>
                                    <input type="text" className="form-control" name="meta_title" onChange={handleInput} value={categoryInput.meta_title}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Tags</label>
                                    <input type="text" className="form-control" name="meta_tag" onChange={handleInput} value={categoryInput.meta_tag}/>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Meta Description</label>
                                    <input type="text" className="form-control" name="meta_description" onChange={handleInput} value={categoryInput.meta_description}/>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary my-2 float-end ">Update</button>
                    </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditCategory;