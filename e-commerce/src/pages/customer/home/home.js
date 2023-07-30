import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import "./customerHome.css"
import CustomerHeader from "../../../components/customer/header";

export const HomePortal = () =>{
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    const [bestSellerList, setBestSellerList] = useState([])
    const [categories, setCategories] = useState([])
    const [search,setSearch] = useState([])
    const navigate = useNavigate();
    const [discountProds, setDiscountProds] = useState([])
    console.log(categories)
    const logout = () =>{
        sessionStorage.setItem('user', null)
        navigate('/')
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/product/search/${search}`);
    };
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
    }, [])

    return(
        <>
            <div id={'display'}>
                <div id={'home-header'}>
                    <CustomerHeader></CustomerHeader>
                </div>
                <div id={'main-home'}>
                    <div id={'categories-box'}>
                        <h4 style={{textIndent : "10px"}}>Categories</h4>
                        {categories.map((item, index) => (index <= 19 ?
                            <div className={'categories'}>
                                <div className={'categories-image'}>
                                    <img src="/image/modern-teaching-concept-P7BTJU7.jpg" alt=""/>
                                </div>
                                <div className={'categories-name'}>
                                    {item.name.length > 15 ? item.name.substring(0, 15) + "..." : item.name }
                                </div>
                            </div>
                                : null
                        ))}
                    </div>
                    <div id={'best-seller'}>
                        <h5 id={'best-seller-text'}>Best seller</h5>
                        {bestSellerList.filter(item => item.enabled).map(prod => (
                            <div className={'best-seller-product'}>
                                <div className={'best-seller-product-image'}>
                                    <img src={prod.mainImage === ".png" ? "/image/modern-teaching-concept-P7BTJU7.jpg" : prod.mainImage} alt=""/>
                                </div>
                                <div className={'best-seller-product-info'}>
                                    <div className={'best-seller-product-name'}>
                                        <span>{prod.name.length > 15 ? prod.name.substring(0, 15) + "..." : prod.name}</span>
                                    </div>
                                    <div className={'best-seller-product-price'}>
                                        <div className={'old-price'}>${prod.price}</div>
                                        <div className={'new-price'}>${(prod.price - (prod.price * prod.discountPercent/100)).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div id={'discount-product'}>
                        <h4 style={{textIndent : "10px"}}>Most discount products</h4>
                        {discountProds.map(item => (
                            <div className={'discount-product'}>
                                <div className={'discount-product-image'}>
                                    <img src={item.mainImage === ".png" ? "/image/modern-teaching-concept-P7BTJU7.jpg" : item.mainImage} alt=""/>
                                </div>
                                <div className={'discount-product-info'}>
                                    <div className={'discount-product-name'}>
                                        <span>{item.name.length > 15 ? item.name.substring(0,15) + "..." : item.name}</span>
                                    </div>
                                    <div className={'discount-product-price'}>
                                        <div className={'old-price'}>${item.price}</div>
                                        <div className={'new-price'}>${(item.price - (item.price * item.discountPercent/100)).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}