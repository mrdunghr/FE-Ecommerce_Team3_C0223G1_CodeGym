import React, { useState } from 'react';
import '../style-all/css/app.css';
import '../style-all/css/bootstrap.css';
import axios from "axios";

export default function Login({ onLogin }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        // Gọi API đăng nhập
        axios
            .post('http://localhost:8080/api/v1/users/login', formData)
            .then((response) => {
                console.log(response)
                // Kiểm tra xem đăng nhập thành công hay không
                onLogin();
            })
            .catch((error) => {
                console.log(error);
                // Xử lý lỗi khi gọi API
                alert('An error occurred. Please try again later.');
            });
    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div id="auth">
            <div className="container">
                <div className="row">
                    <div className="col-md-5 col-sm-12 mx-auto">
                        <div className="card pt-4">
                            <div className="card-body">
                                <div className="text-center mb-5">
                                    <img src="/logo.png" height="48" className="mb-4" alt="Logo" />
                                    <h3>Sign In</h3>
                                    <p>Please sign in to continue to Revel eCommerce.</p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="text-center">
                                        <p className="text-danger">session + security được lưu ở đây</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-warning">You have been logged out.</p>
                                    </div>

                                    <div className="form-group position-relative has-icon-left">
                                        <label htmlFor="email">Username</label>
                                        <div className="position-relative">
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                            <div className="form-control-icon">
                                                <i data-feather="user"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group position-relative has-icon-left">
                                        <div className="clearfix">
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <div className="position-relative">
                                            <input
                                                type="password"
                                                name="password"
                                                className="form-control"
                                                id="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                            />
                                            <div className="form-control-icon">
                                                <i data-feather="lock"></i>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-check clearfix my-4">
                                        <div className="checkbox float-start">
                                            <input type="checkbox" name="remember-me" className="form-check-input" />
                                            <label htmlFor="checkbox1">Remember me</label>
                                        </div>
                                    </div>
                                    <div className="clearfix">
                                        <button className="btn btn-primary float-end" type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
