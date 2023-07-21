import React from 'react';
import '../style-all/css/app.css';
import '../style-all/css/bootstrap.css';

export default function Header(){
    return (
        <nav className="navbar navbar-header navbar-expand navbar-light">
            <form action="/logout" method="post" style={{ display: 'none' }} name="logoutForm">
                <input type="submit" />
            </form>

            <a className="sidebar-toggler" href="#">
                <span className="navbar-toggler-icon"></span>
            </a>
            <button
                className="btn navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav d-flex align-items-center navbar-light ms-auto">
                    <li className="dropdown nav-icon">
                        <a href="#" data-bs-toggle="dropdown" className="nav-link  dropdown-toggle nav-link-lg nav-link-user">
                            <div className="d-lg-inline-block">
                                <i data-feather="bell"></i>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-large">
                            <h6 className="py-2 px-4">Notifications</h6>
                            <ul className="list-group rounded-none">
                                <li className="list-group-item border-0 align-items-start">
                                    <div className="avatar bg-success me-3">
                    <span className="avatar-content">
                      <i data-feather="shopping-cart"></i>
                    </span>
                                    </div>
                                    <div>
                                        <h6 className="text-bold">
                                            Welcome
                                        </h6>
                                        <p className="text-xs">
                                            {/* <a href="/account" sec:authentication="principal.fullname"></a> - <span sec:authentication="principal.authorities"></span> */}
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </li>

                    <li className="dropdown nav-icon me-2">
                        <a href="/" data-bs-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg nav-link-user">
                            <div className="d-lg-inline-block">
                                <i data-feather="settings"></i>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item active" href="/settings#general">
                                <i data-feather="home"></i> General
                            </a>
                            <a className="dropdown-item" href="/settings#countries">
                                <i data-feather="map-pin"></i> Countries
                            </a>
                            <a className="dropdown-item" href="/settings#states">
                                <i data-feather="navigation"></i> States
                            </a>
                            <a className="dropdown-item" href="/settings#mailServer">
                                <i data-feather="mail"></i> Mail Server
                            </a>
                            <a className="dropdown-item" href="/settings#mailTemplate">
                                <i data-feather="mail"></i> Mail Templates
                            </a>
                            <a className="dropdown-item" href="/settings#payment">
                                <i data-feather="heart"></i> Payment
                            </a>
                        </div>
                    </li>
                    <li className="dropdown">
                        <a href="#" data-bs-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg nav-link-user">
                            <div className="avatar me-1">
                                <img src="/avatar/avatar-s-3.png" alt="" srcSet="" />
                            </div>
                            <div className="d-none d-md-block d-lg-inline-block">
                                Hi, <b>{/*sec:authentication="principal.fullname"*/}</b>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                            <a className="dropdown-item" href="/account">
                                <i data-feather="user"></i> Account
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" id="logoutLink" href="">
                                <i data-feather="log-out"></i> Logout
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
