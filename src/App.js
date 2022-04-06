import React from "react";
import axios from "axios";
import MasterLayout from "./layouts/admin/MasterLayout";
// import Dashboard from "./components/admin/Dashboard";
import { Routes, Route } from 'react-router-dom';
import Home from "./components/frontend/Home";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import Category from "./components/admin/category/Category";
import ViewCategories from "./components/admin/category/ViewCategories";
import EditCategory from "./components/admin/category/EditCategory";
import AddProducts from "./components/admin/products/AddProducts";
import ViewProduct from "./components/admin/products/ViewProduct";
import EditProduct from "./components/admin/products/EditProduct";
import Dashboard from "./components/admin/Dashboard";
import FrontLayout from "./layouts/frontend/FrontLayout";
import About from "./components/frontend/About";
import Contact from "./components/frontend/Contact";
import CategoryProducts from "./components/frontend/CategoryProducts";
import SingleProduct from "./components/frontend/SingleProduct";
import Cart from "./components/frontend/Cart";
import Checkout from "./components/frontend/Checkout";
import Order from "./components/admin/orders/Order";


axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['X-CSRF-TOKEN'] = token_var;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})
function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FrontLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/about-us" element={<About/>}/>
          <Route path="/contact-us" element={<Contact/>}/>
          <Route path="/category/:slug" element={<CategoryProducts/>}/>
          <Route path="/single-product/:slug" element={<SingleProduct/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
     
        </Route>

        <Route path="/admin" name="Admin" render={(props)=> <MasterLayout {...props}/>} element={<MasterLayout/>}>

          <Route path="/admin/dashboard" name="Dashboard" render={(props)=><Dashboard {...props}/>} element={<Dashboard/>}></Route>
          <Route path="/admin/category" name="Category" render={(props)=> <Category {...props}/>} element={<Category/>}></Route>
          <Route path="/admin/view-categories" name="ViewCategories" render={(props)=> <ViewCategories {...props}/>} element={<ViewCategories/>}></Route>
          <Route path="/admin/edit-category/:id" name="EditCategory" render={(props)=> <EditCategory {...props}/>} element={<EditCategory/>}></Route>
          <Route path="/admin/add-product" name="AddProducts" render={(props)=> <AddProducts {...props}/>} element={<AddProducts/>}></Route>
          <Route path="/admin/view-product" name="ViewProduct" render={(props)=> <ViewProduct {...props}/>} element={<ViewProduct/>}></Route>
          <Route path="/admin/edit-product/:id" name="EditProduct" render={(props)=> <EditProduct {...props}/>} element={<EditProduct/>}></Route>
          <Route path="/admin/order" name="Order" render={(props)=> <Order {...props}/>} element={<Order/>}></Route>
        </Route>
        {/* <Route path="/admin/edit-category/:id" name="EditCategory" render={(props)=> <EditCategory {...props}/>} element={<EditCategory/>}></Route> */}
        {/* <Route path="/admin/add-product" name="AddProducts" render={(props)=> <AddProducts {...props}/>} element={<AddProducts/>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
