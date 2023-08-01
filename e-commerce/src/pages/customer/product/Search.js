import CustomerHeader from "../../../components/customer/header";
import "../category/category.css"
import {CustomerFooter} from "../../../components/customer/footer";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export const SearchProduct = () =>{
    const {search} = useParams()
    console.log(search)
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [products, setProducts] = useState([])
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [discount, setDiscount] = useState()
    const [maxRange, setMaxRange]  = useState(0)
    const [minRange, setMinRange] = useState(0)
    useEffect(() =>{
        axios.get(`http://localhost:8080/api/v1/products/search/?name=${search}&list=true`).then((res) => {
            console.log(res)
            setProducts(res.data)
        }).catch(errors =>{
            console.log(errors)
            setProducts(null)
        })
    }, [name, price, discount])
    const getBiggestPrice = () => {
        let biggestPrice = 0;
        if (products !== null) {
            for (let i = 0; i < products.length; i++) {
                if ((products[i].price - (products[i].price * products[i].discountPercent / 100)) > biggestPrice) {
                    biggestPrice = products[i].price - (products[i].price * products[i].discountPercent / 100)
                    console.log(products[i].price)
                }
            }
        }

        return biggestPrice;
    }
        return (
            <>
                <div id={'display'}>
                    <div id={'customer-header'}>
                        <CustomerHeader></CustomerHeader>
                    </div>
                    <div id={'banner'}>
                        <h2>Shop Details</h2>
                        <p><i className={'fa fa-home'} style={{fontSize: "26px"}}></i> / <span>Shop Details</span></p>
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
                                <button>SHOP NOW</button>
                                <img src="/image/6228c8689d1fe414adeb300a_1646839912310.jpg" alt=""/>
                            </div>
                        </div>
                        <div id={'category-main'}>
                            <input type="text" placeholder={'Enter name'} onChange={(e) => setName(e.target.value)}/>
                            <select name="" id="" onChange={e => {
                                setMaxRange(e.target.value)
                                setMinRange(e.target.value - 25)
                            }}>
                                <option value=""></option>
                                <option value={25}>From 0 to ${(getBiggestPrice() * 25 / 100).toFixed(2)}</option>
                                <option value={50}>From ${(getBiggestPrice() * 25 / 100).toFixed(2)} to
                                    ${(getBiggestPrice() * 50 / 100).toFixed(2)}</option>
                                <option value={75}>From ${(getBiggestPrice() * 50 / 100).toFixed(2)} to
                                    ${(getBiggestPrice() * 75 / 100).toFixed(2)}</option>
                                <option value={100}>From ${(getBiggestPrice() * 75 / 100).toFixed(2)} to
                                    ${(getBiggestPrice() * 100 / 100).toFixed(2)}</option>
                            </select>
                            <input type="number" placeholder={'Discount'}
                                   onChange={(e) => setDiscount(+e.target.value)}/>
                            <hr/>
                            <h2>Result for {search}</h2>
                            <div id={'category-main-product'}>
                                {products === null ? null : products.filter(prod => {
                                    if (name && !prod.name.toLowerCase().includes(name.toLowerCase())) {
                                        return false
                                    }
                                    console.log(prod.price - (prod.price * prod.discountPercent / 100) < getBiggestPrice() * maxRange / 100 + 1)
                                    console.log(getBiggestPrice())
                                    if (maxRange > 0 && (prod.price - (prod.price * prod.discountPercent / 100) > getBiggestPrice() * maxRange / 100) || prod.price - (prod.price * prod.discountPercent / 100) < getBiggestPrice() * minRange / 100) {
                                        return false
                                    }
                                    if (discount && prod.discountPercent < discount) {
                                        return false
                                    }
                                    return true
                                }).map(prod => (
                                    <>
                                        <div className={'product'}>
                                            <div className={'product-cost'}>
                                                {prod.discountPercent}%
                                            </div>
                                            <div className={'product-image'}>
                                                {prod.mainImage === ".png" ?
                                                    <img src={'/image/modern-teaching-concept-P7BTJU7.jpg'}></img> :
                                                    <img src={prod.mainImage}></img>}
                                            </div>
                                            <div className={'product-name'}>
                                                <span>{prod.name}</span>
                                                <span className={'alias'}>( {prod.alias} )</span>
                                                {prod.discountPercent === 0 ? (<>
                                                        <span className={'old-price'}>${prod.price.toFixed(2)}</span>
                                                        <span className={'new-price'}>${prod.price.toFixed(2)}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className={'old-price'}>${prod.price.toFixed(2)}</span>
                                                        <span className={'new-price'}>
                ${(prod.price - (prod.price * prod.discountPercent / 100)).toFixed(2)}
            </span>
                                                    </>
                                                )}
                                            </div>

                                        </div>
                                    </>
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