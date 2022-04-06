import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const ViewCategories = () =>{

    const [categoryList,setCategoryList] = useState([]);

    useEffect(()=>{
        axios.get(`/api/view-category`).then(res=>{
            if(res.status === 200)
            {
                setCategoryList(res.data.category);
            }
        })
    },[]);

    const deleteCategory = (e,id) =>
    {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting";

        axios.delete(`/api/delete-category/${id}`).then((res)=>{
            if(res.data.status === 200)
            {
                swal('Success',res.data.message,'success');
                thisClicked.closest("tr").remove();
            }
            else if (res.data.status === 400)
            {
                swal('Error',res.data.message,'error');
                thisClicked.innerText="Delete";
            }
        });
    }
    return(
        <>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">
                        <h4>Category List
                        <Link to="/admin/category" className="btn btn-sm btn-primary float-end">Add Category</Link>
                        </h4>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Slug</th>
                                    <th>Status</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categoryList.map((item)=>{
                                        return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.slug}</td>
                                            <td>{item.status === 0 ? 'Shown':'Hidden'}</td>
                                            <td><Link to={`/admin/edit-category/${item.id}`} className="btn btn-sm btn-success">Edit</Link></td>
                                            <td><button onClick={(e) => deleteCategory(e,item.id)} className="btn btn-sm btn-danger">Delete</button></td>
                                            {/* <td>Delete</td> */}
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

export default ViewCategories;