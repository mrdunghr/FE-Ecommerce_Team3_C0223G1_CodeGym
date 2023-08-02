import React from 'react';
import '@ionic/react/css/core.css';
import './footer.css';

export const Footer = () => {
    return (
        <div className="footer">
            <div className="row social-icons">
                <a href="#"><i className="fa fa-facebook"></i></a>
                <a href="#"><i className="fa fa-instagram"></i></a>
                <a href="#"><i className="fa fa-youtube"></i></a>
                <a href="#"><i className="fa fa-twitter"></i></a>
            </div>

            <div className="row">
                <ul>
                    <li><a href="#">Contact us</a></li>
                    <li><a href="#">Our Services</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms & Conditions</a></li>
                    <li><a href="#">Career</a></li>
                </ul>
            </div>

            <div className="row center-text">
                INFERNO Copyright © 2021 Inferno - All rights reserved || Designed By: Mahesh
            </div>
        </div>
    );
};


