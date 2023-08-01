import "./orders.css"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

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
            axios.get('http://localhost:8080/api/v1/order-details/' + shop[0].id).then(res =>{
                console.log(res)
                setOrderDetail(res.data)
            })
        }

    }, [update])
    const confirmOrder = (id) =>{
        axios.put('http://localhost:8080/api/v1/customer-order/confirm-order/' + id).then(res =>{
            if(update){
                setUpdate(false)
            }else{
                setUpdate(true)
            }
        }).catch(res => {
            alert("The product quantity is not enough, please update more!")
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
                                {item.status === "PAID" ? <div className={'order-status'} style={{background : "green"}}>DONE</div> : <div className={'order-status'} style={{background : item.status === "NEW" ? "salmon" : "blue"}}>{item.status}</div>}
                            </div>
                            <div className={'order-item'}>
                                <b>{item.customer.firstName}</b>
                            </div>
                            <div className={'order-action'}>
                                {item.status === "NEW" ?
                                    <>
                                        <button className={'confirm-btn'} onClick={e => confirmOrder(item.id)}>Confirm</button>
                                        <button className={'cancel-btn'}>Cancel</button>
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