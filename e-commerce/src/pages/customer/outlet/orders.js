import "./orders.css"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export const OrdersManage = () =>{
    const shop = JSON.parse(sessionStorage.getItem('shop'))
    const user = JSON.parse(sessionStorage.getItem('user'))
    const navigate = useNavigate()
    const [page, setPage] = useState(0)
    const [update, setUpdate] = useState(false)
    const [orderDetails, setOrderDetail] = useState([])
    useEffect(() => {
        if(user === null && shop === null){
            navigate('/login')
        }else {
            axios.get('http://localhost:8080/api/v1/order-details/shop/' + shop[0].id).then(res =>{
                console.log(res)
                setOrderDetail(res.data)
            }).catch(err => {
                console.log(err)
            })
        }

    }, [update])
    const confirmOrder = (id) =>{
        Swal.fire({
            showCancelButton : true,
            title : "Confirm this order?"
        }).then(res =>{
            if(res.isConfirmed){
                axios.put('http://localhost:8080/api/v1/order-details/confirm-order/confirm/' + id).then(res =>{
                    if(update){
                        setUpdate(false)
                    }else{
                        setUpdate(true)
                    }
                }).catch(res => {
                    alert("The product quantity is not enough, please update more!")
                })
            }else{
                Swal.fire("Cancel success!")
            }
        })

    }
    const cancelOrder = (id) =>{
        Swal.fire({
            title : "Cancel this order?",
            showCancelButton : true
        }).then(res => {
            if(res.isConfirmed){
                axios.put('http://localhost:8080/api/v1/order-details/confirm-order/cancel/' + id).then(res =>{
                    Swal.fire("Confirm success!")
                    if(update){
                        setUpdate(false)
                    }else{
                        setUpdate(true)
                    }
                }).catch(res => {
                    alert("The product quantity is not enough, please update more!")
                })
            }
        })
    }
    return(
        <div id={'order-display'}>
            <div id={'main-order'}>
                <div id={'main-order-header'}>
                    <div className={'order-item-info'}>
                        <b>Product</b>
                    </div>
                    <div className={'order-item'}>
                        <b>Quantity</b>
                    </div>
                    <div className={'order-item'}>
                        <b>Status</b>
                    </div>
                    <div className={'order-item'}>
                        <b>Customer</b>
                    </div>

                    <div className={'order-action'}>
                        <b>Action</b>
                    </div>
                </div>
                <div id={'main-order-main'}>
                    {orderDetails.map(item => (
                        <div className={'orders'}>
                            <div className={'order-item-info'}>
                                <img src={item.product.mainImage === ".png" ? "/image/modern-teaching-concept-P7BTJU7.jpg" : item.product.mainImage} alt=""/>
                                <b>{item.product.name}</b>
                            </div>
                            <div className={'order-item'}>
                                <b>{item.quantity}</b>
                            </div>
                            <div className={'order-item'}>
                                {item.status === "NEW" ? <div className={'order-status'} style={{background : "salmon"}}>{item.status}</div> : null}
                                {item.status === "PAID" ? <div className={'order-status'} style={{background : "green"}}>SUCCESS</div> : null}
                                {item.status === "PROCESSING" ? <div className={'order-status'} style={{background : "blue"}}>{item.status}</div> : null}
                                {item.status === "RETURNED" ? <div className={'order-status'} style={{background : "grey"}}>{item.status}</div> : null}
                                {item.status === "CANCELLED" ? <div className={'order-status'} style={{background : "red"}}>{item.status}</div> : null}
                            </div>
                            <div className={'order-item'}>
                                <b>{item.customer.firstName}</b>
                            </div>
                            <div className={'order-action'}>
                                {item.status === "NEW" ?
                                    <>
                                        <button className={'confirm-btn'} onClick={e => confirmOrder(item.id)}>Confirm</button>
                                        <button className={'cancel-btn'} onClick={e => cancelOrder(item.id)}>Cancel</button>
                                    </>
                                     : null}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}