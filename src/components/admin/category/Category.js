import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Category = () => {
    const [categoryInput, setCategory]= useState({
        'slug':'',
        'name':'',
        'status':'',
        'description':'',
        'meta_title':'',
        'meta_tags':'',
        'meta_description':'',
        'error_list':[]

    });

    const handleInput = (e) =>{
        let value = e.target.value;
        let name = e.target.name;
        setCategory({
            ...categoryInput,
            [name]:value
        });
    }

    const submitForm = (e) =>{
        e.preventDefault();
        const data = {
            slug:categoryInput.slug,
            name:categoryInput.name,
            status:categoryInput.status,
            description:categoryInput.description,
            meta_title:categoryInput.meta_title,
            meta_tags:categoryInput.meta_tags,
            meta_description:categoryInput.meta_description,

        };

        // console.warn("data: ",categoryInput);
        axios.post('/api/store-category',categoryInput).then((res)=>{
            if(res.data.status === 200)
            {
                swal("Success",res.data.message,"success");
                document.getElementById("category_form").reset();
            }
            else if(res.data.status === 400)
            {
                setCategory({...categoryInput,error_list:res.data.errors})
            }
        })
    }
    var display_error = [];

    if(categoryInput.error_list)
    {
        display_error = [
            categoryInput.error_list.slug,
            categoryInput.error_list.name,
            categoryInput.error_list.description,
            categoryInput.error_list.meta_title,
            categoryInput.error_list.meta_tags,
            categoryInput.error_list.meta_description,
        ];
    }
    return (

        <div className="container-fluid mt-4">
            <div className="card">
                <div className="card-header">
                    <h4 className="mt-4">Add Category
                        <Link to="/admin/view-categories" className="btn btn-sm btn-primary float-end">View Category</Link>
                    </h4>
                </div>
                <div className="card-body">
                
            {
                display_error.map((item,idx)=>{
                    return(
                        <p className="mb-1" key={idx}>{item}</p>
                    )

                })
            }

            <form onSubmit={submitForm} id="category_form">
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
                            <input type="text" className="form-control" name="meta_tags" onChange={handleInput} value={categoryInput.meta_tags}/>
                        </div>
                        <div className="form-group mb-3">
                            <label>Meta Description</label>
                            <input type="text" className="form-control" name="meta_description" onChange={handleInput} value={categoryInput.meta_description}/>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary my-2 float-end ">Submit</button>
            </form>
                </div>
            </div>
        </div>
    );
}

export default Category;