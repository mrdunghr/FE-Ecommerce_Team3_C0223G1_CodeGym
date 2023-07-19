import {Route, Routes} from "react-router-dom";
import React from "react";
import Login, {CustomerRegister} from "./pages/login";

export default function RouterHome(){
    return(
        <>
            <Routes>
                <Route path={'/'} element={<Login></Login>}></Route>
                <Route path={'/register'} element={<CustomerRegister></CustomerRegister>}></Route>
            </Routes>
        </>
    )
}