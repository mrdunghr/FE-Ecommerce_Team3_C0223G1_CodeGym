import React, {useEffect, useState} from 'react';
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
import AddUser from "./pages/user/AddUser";
import EditUser from "./pages/user/EditUser";
import AddCategory from "./pages/category/AddCategory";
import EditCategory from "./pages/category/EditCategory";
import NotFound from "./components/NotFound";
import AddBrand from "./pages/brands/AddBrands";
import EditBrands from "./pages/brands/EditBrands";
import EditCustomer from "./pages/customer/EditCustomer";
import MultipleUploadFireBase from "./pages/user/MultipleUploadFireBase";
import MultipleUploadFireBaseSubmit from "./pages/user/MultipleUploadFireBaseSubmit";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Kiểm tra xem có thông tin đăng nhập trong localStorage không
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        setIsLoggedIn(loggedInStatus === 'true');
    }, []);

    const handleLogin = () => {
        // Thực hiện xác thực tài khoản ở đây (giả định đăng nhập thành công)
        setIsLoggedIn(true);
        // Lưu thông tin đăng nhập vào localStorage
        localStorage.setItem('isLoggedIn', 'true');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        // Xóa thông tin đăng nhập khỏi localStorage
        localStorage.removeItem('isLoggedIn');
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
                            <Route path={"/users/add-user"} element={<AddUser/>}></Route>
                            <Route path={"/users/edit-user/:userId"} element={<EditUser/>}></Route>

                            <Route path={"/categories"} element={<Categories/>}></Route>
                            <Route path={"/category/add-category"} element={<AddCategory/>}></Route>
                            <Route path={"/category/edit-category/:categoryId"} element={<EditCategory/>}></Route>

                            <Route path={"/brands"} element={<Brands/>}></Route>
                            <Route path={"/brands/add-brands"} element={<AddBrand/>}></Route>
                            <Route path={"/brands/edit-brands/:brandId"} element={<EditBrands/>}></Route>

                            <Route path={"/contacts"} element={<Contact />}></Route>
                            <Route path={"/products"} element={<ManageProducts/>}></Route>
                            <Route path={"/reviews"} element={<Reviews/>}></Route>
                            <Route path={"/questions"} element={<Questions/>}></Route>

                            <Route path={"/customers"} element={<Customers/>}></Route>
                            <Route path={"/customers/edit-customer/:customerId"} element={<EditCustomer/>}></Route>

                            <Route path={"/shops"} element={<Shops/>}></Route>
                            <Route path={"/shipping_rates"} element={<ShippingRates/>}></Route>
                            <Route path={"/orders"} element={<Orders/>}></Route>
                            <Route path={"/reports"} element={<Report/>}></Route>

                            <Route path={"/123"} element={<MultipleUploadFireBaseSubmit/>}></Route>
                        </Route>
                    </Routes>
                    {/*<button onClick={handleLogout}>Logout</button>*/}
                    <NotFound onNotFound={handleLogout}/>
                </div>
            ) : (
                <Login onLogin={handleLogin}/>
            )}
        </div>
    );
}

export default App;
