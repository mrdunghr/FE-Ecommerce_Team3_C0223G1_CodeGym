import CustomerHeader from "../../../components/customer/header";
import "./category.css"
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Footer} from "../../../components/admin/footer";
import {useSelector} from "react-redux";

export const Category = () => {
    const {id} = useParams()
    const [page, setPage] = useState(0)
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [products, setProducts] = useState([])
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [productCategory,setProductCategory] = useState([])
    const [discount, setDiscount] = useState()
    const [maxRange, setMaxRange] = useState(0)
    const [minRange, setMinRange] = useState(0)
    const status = useSelector(state => state.update)
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/products/show-by-category/${id}` + "?page=" + page + "&size=6").then((res) => {
            setProducts(res.data.content)
        }).catch(errors => {
            setProducts(null)
        })
    }, [page, name, maxRange, discount, status])

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/products/latest/category/${id}`).then((res) => {
            setProductCategory(res.data)
        })
    },[])
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
    const handlePrevPage = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
        console.log(page)
    };

    const handleNextPage = () => {
        if (products.length > 1) { // điều kiện list có length > 1 thì không được next nữa, nhỏ hơn mới được tăng giá trị page
            setPage((prevPage) => prevPage + 1);
        }
    };
    return (
        <>
            <div id={'display'} style={{height: "auto"}}>
                <div id={'customer-header'}>
                    <CustomerHeader></CustomerHeader>
                </div>
                <div id={'category-banner'}>
                    <h2>Shop Details</h2>
                    <p><i className={'fa fa-home'} style={{fontSize: "26px"}}></i> / <span>Shop Details</span></p>
                </div>
                <div id={'category-display'}>
                    <div id={'category-sidebar'}>
                        <div id={'category-first-sidebar'}>
                            <h2>New Arrival</h2>
                            <hr/>
                            <div className={'sidebar-product-item'}>
                                <div className={'sidebar-product-name'}>
                                    {productCategory.map((item,index) => (
                                        <Link to={'/product/'+ item.id} id={"link-product"}>
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <Link to={'/product/'+item.id}><img src={item.mainImage === ".png" ? "/image/modern-teaching-concept-P7BTJU7.jpg" : item.mainImage} alt="" style={{width:'100px',height:'60px', marginRight:'20px'}}/></Link>
                                                    </td>
                                                    <td><div className={'name-product'}>${item.name}</div>
                                                    <span className={'old-price'}>${item.price}</span>
                                                    <span className={'new-price'}>${(item.price - (item.price * item.discountPercent/100)).toFixed(2)}</span>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                        </div>
                        <div id={'category-second-sidebar'}>
                            <Link to={'/customer/cart'}>
                                <button>SHOP NOW</button>
                            </Link>
                            <img src="/image/6228c8689d1fe414adeb300a_1646839912310.jpg" alt=""/>
                        </div>
                    </div>
                    <div id={'category-main'}>
                        <input type="text" placeholder={'Enter name'} onChange={(e) => setName(e.target.value)}/>
                        <select name="" id="" onChange={e => {
                            setMaxRange(e.target.value)
                            setMinRange(e.target.value - 25)
                        }} style={{padding: '5px', marginLeft: '10px', width: '280px'}}>
                            <option value="">Select price range</option>
                            <option value={25}>From 0 to ${(getBiggestPrice() * 25 / 100).toFixed(2)}</option>
                            <option value={50}>From ${(getBiggestPrice() * 25 / 100).toFixed(2)} to
                                ${(getBiggestPrice() * 50 / 100).toFixed(2)}</option>
                            <option value={75}>From ${(getBiggestPrice() * 50 / 100).toFixed(2)} to
                                ${(getBiggestPrice() * 75 / 100).toFixed(2)}</option>
                            <option value={100}>From ${(getBiggestPrice() * 75 / 100).toFixed(2)} to
                                ${(getBiggestPrice() * 100 / 100).toFixed(2)}</option>
                        </select>
                        <input type="number" placeholder={'Discount'} onChange={(e) => setDiscount(+e.target.value)}/>
                        <hr/>
                        <div id={'category-main-product'}>
                            {products === null ?
                                <h2>This category doesn't have any products yet!</h2> : products.filter(prod => {
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
                                    <Link to={'/product/' + prod.id}>
                                        <div className={'product'}>
                                            <div className={'lock-discount'}>
                                                <div className={'product-cost'}>
                                                    {prod.discountPercent}%
                                                </div>
                                            </div>
                                            <div className={'product-image'}>
                                                <Link to={'/product/' + prod.id}>{prod.mainImage === ".png" ?
                                                    <img src={'/image/modern-teaching-concept-P7BTJU7.jpg'}></img> :
                                                    <img src={prod.mainImage}></img>}</Link>
                                            </div>
                                            <div className={'product-name'}>
                                                <Link to={'/product/' + prod.id}>
                                                    <span>{prod.name.length > 15 ? prod.name.substring(0, 15) + "..." : prod.name}</span>
                                                </Link>
                                                <span
                                                    className={'alias'}>( {prod.alias.length > 15 ? prod.alias.substring(0, 15) + "..." : prod.alias} )</span>
                                                <span className={'old-price'}>${prod.price}</span>
                                                <span
                                                    className={'new-price'}>${prod.price - (prod.price * prod.discountPercent / 100)}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            <div  style={{clear: 'both'}}>
                                <button onClick={handlePrevPage}>Previous</button>
                                <button onClick={handleNextPage}>Next</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )

}