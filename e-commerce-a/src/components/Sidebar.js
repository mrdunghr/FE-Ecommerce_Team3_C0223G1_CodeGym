import React, { useState } from 'react';
import { FiAperture, FiBox, FiCompass, FiGrid, FiHome, FiLoader, FiSun, FiSunset, FiTarget, FiTriangle, FiUser, FiWifi, FiWind, FiX } from 'react-icons/fi';
import { Link } from "react-router-dom";

export default function Sidebar() {
    const [activeItems, setActiveItems] = useState([]);

    const handleItemClick = (item) => {
        if (activeItems.includes(item)) {
            setActiveItems(activeItems.filter((i) => i !== item));
        } else {
            setActiveItems([...activeItems, item]);
        }
    };

    const isItemActive = (item) => {
        return activeItems.includes(item);
    };

    return (
        <div id="sidebar" className="active">
            <div className="sidebar-wrapper active">
                <div className="sidebar-header">
                    <Link to="/">
                        <img src="/logo.png" alt="Logo" />
                    </Link>
                </div>
                <div className="sidebar-menu">
                    <ul className="menu">
                        <li className="sidebar-title">Main Menu</li>
                        <li className={`sidebar-item ${isItemActive('dashboard') ? 'active' : ''}`}>
                            <Link to="/" className="sidebar-link" onClick={() => handleItemClick('dashboard')}>
                                <FiGrid />
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${isItemActive('home') ? 'active' : ''}`}>
                            <Link to="/sections" className="sidebar-link" onClick={() => handleItemClick('home')}>
                                <FiHome />
                                <span>Home Page</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${isItemActive('articles') ? 'active' : ''}`}>
                            <Link to="/articles" className="sidebar-link" onClick={() => handleItemClick('articles')}>
                                <FiCompass />
                                <span>Articles</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${isItemActive('menus') ? 'active' : ''}`}>
                            <Link to="/menus" className='sidebar-link' onClick={() => handleItemClick('menus')}>
                                <FiAperture />
                                <span>Menus</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item has-sub ${isItemActive('authentication') ? 'active' : ''}`}>
                            <Link to="#" className='sidebar-link' onClick={() => handleItemClick('authentication')}>
                                <FiTriangle />
                                <span>Authentication</span>
                            </Link>
                            <ul className={`submenu ${isItemActive('authentication') ? 'active' : ''}`}>
                                <li>
                                    <Link to="/users">Manage Users</Link>
                                </li>
                            </ul>
                        </li>
                        <li className={`sidebar-item ${isItemActive('categories') ? 'active' : ''}`}>
                            <Link to="/categories" className='sidebar-link' onClick={() => handleItemClick('categories')}>
                                <FiBox />
                                <span>Categories</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${isItemActive('brands') ? 'active' : ''}`}>
                            <Link to="/brands" className='sidebar-link' onClick={() => handleItemClick('brands')}>
                                <FiSunset />
                                <span>Brands</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${isItemActive('contacts') ? 'active' : ''}`}>
                            <Link to="/contacts" className='sidebar-link' onClick={() => handleItemClick('contacts')}>
                                <FiSunset />
                                <span>Contacts</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item has-sub ${isItemActive('manageProducts') ? 'active' : ''}`}>
                            <Link to="#" className='sidebar-link' onClick={() => handleItemClick('manageProducts')}>
                                <FiLoader />
                                <span>Manage Products</span>
                            </Link>
                            <ul className={`submenu ${isItemActive('manageProducts') ? 'active' : ''}`}>
                                <li>
                                    <Link to="/products">Manage Products</Link>
                                </li>
                                <li>
                                    <Link to="/reviews">Reviews</Link>
                                </li>
                                <li>
                                    <Link to="/questions">Questions</Link>
                                </li>
                            </ul>
                        </li>
                        <li className={`sidebar-item has-sub ${isItemActive('manageCustomer') ? 'active' : ''}`}>
                            <Link to="#" className='sidebar-link' onClick={() => handleItemClick('manageCustomer')}>
                                <FiUser />
                                <span>Manage Customer</span>
                            </Link>
                            <ul className={`submenu ${isItemActive('manageCustomer') ? 'active' : ''}`}>
                                <li>
                                    <Link to="/customers">Customers</Link>
                                </li>
                            </ul>
                        </li>
                        <li className={`sidebar-item ${isItemActive('manageShop') ? 'active' : ''}`}>
                            <Link to="/shops" className='sidebar-link' onClick={() => handleItemClick('manageShop')}>
                                <FiUser />
                                <span>Manage Shop</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${isItemActive('shippingRate') ? 'active' : ''}`}>
                            <Link to="/shipping_rates" className='sidebar-link' onClick={() => handleItemClick('shippingRate')}>
                                <FiWind />
                                <span>Shipping Rate</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${isItemActive('reviews') ? 'active' : ''}`}>
                            <Link to="/reviews" className='sidebar-link' onClick={() => handleItemClick('reviews')}>
                                <FiWifi />
                                <span>Reviews</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${isItemActive('manageOrder') ? 'active' : ''}`}>
                            <Link to="/orders" className='sidebar-link' onClick={() => handleItemClick('manageOrder')}>
                                <FiTarget />
                                <span>Manage Order</span>
                            </Link>
                        </li>
                        <li className={`sidebar-item ${isItemActive('salesReport') ? 'active' : ''}`}>
                            <Link to="/reports" className='sidebar-link' onClick={() => handleItemClick('salesReport')}>
                                <FiSun />
                                <span>Sales Report</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <button className="sidebar-toggler btn x">
                    <FiX />
                </button>
            </div>
        </div>
    );
};
