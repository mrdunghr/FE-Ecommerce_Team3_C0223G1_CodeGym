import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "./customerHome.css"
import CustomerHeader from "../../../components/customer/header";

export const HomePortal = () =>{
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    const [bestSellerList, setBestSellerList] = useState([])
    const [categories, setCategories] = useState([])
    const [search,setSearch] = useState([])
    const navigate = useNavigate();
    const [products, setProducts] = useState([])
    const [discountProds, setDiscountProds] = useState([])
    console.log(categories)
    const [orders, setOrders] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/products/list-product-discount").then((res) => {
            setBestSellerList(res.data)
        })
        axios.get("http://localhost:8080/api/v1/category/all").then((res) => {
            setCategories(res.data)
        })
        axios.get("http://localhost:8080/api/v1/products/list-product-discount-sale").then(res =>{
            setDiscountProds(res.data)
        })
        axios.get('http://localhost:8080/api/v1/products/all').then(res =>{
            setProducts(res.data)
        })
        if(user !== null){
            axios.get('http://localhost:8080/api/v1/order-details/' + user.id).then((res) => {
                console.log(res.data)
                setOrders(res.data)
                sessionStorage.setItem('orders', JSON.stringify(res.data))
            })
        }
    }, [])
    return(
        <>
            <div id={'display'}>
                <div id={'home-header'}>
                    <CustomerHeader></CustomerHeader>
                </div>
                <div id={'main-home'}>
                    <div id={'banner'}>
                        <img src="/image/Thiet_ke_chua_co_ten.png" alt=""/>
                    </div>
                    <div id={'categories-box'}>
                        <h4 style={{textIndent : "10px"}}>Categories</h4>
                        {categories.map((item, index) => (index <= 19 ?
                            <Link to={'/category/' + item.id}><div className={'categories'}>
                                <div className={'categories-image'}>
                                    <Link to={'/category/' +item.id}><img src={item.image === ".png" ? "/image/modern-teaching-concept-P7BTJU7.jpg" :"/image/categories/"+item.image} alt=""/></Link>
                                </div>
                                <div className={'categories-name'}>
                                    <Link to={'/category/' +item.id}>{item.name.length > 15 ? item.name.substring(0, 10) + "..." : item.name }</Link>
                                </div>
                            </div></Link>
                                : null
                        ))}
                    </div>
                    <div id={'best-seller'}>
                        <h5 id={'best-seller-text'}>Best seller</h5>
                        {bestSellerList.filter(prod => prod.enabled).map(item => (
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
                    <div id={'discount-product'}>
                        <h4 style={{textIndent : "10px"}}>Most discount products</h4>
                        {discountProds.map(item => (
                            <Link to={'/product/' + item.id}><div className={'discount-product'}>
                                <div className={'discount-product-image'}>
                                    <Link to={'/product/' + item.id}><img src={item.mainImage === ".png" ? "/image/modern-teaching-concept-P7BTJU7.jpg" : item.mainImage} alt=""/></Link>
                                </div>
                                <div className={'discount-prodguct-info'}>
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
                    <div id={'all-product'}>
                        <h4>Suggest product</h4>
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