import React from 'react';
import '../style-all/css/app.css';
import '../style-all/css/bootstrap.css';

export default function Footer() {
    return (
        <footer>
            <div className="footer clearfix mb-0 text-muted">
                <div className="float-start">
                    <p>2023 &copy; Revel eCommerce</p>
                </div>
                <div className="float-end">
                    <p>
                        Crafted with <span className='text-danger'><i data-feather="heart"></i></span> by <a
                        href="https://google.com">Dung (Mr.)</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};