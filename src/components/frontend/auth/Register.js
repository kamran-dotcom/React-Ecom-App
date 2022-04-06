import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
// import Navbar from "../../../layouts/frontend/Navbar";

const Register = () =>{
    const divColor = {
        // backgroundColor:"#A58F8A"
        backgroundColor:"#12CFE9"
    };

    const navigate = useNavigate();

    const [registerInput,setRegister] =useState({
        'name':'',
        // 'last_name':'',
        'email':'',
        'password':''
    });

    const handleInput = (e) =>
    {
        // e.persist();
        setRegister({...registerInput,[e.target.name]:e.target.value})
    }

    const registerSubmit = (e) =>{
        e.preventDefault();
        console.warn("RegisterInput",registerInput);

        const data = {
            name:registerInput.name,
            // last_name:registerInput.last_name,
            email:registerInput.email,
            password:registerInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`/api/register`,data).then(res=>{
                localStorage.setItem('auth_token',res.data.token);
                localStorage.setItem('auth_user',res.data.username);

                swal('Success',res.data.message,'success');

                navigate('/admin/');


            });
        });
    }

    return(
        <div style={divColor}>
            {/* <Navbar/> */}
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-7">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                                        <div className="card-body">
                                            <form onSubmit={registerSubmit}>
                                                <div className="row mb-3">
                                                    <div className="col-md-12">
                                                        <div className="form-floating mb-3 mb-md-0">
                                                            <input className="form-control" id="inputFirstName" name="name" onChange={handleInput} value={registerInput.name} type="text" placeholder="Enter your first name" />
                                                            <label htmlFor="inputFirstName">Name</label>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-6">
                                                        <div className="form-floating">
                                                            <input className="form-control" id="inputLastName" name="last_name" onChange={handleInput} value={registerInput.last_name} type="text" placeholder="Enter your last name" />
                                                            <label htmlFor="inputLastName">Last name</label>
                                                        </div>
                                                    </div> */}
                                                </div>
                                                <div className="form-floating mb-3">
                                                    <input className="form-control" id="inputEmail" name="email" onChange={handleInput} value={registerInput.email} type="email" placeholder="name@example.com" />
                                                    <label htmlFor="inputEmail">Email address</label>
                                                </div>
                                                <div className="row mb-3">
                                                    <div className="col-md-12">
                                                        <div className="form-floating mb-3 mb-md-0">
                                                            <input className="form-control" id="inputPassword" name="password" onChange={handleInput} value={registerInput.password} type="password" placeholder="Create a password" />
                                                            <label htmlFor="inputPassword">Password</label>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-6">
                                                        <div className="form-floating mb-3 mb-md-0">
                                                            <input className="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" />
                                                            <label htmlFor="inputPasswordConfirm">Confirm Password</label>
                                                        </div>
                                                    </div> */}
                                                </div>
                                                <div className="mt-4 mb-0">
                                                    <div className="d-grid"><button className="btn btn-primary" type="submit">Register</button></div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="card-footer text-center py-3">
                                            <div className="small"><Link to="/login">Have an account? Go to login</Link></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <div id="layoutAuthentication_footer">
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid px-4">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; Your Website 2021</div>
                                <div>
                                    <a to="#">Privacy Policy</a>
                                    &middot;
                                    <a to="#">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default Register;