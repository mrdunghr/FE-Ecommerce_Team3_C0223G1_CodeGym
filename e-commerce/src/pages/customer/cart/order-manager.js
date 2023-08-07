import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import axios from "axios";
import {Link, Outlet} from "react-router-dom";
import "./order-manager.css"
import Swal from "sweetalert2";


export const OrderManager = () =>{
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [orders, setOrders] = useState([])
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()
    const status = useSelector(state => state.update)
    useEffect(() =>{
        const tabs = document.querySelectorAll('.ord-tab')
        const contents = document.querySelectorAll('.orders-content')
        const tab = tabs[0]
        const content = contents[0]
        tab.classList.add('active')
        content.classList.add('active')
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', e => {
                tabs.forEach(tab => tab.classList.remove('active'))
                tab.classList.add('active')

                contents.forEach(ct => ct.classList.remove('active'))
                contents[index].classList.add('active')
            })
        })
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
    return (
        <>
            <div id={'order-manager'}>
                <div id={'order-tab-header'}>
                    <div className={'ord-tab'}>
                        <b>Waiting</b>
                    </div>
                    <div className={'ord-tab'}>
                        <b>Paid</b>
                    </div>
                    <div className={'ord-tab'}>
                        <b>Canceled</b>
                    </div>
                    <div className={'ord-tab'}>
                        <b>Success</b>
                    </div>
                    <div className={'ord-tab'}>
                        <b>Returned</b>
                    </div>
                </div>
                <div id={'orders-container-content'}>
                    <div className={'orders-content content-1'}>
                        {orders.map(item => {
                            return item.orderDetails.filter(od => od.status === "NEW").map(odDetails => {
                                return (
                                    <>
                                        <div className={'odDetails-item'}>
                                            <div className={'item-name-image item-orderDetails'}>
                                                <img src={odDetails.product.mainImage} alt=""/>
                                                <b>{odDetails.product.name}</b>
                                            </div>
                                            <div className={'item-status item-orderDetails'}>
                                                <b style={{color : "green"}}>{odDetails.status}</b>
                                            </div>
                                            <div className={'item-orderDetails  item-quantity'}>
                                                <b>{odDetails.quantity}</b>
                                            </div>
                                            <div className={'item-orderDetails item-owner'}>
                                                <b>{user.firstName}</b>
                                            </div>
                                            <div className={'item-orderDetails item-action'}>
                                                <b>{item.orderTime.substring(0, 10)}</b>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        })}
                    </div>
                    <div className={'orders-content content-2'}>
                        {orders.map(item => {
                            return item.orderDetails.filter(od => od.status === "PROCESSING").map(odDetails => {
                                return (
                                    <>
                                        <div className={'odDetails-item'}>
                                            <div className={'item-name-image item-orderDetails'}>
                                                <img src={odDetails.product.mainImage} alt=""/>
                                                <b>{odDetails.product.name}</b>
                                            </div>
                                            <div className={'item-status item-orderDetails'}>
                                                <b>{odDetails.status}</b>
                                            </div>
                                            <div className={'item-orderDetails  item-quantity'}>
                                                <b>{odDetails.quantity}</b>
                                            </div>
                                            <div className={'item-orderDetails item-owner'}>
                                                <b>{user.firstName}</b>
                                            </div>
                                            <div className={'item-orderDetails item-action'}>
                                                <button onClick={() => paidOrder(odDetails)}>Paid</button>
                                                <button onClick={() => returnOrder(odDetails)}>Return</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        })}
                    </div>
                    <div className={'orders-content content-3'}>
                        {orders.map(item => {
                            return item.orderDetails.filter(od => od.status === "CANCELLED").map(odDetails => {
                                return (
                                    <>
                                        <div className={'odDetails-item'}>
                                            <div className={'item-name-image item-orderDetails'}>
                                                {/*<img src="/image/img-product/gia-sieu-xe-mercedes-amg-gt-r-tu-1159-ty-dong.jpg" alt=""/>*/}
                                                <img src={odDetails.product.mainImage} alt=""/>

                                                <b>{odDetails.product.name}</b>
                                            </div>
                                            <div className={'item-status item-orderDetails'}>
                                                <b style={{color : "red"}}>{odDetails.status}</b>
                                            </div>
                                            <div className={'item-orderDetails  item-quantity'}>
                                                <b>{odDetails.quantity}</b>
                                            </div>
                                            <div className={'item-orderDetails item-owner'}>
                                                <b>{user.firstName}</b>
                                            </div>
                                            <div className={'item-orderDetails item-action'}>
                                                <b>{item.orderTime.substring(0, 10)}</b>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        })}
                    </div>
                    <div className={'orders-content content-4'}>
                        {orders.map(item => {
                            return item.orderDetails.filter(od => od.status === "PAID").map(odDetails => {
                                return (
                                    <>
                                        <div className={'odDetails-item'}>
                                            <div className={'item-name-image item-orderDetails'}>
                                                {/*<img src="/image/img-product/gia-sieu-xe-mercedes-amg-gt-r-tu-1159-ty-dong.jpg" alt=""/>*/}
                                                <img src={odDetails.product.mainImage} alt=""/>

                                                <b>{odDetails.product.name}</b>
                                            </div>
                                            <div className={'item-status item-orderDetails'}>
                                                <b style={{color : "green"}}>{odDetails.status}</b>
                                            </div>
                                            <div className={'item-orderDetails  item-quantity'}>
                                                <b>{odDetails.quantity}</b>
                                            </div>
                                            <div className={'item-orderDetails item-owner'}>
                                                <b>{user.firstName}</b>
                                            </div>
                                            <div className={'item-orderDetails item-action'}>
                                                <b>{item.orderTime.substring(0, 10)}</b>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        })}
                    </div>
                    <div className={'orders-content content-5'}>
                        {orders.map(item => {
                            return item.orderDetails.filter(od => od.status === "RETURNED").map(odDetails => {
                                return (
                                    <>
                                        <div className={'odDetails-item'}>
                                            <div className={'item-name-image item-orderDetails'}>
                                                {/*<img src="/image/img-product/gia-sieu-xe-mercedes-amg-gt-r-tu-1159-ty-dong.jpg" alt=""/>*/}
                                                <img src={odDetails.product.mainImage} alt=""/>

                                                <b>{odDetails.product.name}</b>
                                            </div>
                                            <div className={'item-status item-orderDetails'}>
                                                <b style={{color : "grey"}}>{odDetails.status}</b>
                                            </div>
                                            <div className={'item-orderDetails  item-quantity'}>
                                                <b>{odDetails.quantity}</b>
                                            </div>
                                            <div className={'item-orderDetails item-owner'}>
                                                <b>{user.firstName}</b>
                                            </div>
                                            <div className={'item-orderDetails item-action'}>
                                                <b>{item.orderTime.substring(0, 10)}</b>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}