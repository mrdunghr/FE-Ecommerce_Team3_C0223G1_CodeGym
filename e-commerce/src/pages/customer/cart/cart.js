import {useEffect, useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import CustomerHeader from "../../../components/customer/header";
import "./cart.css"
import axios from "axios";
import {forEach} from "react-bootstrap/ElementChildren";
export const CustomerCart = () =>{

    const user = (JSON.parse(sessionStorage.getItem('user')))
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState()
    useEffect( () => {
        if (JSON.parse(sessionStorage.getItem('user')) === null){
            navigate('/login')
        }else {
            axios.get('http://localhost:8080/api/v1/cart/view/' + user.id).then((res) =>{
            })
        }
    }, [])
    return(
        <>
            <div id={'display'}>
                <div id={'customer-header'}>
                    <CustomerHeader></CustomerHeader>
                </div>
                <div id={'cart-customer-profile'}>
                    <div id={'profile-box'}>
                        <div id={'profile-image'}>
                            <img src="/image/avatar/avatar-s-2.png" alt=""/>
                            <h2>{user.firstName}</h2>
                        </div>
                        <div id={'customer-info'}>
                            <Link>Histories</Link>
                            <Link>Histories</Link>
                            <Link>Histories</Link>
                        </div>
                    </div>
                </div>
                <div id={'main-outlet-cart'}>
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}

export const Cart = () =>{
    const user = JSON.parse(sessionStorage.getItem('user'))
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([])
    const [updated, setUpdated] = useState(false)
    useEffect(() => {
        if(user === null){
            navigate('/login')
        }else{
            axios.get('http://localhost:8080/api/v1/cart/view/' + user.id).then((res) =>{
                setCartItems(res.data)
            })
        }
    }, [updated])
    const buildUp = (item, action) =>{
        const rolling = {
            id : item.id,
            customer : {
                id : item.customer.id
            },
            product : {
                id : item.product.id
            },
            quantity : item.quantity
        }
        switch (action){
            case "+" :
                increaseButton(rolling)
                break;
            case "-":
                decreaseButton(rolling)
                break;
        }
    }
    const increaseButton = (item) =>{
        console.log(item)
        axios.put('http://localhost:8080/api/v1/cart/update-quantities/increase', item).then((res) =>{
            if(updated){
                setUpdated(false)
            }else{
                setUpdated(true)
            }
        })
    }
    const decreaseButton = (item) =>{
        console.log(item)
        axios.put('http://localhost:8080/api/v1/cart/update-quantities/decrease', item).then((res) =>{
            if(updated){
                setUpdated(false)
            }else{
                setUpdated(true)
            }
        })
    }
    function totalPrice(){
        let total = 0
        for (const item of cartItems){
            total += (item.product.price - (item.product.price * item.product.discountPercent/100)).toFixed(2) * item.quantity
        }
        return total
    }

    return(
        <div id={'cart-container'}>
            <div id={'main-cart'}>
                <div id={'cart-list'}>
                    <div id={'cart-header'}>
                        <div id={'first-cart-header'}>
                            <span>Product</span>
                        </div>
                        <div id={'second-cart-header'}>
                            <div className={'second-cart-header-items'}>
                                <span>Price</span>
                            </div>
                            <div className={'second-cart-header-items'}>
                                <span>Quantity</span>
                            </div>
                            <div className={'second-cart-header-items'}>
                                <span>Total</span>
                            </div>
                            <div className={'second-cart-header-items'}>
                                <span>Action</span>
                            </div>
                        </div>
                    </div>
                    {cartItems.map(item => (
                        <div className={'cart-product'}>
                            <div className={'cart-product-name-image'}>
                                <img src={item.product.mainImage === ".png" ? "/image/modern-teaching-concept-P7BTJU7.jpg" : item.product.mainImage} alt=""/>
                                <b>{item.product.name}</b>
                            </div>
                            <div className={'cart-product-info'}>
                                <div className={'info-items'}>
                                    <span>${(item.product.price - (item.product.price * item.product.discountPercent/100)).toFixed(2)}</span>
                                </div>
                                <div className={'info-items'}>
                                    <div className={'quantity-track'}>
                                        <div onClick={() => buildUp(item, "-")} className={'decrease-item update-quan'}>
                                            -
                                        </div>
                                        <div className={'item-quan'}>
                                            {item.quantity}
                                        </div>
                                        <div onClick={() => buildUp(item, "+")} className={'increase-item update-quan'}>
                                            +
                                        </div>
                                    </div>
                                </div>
                                <div className={'info-items'}>
                                    <span>${(item.product.price - (item.product.price * item.product.discountPercent/100)).toFixed(2) * item.quantity}</span>
                                </div>
                                <div className={'info-items'}>
                                    <button>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div id={'section-buying'}>
                <div id={'first-section-buying'}>
                    <span>Choose All</span>
                    <span>Delete</span>
                    <span>Remove inactive product</span>
                </div>
                <div id={'second-section-buying'}>
                    <span>Total paying ({cartItems.length} products): ${totalPrice()}</span>
                    <button id={'btn-pay'}>Pay</button>
                </div>
            </div>
        </div>
    )
}