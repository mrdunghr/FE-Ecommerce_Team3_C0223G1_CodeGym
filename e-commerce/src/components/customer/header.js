import {Link} from "react-router-dom";
import "./header.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import KeyIcon from '@mui/icons-material/Key';

export default function CustomerHeader(){
    const user = JSON.parse(sessionStorage.getItem('user'))
    return(
        <>
            <div id={'cus-header'}>
                <div id={'header'}>
                    <div id={'first-header'}>
                        <Link to={''}>SHOP EVENTS & SAVE UP TO 50% OFF</Link>
                        <Link to={""}>Call us: <span style={{fontFamily : "Arial", letterSpacing : "2px"}}>0975163309</span></Link>
                        {user === null ? <></> : <Link to={'/customer/profile'}>Seller Centre</Link>}
                    </div>
                    <div id={'second-header'}>
                        <Link>Recommendation</Link>
                        <Link>Question & Answer</Link>
                        {user === null ? <></> : <Link><span>Hi, {user.firstName}</span></Link>}
                        {user === null ? <></> : <Link to={'/customer/cart'}><ShoppingCartIcon></ShoppingCartIcon></Link>}
                    </div>
                </div>
                <div id={'navbar'}>
                    <div id={'logo'}>
                        <img src="/image/logo.png" alt=""/>
                    </div>
                    <div id={'main-navbar'}>
                        <Link to={'/'}>HOME</Link>
                        {user === null ?  <></> : <Link>CUSTOMER SERVICE</Link>}
                        <Link>REGISTRY & GIFTING</Link>
                        <Link>GIFT CARDS</Link>
                        <Link>SELL PRODUCT ONLINE</Link>
                        <Link>CONTACT</Link>
                    </div>
                </div>
            </div>
        </>
    )
}