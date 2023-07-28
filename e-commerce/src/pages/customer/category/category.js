import CustomerHeader from "../../../components/customer/header";
import "./category.css"
import {CustomerFooter} from "../../../components/customer/footer";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export const Category = () =>{
    const {id} = useParams()
    console.log(id)
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [products, setProducts] = useState([])
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [discount, setDiscount] = useState()
    useEffect(() =>{
        axios.get(`http://localhost:8080/api/v1/products/show-by-category/${id}?list=true`).then((res) => {
            console.log(res)
            setProducts(res.data)
        }).catch(errors =>{
            console.log(errors)
            setProducts(null)
        })
    }, [name, price, discount])

    return(
        <>
            <div id={'display'}>
                <div id={'customer-header'}>
                    <CustomerHeader></CustomerHeader>
                </div>
                <div id={'banner'}>
                    <h2>Shop Details</h2>
                    <p><i className={'fa fa-home'} style={{fontSize : "26px"}}></i> / <span>Shop Details</span></p>
                </div>
                <div id={'category-display'}>
                    <div id={'category-sidebar'}>
                        <div id={'category-first-sidebar'}>
                            <h2>New Arrival</h2>
                            <hr/>
                            <div className={'sidebar-product-item'}>
                                <div className={'sidebar-product-image'}>
                                    <img src="/image/modern-teaching-concept-P7BTJU7.jpg" alt=""/>
                                </div>
                                <div className={'sidebar-product-name'}>
                                    <p>Apple Airpods</p>
                                    <span className={'old-price'}>$2000.00</span>
                                    <span className={'new-price'}>$1600.99</span>
                                </div>
                            </div>
                            <div className={'sidebar-product-item'}>
                                <div className={'sidebar-product-image'}>
                                    <img src="/image/modern-teaching-concept-P7BTJU7.jpg" alt=""/>
                                </div>
                                <div className={'sidebar-product-name'}>
                                    <p>Apple Airpods</p>
                                    <span className={'old-price'}>$2000.00</span>
                                    <span className={'new-price'}>$1600.99</span>
                                </div>
                            </div>
                            <div className={'sidebar-product-item'}>
                                <div className={'sidebar-product-image'}>
                                    <img src="/image/modern-teaching-concept-P7BTJU7.jpg" alt=""/>
                                </div>
                                <div className={'sidebar-product-name'}>
                                    <p>Apple Airpods</p>
                                    <span className={'old-price'}>$2000.00</span>
                                    <span className={'new-price'}>$1600.99</span>
                                </div>
                            </div>
                        </div>
                        <div id={'category-second-sidebar'}>
                            <Link to={'/customer/cart'}><button>SHOP NOW</button></Link>
                            <img src="/image/6228c8689d1fe414adeb300a_1646839912310.jpg" alt=""/>
                        </div>
                    </div>
                    <div id={'category-main'}>
                        <input type="text" placeholder={'Enter name'} onChange={(e) => setName(e.target.value)}/>
                        <input type="number" placeholder={'Enter price'} onChange={(e) => setPrice(+e.target.value)}/>
                        <input type="number" placeholder={'Discount'} onChange={(e) => setDiscount(+e.target.value)}/>
                        <hr/>
                        <div id={'category-main-product'}>
                            {products === null ? <h2>This category doesn't have any products yet!</h2> : products.filter(prod => {
                                if(name && !prod.name.toLowerCase().includes(name.toLowerCase())){
                                    return false
                                }
                                if(price && prod.price- (prod.price * prod.discountPercent/100) > price){
                                    return false
                                }
                                if(discount && prod.discountPercent < discount){
                                    return false
                                }
                                return true
                            }).map(prod => (
                                <div className={'product'}>
                                    <div className={'product-cost'}>
                                        {prod.discountPercent}%
                                    </div>
                                    <div className={'product-image'}>
                                        <Link to={'/product/' + prod.id}>{prod.mainImage === ".png" ? <img src={'/image/modern-teaching-concept-P7BTJU7.jpg'}></img> : <img src={prod.mainImage}></img>}</Link>
                                    </div>
                                    <div className={'product-name'}>
                                        <Link to={'/product/' + prod.id}>
                                        <span>{prod.name}</span>
                                        </Link>
                                        <span className={'alias'}>( {prod.alias} )</span>
                                        <span className={'old-price'}>${prod.price}</span>
                                        <span className={'new-price'}>${prod.price - (prod.price * prod.discountPercent/100)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div id={'customer-footer'}>
                    <CustomerFooter></CustomerFooter>
                </div>
            </div>
        </>
    )

}