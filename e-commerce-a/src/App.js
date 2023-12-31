import React, {useState} from 'react';
import './App.css';
import Login from './login/Login';
import Home from "./home/Home";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sections from "./pages/Sections";
import Articles from "./pages/Articles";
import Brands from "./pages/Brands";
import Contact from "./pages/Contact";
import Categories from "./pages/Categories";
import ManageUsers from "./pages/ManageUsers";
import Questions from "./pages/Questions";
import Report from "./pages/Report";
import Orders from "./pages/Orders";
import Shops from "./pages/Shops";
import ShippingRates from "./pages/ShippingRates";
import Customers from "./pages/Customers";
import Reviews from "./pages/Reviews";
import ManageProducts from "./pages/ManageProducts";
import Menu from "./pages/Menu";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // Thực hiện xác thực tài khoản ở đây (giả định đăng nhập thành công)
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div>
            {isLoggedIn ? (
                <div>
                    <Routes>
                        <Route path={"/"} element={<Home/>}>
                            <Route path={""} element={<Dashboard/>}></Route>
                            <Route path={"/sections"} element={<Sections/>}></Route>
                            <Route path={"/articles"} element={<Articles/>}></Route>
                            <Route path={"/menus"} element={<Menu/>}></Route>
                            <Route path={"/users"} element={<ManageUsers/>}></Route>
                            <Route path={"/categories"} element={<Categories/>}></Route>
                            <Route path={"/brands"} element={<Brands/>}></Route>
                            <Route path={"/contacts"} element={<Contact />}></Route>
                            <Route path={"/products"} element={<ManageProducts/>}></Route>
                            <Route path={"/reviews"} element={<Reviews/>}></Route>
                            <Route path={"/questions"} element={<Questions/>}></Route>
                            <Route path={"/customers"} element={<Customers/>}></Route>
                            <Route path={"/shops"} element={<Shops/>}></Route>
                            <Route path={"/shipping_rates"} element={<ShippingRates/>}></Route>
                            <Route path={"/orders"} element={<Orders/>}></Route>
                            <Route path={"/reports"} element={<Report/>}></Route>
                        </Route>
                    </Routes>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <Login onLogin={handleLogin}/>
            )}
        </div>
    );
}

export default App;
