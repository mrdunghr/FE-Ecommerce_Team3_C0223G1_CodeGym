import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./paymentHistory.css"

export const PaymentHistory = () =>{
    const user = JSON.parse(sessionStorage.getItem('user'))
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    useEffect(() =>{
        if(user === null){
            navigate('/')
        }else{
            axios.get('http://localhost:8080/api/v1/order-details/' + user.id).then(res =>{
                console.log(res.data)
                setOrders(res.data)
            })
        }
    },[])


    return(
        <>
            <div id={'payment-display'}>
                <h4 style={{textIndent : "20px"}}>Payment history</h4>
                <div id={'payment-header'}>
                    <div className={'product-name-image'}>
                        <b>Product</b>
                    </div>
                    <div className={'main-order-header-items'}>
                        <b>Quantity</b>
                    </div>
                    <div className={'main-order-header-items'}>
                        <b>Total</b>
                    </div>
                    <div className={'main-order-header-items'}>
                        <b>Order time</b>
                    </div>
                    <div className={'main-order-header-action'}>
                        <b>Status</b>
                    </div>
                </div>
                <div id={'main-payment-history'}>
                    {orders.map(item => {
                        return item.orderDetails.filter(item => item.status === "PAID").map(
                            odDetails => (
                                <>
                                    <div className={'orders-item'}>
                                        <div className={'product-name-image'}>
                                            <div className={'shop-name'}>{odDetails.product.shop.name.length > 10 ? odDetails.product.shop.name.substring(0, 10) : odDetails.product.shop.name} SHOP</div>
                                            <img src={odDetails.product.mainImage === ".png" ?  "/image/modern-teaching-concept-P7BTJU7.jpg" : odDetails.product.mainImage} alt=""/>
                                            <b>{odDetails.product.name}</b>
                                        </div>
                                        <div className={'main-order-header-items'}>
                                            <b>{odDetails.quantity}</b>
                                        </div>
                                        <div className={'main-order-header-items'}>
                                            <b>${odDetails.product.price * odDetails.quantity}</b>
                                        </div>
                                        <div className={'main-order-header-items customer-name'}>
                                            <b>{item.orderTime.substring(0, 10)}</b>
                                        </div>
                                        <div className={'main-order-header-action order-time'}>
                                            <div className={'order-status'} style={{background : "green"}}>SUCCESS</div>
                                        </div>
                                    </div>
                                </>
                            )
                        )
                    })}
                </div>
            </div>
        </>
    )
}