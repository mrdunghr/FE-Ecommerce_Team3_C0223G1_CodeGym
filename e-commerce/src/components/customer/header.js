import {Link} from "react-router-dom";
import "./header.css"
import {useState} from "react";
export default function CustomerHeader(){
    const [customer, setCustomer] = useState({name : "Hieu"})
    return(
        <>
            <div id={'cus-header'}>
                <div id={'header'}>
                    <div id={'first-header'}>
                        <span>SHOP EVENTS & SAVE UP TO 50% OFF</span>
                        <span>Call us: <span style={{fontFamily : "Arial", letterSpacing : "2px"}}>0975163309</span></span>
                        <span>Seller Centre</span>
                    </div>
                    <div id={'second-header'}>
                        <span>Recommendation</span>
                        <span>Question & Answer</span>
                        <span>Hi, <b>{customer.name}</b></span>
                    </div>
                </div>
                <div id={'navbar'}>
                    <div id={'logo'}>
                        <img src="/image/logo.png" alt=""/>
                    </div>
                    <div id={'main-navbar'}>
                        <span>HOME</span>
                        <span>CUSTOMER SERVICE</span>
                        <span>REGISTRY & GIFTING</span>
                        <span>GIFT CARDS</span>
                        <span>SELL PRODUCT ONLINE</span>
                        <span>CONTACT</span>
                    </div>
                </div>
            </div>
        </>
    )
}