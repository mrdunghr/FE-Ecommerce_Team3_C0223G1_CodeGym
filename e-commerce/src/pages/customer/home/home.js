import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "./customerHome.css"
import CustomerHeader from "../../../components/customer/header";
import {Footer} from "../../../components/admin/footer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const HomePortal = () =>{
    // Phân trang phần danh sách product
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1); // Thêm trạng thái cho tổng số trang
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 7,
            slidesToSlide: 5 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    const [bestSellerList, setBestSellerList] = useState([])
    const [categories, setCategories] = useState([])
    const [search,setSearch] = useState([])
    const navigate = useNavigate();
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
            setTotalPages(Math.ceil(res.data.length / itemsPerPage));
        })
        // if(user !== null){
        //     axios.get('http://localhost:8080/api/v1/order-details/' + user.id).then((res) => {
        //         console.log(res.data)
        //         setOrders(res.data)
        //         sessionStorage.setItem('orders', JSON.stringify(res.data))
        //     })
        // }
    }, [])
    const getCurrentPageItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return products.slice(startIndex, endIndex);
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
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
                        <h4 id={'category-text'} style={{textIndent : "10px"}}>Categories</h4>
                        {categories.map((item, index) => (index <= 17 ?
                                <Link to={'/category/' + item.id}>
                                    <div className={'categories'}>
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
                        <h4 id={'most-discount-product-text'} style={{textIndent : "10px"}}>Most discount products</h4>
                        <Carousel
                            arrows={true}
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={5000}
                            responsive={responsive}>
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
                        </Carousel>
                    </div>
                    <div id='all-product'>
                        <h4 id={'suggest-product-text'}>Suggest product</h4>
                        <div className='row'>
                            {getCurrentPageItems().map(item => (
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
                        <div id={'bnt-pagination'}>
                            <button onClick={handlePrevPage} disabled={currentPage === 1 || totalPages === 1}>
                                Previous
                            </button>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 1}>
                                Next
                            </button>
                        </div>
                    </div>

                </div>
                <Footer/>
            </div>
        </>
    )
}