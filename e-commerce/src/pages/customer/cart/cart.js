import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import CustomerHeader from "../../../components/customer/header";
import "./cart.css"
export const CustomerCart = () =>{
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    const navigate = useNavigate()
    useEffect(() => {
        if (user === null){
            navigate('/login')
        }
    }, [])
    return(
        <>
            <div id={'display'}>
                <div id={'customer-header'}>
                    <CustomerHeader></CustomerHeader>
                </div>
                <div id={'cart-container'}>
                    <div id={'cart-customer-profile'}>
                        <div id={'profile-box'}>
                            <div id={'profile-image'}>
                                <img src="/image/avatar/avatar-s-2.png" alt=""/>
                            </div>
                            <div id={'customer-info'}>
                                <h2>{user.firstName}</h2>
                            </div>
                        </div>
                    </div>
                    <div id={'main-cart'}>
                        <div id={'cart-list'}>
                            <div className={'cart-product'}>
                                <div className={'cart-product-image'}>
                                    <img src="/image/modern-teaching-concept-P7BTJU7.jpg" alt=""/>
                                </div>
                                <div className={'cart-product-info'}>
                                    <h2>Bike Mike Dean</h2>
                                    <p>Price: <span className={'old-price'}>$555</span> <span className={'new-price'}>$333</span></p>
                                    <p>Discount: <span className={'discount'}>25%</span></p>
                                    <p><div className={'quantity-bar'}></div></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}