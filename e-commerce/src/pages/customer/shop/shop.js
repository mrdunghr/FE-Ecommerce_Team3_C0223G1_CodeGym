import CustomerHeader from "../../../components/customer/header";
import "./shop.css"
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export const ChosenShop = () =>{
    const {id} = useParams()
    const [shop, setShop] = useState({})
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/shop/get-shop/' + id).then(res =>{
            console.log(res.data)
            setShop(res.data)
        }).catch(err => {
            console.log(err)
        })
        axios.get('http://localhost:8080/api/v1/products/shop/' + id).then(res =>{
            console.log(res.data.content)
            setProducts(res.data.content)
        }).catch(err => {
            console.log(err)
        })
    },[])
    return(
        <>
            <div id={'shop-container-display'}>
                <div id={'cus-header-shop'}>
                    <CustomerHeader></CustomerHeader>
                </div>
                <div id={'main-container-shop'}>
                    <div id={'sidebar-shop'}>
                        <div id={'sidebar-shop-image'}>
                            <img src={shop.image === ".png" ? "/image/modern-teaching-concept-P7BTJU7.jpg" : shop.image} alt=""/>
                        </div>
                        <div id={'sidebar-shop-info'}>
                            <div className={'sidebar-shop-info-items'}>
                                <b style={{textTransform : 'uppercase', fontSize : "19px"}}>{shop.name} shop</b>
                            </div>
                            <div className={'sidebar-shop-info-items'}>
                                <div className={'shop-status'} style={{background : shop.enabled ? "green" : "grey"}}>

                                    {shop.enabled ? "Active" : "Inactive"}
                                </div>
                            </div>
                            <div className={'sidebar-shop-info-items'}>
                                    <b style={{textTransform : 'uppercase', fontSize : "19px"}}>Address:     </b>
                                    <b style={{ fontSize : "19px"}}>{shop.deliveryAddress}</b>
                            </div>
                            <div className={'sidebar-shop-info-items'}>

                            </div>
                        </div>
                    </div>
                    <div id={'main-shop-products-display'}>
                        <h3 style={{textAlign : "center", textTransform : "uppercase"}}>{shop.name} Products</h3>
                        {products.map(item => (
                            <Link to={'/product/' + item.id}><div className={'discount-product'}>
                                <div className={'discount-product-image'}>
                                    <Link to={'/product/' + item.id}><img src={item.mainImage === ".png" ? "/image/modern-teaching-concept-P7BTJU7.jpg" : item.mainImage} alt=""/></Link>
                                </div>
                                <div className={'discount-product-info'}>
                                    <div className={'discount-product-name'}>
                                        <Link to={'/product/' + item.id}>{item.name.length > 15 ? item.name.substring(0,15) + "..." : item.name}</Link>
                                    </div>
                                    <div className={'discount-product-price'}>
                                        <div className={'old-price'}>${item.price}</div>
                                        <div className={'new-price'}>${(item.price - (item.price * item.discountPercent/100)).toFixed(2)}</div>
                                    </div>
                                </div>
                                <Link to={'/product/' + item.id}><div className={'click-me'}>
                                    See the detail
                                </div></Link>
                            </div></Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}