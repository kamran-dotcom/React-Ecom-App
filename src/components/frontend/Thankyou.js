import React from "react";
import { Link } from "react-router-dom";

const Thankyou = ()=>{
    return (
        <div className="container">
            <h1 className="text-center text-white alert alert-success">Thank you for placing order </h1>
            <Link to="/">Goto Home Page</Link>
        </div>

    );
}
export default Thankyou;