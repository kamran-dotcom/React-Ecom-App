import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const FrontLayout = () =>{
    return(
        <>
            <Navbar/>
            <Outlet/>
        </>
    );
}

export default FrontLayout;