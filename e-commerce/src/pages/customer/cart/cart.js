import {useEffect, useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import CustomerHeader from "../../../components/customer/header";
import "./cart.css"
import axios from "axios";
import Swal from "sweetalert2";
import {useSelector} from "react-redux";
import {Footer} from "../../../components/admin/footer";

export const CustomerCart = () =>{
    const user = (JSON.parse(sessionStorage.getItem('user')))
    const navigate = useNavigate()
    const status = useSelector(state => state.update)
    useEffect( () => {
        if (JSON.parse(sessionStorage.getItem('user')) === null){
            navigate('/login')
        }else {
            axios.get('http://localhost:8080/api/v1/cart-item/view/' + user.id).then((res) =>{
            })
        }
    }, [status])
    return(
        <>
            <div id={'display-cart'}>
                <div id={'customer-header'}>
                    <CustomerHeader></CustomerHeader>
                </div>
                <div id={'cart-customer-profile'}>
                    <div id={'profile-box'}>
                        <div id={'profile-image'}>
                            <img src="/image/avatar/avatar-s-2.png" alt=""/>
                            <h2>{user === null ? null : user.firstName}</h2>
                        </div>
                        <div id={'customer-info'}>
                            <Link to={''} className={'profile-tab'}>Your cart</Link>
                            <Link to={'orders'} className={'profile-tab'}>Your orders</Link>
                            <Link to={'payment'} className={'profile-tab'}>Payment history</Link>
                        </div>
                    </div>
                </div>
                <div id={'main-outlet-cart'}>
                    <Outlet></Outlet>
                </div>
                <div id={'cart-footer'}>
                    <Footer></Footer>
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
    const [checked, setChecked] = useState("unchecked")
    const status = useSelector(state => state.update)
    useEffect(() => {
        if(user === null){
            navigate('/login')
        }else{
            axios.get('http://localhost:8080/api/v1/cart-item/view/' + user.id).then((res) =>{
                setCartItems(res.data)

            })
        }
    }, [updated, status])
    const buildUp = (item, action) =>{
        const rolling = {
            id : item.id,
            customer : {
                id : item.customer.id
            },
            product : {
                id : item.product.id
            },
            quantity : item.quantity,
            checked : item.checked
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
    function handleCheckboxChange(item) {
        const rolling = {
            id : item.id,
            customer : {
                id : item.customer.id
            },
            product : {
                id : item.product.id
            },
            quantity : item.quantity,
            checked : item.checked
        }
        changeStatusInCart(rolling)
    }
    const changeStatusInCart = (item) =>{
        axios.put('http://localhost:8080/api/v1/cart-item/checked-item', item).then((res) => {
            if (updated){
                setUpdated(false)
            }else{
                setUpdated(true)
            }
        })
    }
    const increaseButton = (item) =>{
        console.log(item)
        axios.put('http://localhost:8080/api/v1/cart-item/update-quantities/increase', item).then((res) =>{
            if(updated){
                setUpdated(false)
            }else{
                setUpdated(true)
            }
        })
    }
    const decreaseButton = (item) =>{
        console.log(item)
        if(item.quantity === 0){
            alert("Can't decrease anymore!")
        }else{
        axios.put('http://localhost:8080/api/v1/cart-item/update-quantities/decrease', item).then((res) =>{
            if(updated){
                setUpdated(false)
            }else{
                setUpdated(true)
            }
        })
    }
    }
    function payment(){
        if (cartItems.filter(item => item.checked).length !== 0){
            Swal.fire({
                title : "Confirm paying " + cartItems.filter(item => item.checked).length + " product?",
                showCancelButton : true
            }).then(res => {
                if(res.isConfirmed){
                    axios.post('http://localhost:8080/api/v1/payment/create-order/' + user.id).then(res => {
                        Swal.fire("Confirm success! The order will now in shop's orders queue")
                        if(updated){
                            setUpdated(false)
                        }else{
                            setUpdated(true)
                        }
                    }).catch(err => {
                        Swal.fire("You are paying " + err.response.data.length + " products that have been disabled!")
                        console.log(err)
                    })
                }
            })
        }else{
            alert('There is no product in your cart. Please add more in your cart list!')
        }
    }
    
    function totalPrice(){
        let total = 0
        for (const item of cartItems){
            if(item.checked){
                total += (item.product.price - (item.product.price * item.product.discountPercent/100)).toFixed(2) * item.quantity
            }
        }
        return total
    }
    const handleAllcheckboxes = async () =>{
        if(checked === "unchecked"){
            setChecked("checked")
        }else{
            setChecked("unchecked")
        }
        await callforchecked(checked)
    }
    const callforchecked = (checked) =>{
        axios.put('http://localhost:8080/api/v1/cart-item/checked-all-item/' + checked  + "/" + user.id ).then((res) => {
            if(updated){
                setUpdated(false)
            }else{
                setUpdated(true)
            }
        })
    }
    const removeFromCart = (id) =>{
        Swal.fire({
            showCancelButton : true,
            title : "Are you sure you want to remove this product?"
        }).then(res =>{
            if(res.isConfirmed){
                axios.delete('http://localhost:8080/api/v1/cart-item/remove-item/' + id).then(res =>{
                    Swal.fire("Remove success!")
                    if(updated){
                        setUpdated(false)
                    }else{
                        setUpdated(true)
                    }
                })
            }
        })
    }

    return(
        <div id={'cart-container'}>
            <div id={'main-cart'}>
                <div id={'cart-list'}>
                    <div id={'cart-header'}>
                        <div id={'first-cart-header'}>
                            <input type="checkbox" onChange={handleAllcheckboxes}/>
                             <b>Product</b>
                        </div>
                        <div id={'second-cart-header'}>
                            <div className={'second-cart-header-items'}>
                                <b>Price</b>
                            </div>
                            <div className={'second-cart-header-items'}>
                                <b>Quantity</b>
                            </div>
                            <div className={'second-cart-header-items'}>
                                <b>Total</b>
                            </div>
                            <div className={'second-cart-header-items'}>
                                <b>Action</b>
                            </div>
                        </div>
                    </div>
                    {cartItems.map(item => (
                        <div className={'cart-product'}>
                           <div className={'cart-product-name-image'}>
                               <Link to={'/shop/' + item.product.shop.id}><div className={'shop-name'}>{item.product.shop.name.length > 10 ? item.product.shop.name.substring(0, 10) : item.product.shop.name} SHOP</div></Link>
                                <input type="checkbox" checked={item.checked} onChange={() => handleCheckboxChange(item)}/>
                               <Link to={'/product/' + item.product.id}><img src={item.product.mainImage === ".png" ? "/image/modern-teaching-concept-P7BTJU7.jpg" : item.product.mainImage} alt=""/></Link>
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
                                    <button onClick={() => removeFromCart(item.id)}>Delete</button>
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
                    <span>Total paying ({cartItems.filter(item => item.checked).length} products): ${totalPrice()}</span>
                    <button onClick={payment} id={'btn-pay'}>Pay</button>
                </div>
            </div>
        </div>
    )
}