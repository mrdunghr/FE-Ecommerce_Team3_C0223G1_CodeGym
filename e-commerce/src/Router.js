import {Route, Routes} from "react-router-dom";
import React from "react";
import {CreateShop, Shop} from "./pages/customer/outlet/shop";
import CustomerProfile from "./pages/customer/customerProfile";
import {ProductManager} from "./pages/customer/outlet/productManager";
import {Category} from "./pages/customer/category/category";
import {CreateProduct} from "./pages/customer/product/create";
import {DetailProduct} from "./pages/customer/product/DetailProduct";
import {EditProduct} from "./pages/customer/product/edit";
import {SearchProduct} from "./pages/customer/product/Search";
import {Cart, CustomerCart} from "./pages/customer/cart/cart";
import {HomePortal} from "./pages/customer/home/home";
import {OrdersManage} from "./pages/customer/outlet/orders";
import {CustomerOrders} from "./pages/customer/cart/orders";
import {LoginRegister} from "./pages/LoginRegister";


export default function RouterHome(){
    return(
        <>
            <Routes>
                <Route path={'/'} element={<HomePortal></HomePortal>}></Route>
                <Route path={'/login'} element={<LoginRegister></LoginRegister>}></Route>
                <Route path={'/customer/profile'} element={<CustomerProfile></CustomerProfile>}>
                    <Route path={''} element={<Shop></Shop>}></Route>
                    <Route path={'add-shop'} element={<CreateShop></CreateShop>}></Route>
                    <Route path={'product-manager'} element={<ProductManager></ProductManager>}></Route>
                    <Route path={'order-manager'} element={<OrdersManage></OrdersManage>}></Route>
                </Route>
                <Route path={'/product/add'} element={<CreateProduct></CreateProduct>}></Route>
                <Route path={'/category/:id'} element={<Category></Category>}></Route>
                <Route path={'/product/:id'} element={<DetailProduct></DetailProduct>}></Route>
                <Route path={'/product/edit/:id'} element={<EditProduct></EditProduct>}></Route>
                <Route path={'/customer/cart'} element={<CustomerCart></CustomerCart>}>
                    <Route path={''} element={<Cart></Cart>}></Route>
                    <Route path={'orders'} element={<CustomerOrders></CustomerOrders>}></Route>
                </Route>
                <Route path={'/product/search/:search'} element={<SearchProduct></SearchProduct>}></Route>
            </Routes>
        </>
    )
}