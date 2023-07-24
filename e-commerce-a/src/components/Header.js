import React from 'react';
import Swal from 'sweetalert2';

export default function Header() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    const showSwalDialog = () => {
        Swal.fire({
            title: 'Setting / Logout',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Settings',
            denyButtonText: `Logout`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Settings!', '', 'success');
            } else if (result.isDenied) {
                Swal.fire('Logout', '', 'info');
                localStorage.removeItem('isLoggedIn');
                window.location.reload();
            }
        });
    };

    return (
        <nav className="navbar navbar-header navbar-expand navbar-light">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav d-flex align-items-center navbar-light ms-auto">
                    <li className="dropdown">
                        <a href="#" className="nav-link dropdown-toggle nav-link-lg nav-link-user" aria-expanded="false" onClick={showSwalDialog}>
                            <div className="avatar me-1">
                                <img src="/avatar/avatar-s-1.png" alt="" srcSet="" />
                            </div>
                            <div className="d-none d-md-block d-lg-inline-block">Hi, <b>{user === null ? null : user.fullName}</b></div>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
