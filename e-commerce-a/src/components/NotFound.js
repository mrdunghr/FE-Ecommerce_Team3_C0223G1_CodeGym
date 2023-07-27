import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound({ onNotFound }) {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4">
                        <h2 className="text-center">Page not found!</h2>
                        <p className="text-center mb-4">Please check the URL or go back to the homepage.</p>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary mr-3" onClick={onNotFound}>
                                Logout
                            </button>
                            <button className="btn btn-secondary">
                                <Link to="/">Go Home</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
