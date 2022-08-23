import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";


const Navbar = () =>{

    const navigate = useNavigate();
    
    let auth_buttons = '';

    if(! localStorage.getItem('auth_token'))
    {
        auth_buttons = (
            <ul className="navbar-nav ms-auto">
                <li className="nav-item active">
                    <Link className="nav-link text-white" to="/register">Register <span className="sr-only">(current)</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-white" to="/login">Login</Link>
                </li>
            </ul>
        );
    }
    else
    {
        auth_buttons = (
            // <ul className="navbar-nav ms-auto">
                <>
                <li className="nav-item active"><Link to="/cart" className="nav-link text-white">Cart</Link></li>
                <li className="nav-item active"><Link to="/wishlist" className="nav-link text-white">Wishlist</Link></li>
                <li className="nav-item active"><Link to="/admin/dashboard" className="nav-link text-white">Dashboard</Link></li>
                <li className="nav-item">
                    <button className="btn btn-sm btn-warning" onClick={(e)=>submitLogout(e)}>Logout</button>
                </li></>
            // </ul>
        );
    }

    const submitLogout = (e) =>{
        e.preventDefault();

        axios.post(`/api/logout`).then(res =>{
            if(res.data.status === 200)
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_user');
                swal("Success",res.data.message,'success');
                navigate('/');
            }
        });
    }
    return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary shadow stickey-top">
            <div className="container">
                <Link className="navbar-brand text-white" to="/">Ecom App</Link>
                

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        {/* <li className="nav-item active">
                            <Link className="nav-link" to="/cart">Cart</Link>
                        </li> */}
                        <li className="nav-item active">
                            <Link className="nav-link text-white" to="/about-us">About Us<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item active">
                            <Link className="nav-link text-white" to="/contact-us">Contact Us</Link>
                        </li>
                        {auth_buttons}
                    </ul>
                </div>
            </div>
        </nav>
    </>
    );
}

export default Navbar;