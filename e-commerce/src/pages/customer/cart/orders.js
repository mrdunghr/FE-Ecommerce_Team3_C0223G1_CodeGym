import "./orders.css"
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
export const CustomerOrders = () => {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [orders, setOrders] = useState([])
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()
    const status = useSelector(state => state.update)
    useEffect(() =>{
        if(user === null){
            navigate('/login')
        }else {
            axios.get('http://localhost:8080/api/v1/order-details/' + user.id).then((res) => {
                console.log(res.data)
                setOrders(res.data)
            })
        }
    },[update, status])
    const paidOrder = (od) =>{
        Swal.fire({
            title : "Confirm payment " + od.product.name + "?",
            showCancelButton : true
        }).then(res =>{
            if(res.isConfirmed){
                axios.put('http://localhost:8080/api/v1/order-details/confirm-order/paid/' + od.id).then(res =>{
                    if(update){
                        setUpdate(false)
                    }else{
                        setUpdate(true)
                    }
                    Swal.fire("Paid success!")
                })
            }
        })
    }
    const returnOrder = (od) =>{
        Swal.fire({
            title : "Do you want to return " + od.product.name + "?",
            showCancelButton : true
        }).then(res =>{
            if(res.isConfirmed){
                axios.put('http://localhost:8080/api/v1/order-details/confirm-order/return/' + od.id).then(res =>{
                    if(update){
                        setUpdate(false)
                    }else{
                        setUpdate(true)
                    }
                    Swal.fire("Return success!")
                })
            }
        })
    }
    return(
        <div id={'order-display'}>
            <div id={'main-order-header'}>
                <div className={'product-name-image'}>
                    <b>Product</b>
                </div>
                <div className={'main-order-header-items'}>
                    <b>Quantity</b>
                </div>
                <div className={'main-order-header-items'}>
                    <b>Status</b>
                </div>
                <div className={'main-order-header-items'}>
                    <b>Customer</b>
                </div>
                <div className={'main-order-header-action'}>
                    <b>Order time</b>
                </div>
            </div>
            <div id={'orders-main'}>
                {orders.map(item => {
                    return item.orderDetails.filter(item => item.status !== "PAID" && item.status !== "RETURNED").map(odDetails => (
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
                                {odDetails.status === "NEW" ?
                                    <div className={'order-status'} style={{background : odDetails.status === "NEW" ? "green" : "blue"}}>{odDetails.status === "NEW" ? "Waiting" : "Paid"}</div>
                                    : <>
                                        <button onClick={() => paidOrder(odDetails)} className={'confirm-btn'}>Paid</button>
                                        <button onClick={() => returnOrder(odDetails)} className={'cancel-btn'}>Return</button>
                                    </>
                                }
                            </div>
                            <div className={'main-order-header-items customer-name'}>
                                {user.firstName}
                            </div>
                            <div className={'main-order-header-action order-time'}>
                                {item.orderTime.substring(11, 19)} {item.orderTime.substring(0, 10)}
                                {/*{item.orderTime}*/}
                            </div>
                        </div>
                    ))
                })}
            </div>
        </div>

    )
}