import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
// import Navbar from "../../../layouts/frontend/Navbar";

const Login = () => {
    const divColor = {
        // backgroundColor:"#A58F8A"
        backgroundColor:"#12CFE9"
    };

    const navigate = useNavigate();
    const [loginInput,setLogin] = useState({
        'email':'',
        'password':'',
        'error_list':[]
    });

    const handleInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setLogin({
            ...loginInput,
            [name] : value
        })
    }

    const userLogin = (e) =>{
        e.preventDefault();
        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/login',loginInput).then(res=>{
                if(res.data.status === 200)
                {
                    localStorage.setItem('auth_token',res.data.token);
                    localStorage.setItem('auth_user',res.data.username);
                    swal("Success",res.data.message,'success');
                    navigate('/admin/dashboard');
                }
                else if(res.data.status === 401)
                {
                    swal("Warning",res.data.message,'warning');
                }
                else
                {
                    setLogin({
                        ...loginInput,
                        error_list:res.data.validation_errors
                    })
                }
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
                                    <div className="col-lg-5">
                                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                                            <div className="card-body">
                                                <form onSubmit={userLogin}>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="inputEmail" type="email" name="email" onChange={handleInput} value={loginInput.email} placeholder="name@example.com" />
                                                        <label htmlFor="inputEmail">Email address</label>
                                                        <span className="text-danger">{loginInput.error_list.email}</span>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="inputPassword" type="password" name="password" onChange={handleInput} value={loginInput.password} placeholder="Password" />
                                                        <label htmlFor="inputPassword">Password</label>
                                                        <span className="text-danger">{loginInput.error_list.password}</span>
                                                    </div>
                                                    <div className="form-check mb-3">
                                                        <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                                        <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                        <Link className="small" to="/signup">Forgot Password?</Link>
                                                        {/* <Link className="btn btn-primary" to="">Login</Link> */}

                                                        <button type="submit" className="btn btn-sm btn-primary float-end">Login</button>

                                                    </div>
                                                </form>
                                            </div>
                                            <div className="card-footer text-center py-3">
                                                <div className="small"><Link to="/register">Need an account? Sign up!</Link></div>
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
                                        <Link to="#">Privacy Policy</Link>
                                        &middot;
                                        <Link to="#">Terms &amp; Conditions</Link>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
            </div>
        </div>
    );
}
export default Login;