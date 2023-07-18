import {useState} from "react";
import "./sidebar.css";
import {Link} from "react-router-dom";
export default function Sidebar(){
    return (
        <>
            <div id={'sidebar'}>
                <div id={'logo'}>
                    <img src="/image/logo.png" alt=""/>
                </div>
                <p>MAIN MENU</p>
                <div className={'sidebar-item'}>
                    <Link to={'/home/dashboard'}>Dashboard</Link>
                </div>
                <div className={'sidebar-item'}>
                    <Link to={'/home'}>Home page</Link>
                </div>
                <div className={'sidebar-item'}>
                    <Link to={'/home/articles'}>Articles</Link>
                </div>
                <div className={'sidebar-item'}>
                    <Link to={'/home/menus'}>Menus</Link>
                </div>
                <div className={'sidebar-item'}>
                    <Link to={'/home/authentication'}>Authentication</Link>
                </div>
                <div className={'sidebar-item'}>
                    <Link to={'/home/categories'}>Categories</Link>
                </div>
                <div className={'sidebar-item'}>
                    <Link to={'/home/brands'}>Brands</Link>
                </div>
            </div>
        </>
    )
}