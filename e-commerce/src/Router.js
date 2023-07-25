import {Route, Routes} from "react-router-dom";
import React from "react";
import Login from "./pages/login";
import {CustomerRegister} from "./pages/register";
import {CreateShop, Shop} from "./pages/customer/outlet/shop";
import CustomerProfile from "./pages/customer/customerProfile";
import {ProductManager} from "./pages/customer/product/productManager";
import {CustomerHome} from "./pages/customer/Customer-Home";
import {Category} from "./pages/customer/category/category";
import {CreateProduct} from "./pages/customer/product/create";

import {CreateProduct} from "./pages/customer/product/create";
import {DetailProduct} from "./pages/customer/product/DetailProduct";



export default function RouterHome(){
    return(
        <>
            <Routes>
                <Route path={'/'} element={<CustomerHome></CustomerHome>}></Route>
                <Route path={'/login'} element={<Login></Login>}></Route>
                <Route path={'/register'} element={<CustomerRegister></CustomerRegister>}></Route>
                <Route path={'/customer/profile'} element={<CustomerProfile></CustomerProfile>}>
                    <Route path={''} element={<Shop></Shop>}></Route>
                    <Route path={'add-shop'} element={<CreateShop></CreateShop>}></Route>
                </Route>
                <Route path={'/product/add'} element={<CreateProduct></CreateProduct>}></Route>
                <Route path={'/product-manager'} element={<ProductManager></ProductManager>}></Route>
                <Route path={'/category'} element={<Category></Category>}></Route>
                <Route path={'/product/:id'} element={<DetailProduct></DetailProduct>}></Route>
            </Routes>
        </>
    )
}