import {Route, Routes} from "react-router-dom";
import React from "react";
import Login from "./pages/login";
import {CustomerRegister} from "./pages/register";
import CustomerHome from "./pages/customer/customerHome";
import {CreateShop, Shop} from "./pages/customer/outlet/shop";

export default function RouterHome(){
    return(
        <>
            <Routes>
                <Route path={'/'} element={<Login></Login>}></Route>
                <Route path={'/register'} element={<CustomerRegister></CustomerRegister>}></Route>
                <Route path={'/home/customer'} element={<CustomerHome></CustomerHome>}>
                    <Route path={''} element={<Shop></Shop>}></Route>
                    <Route path={'create-shop'} element={<CreateShop></CreateShop>}></Route>
                </Route>
            </Routes>
        </>
    )
}