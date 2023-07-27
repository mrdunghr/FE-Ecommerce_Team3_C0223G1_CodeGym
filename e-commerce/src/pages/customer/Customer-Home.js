import {Link, useLocation} from "react-router-dom";
import {FaPhoneAlt, FaStar} from 'react-icons/fa';
import "./customerHome.css"
import {CustomerFooter} from "../../components/customer/footer";
import {useEffect, useState} from "react";
import axios from "axios";
const StarIcon = () => <FaStar style={{ marginRight: '10px', color: 'yellow' }} />;

export function CustomerHome() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    const [bestSellerList, setBestSellerList] = useState([])
    const [categories, setCategories] = useState([])
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/products/list-product-discount").then((res) => {
            setBestSellerList(res.data)
        })
    }, [])
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/category/all").then((res) => {
            setCategories(res.data)
        })
    }, [])
    return (
        <>
            <div className="col-12" >
                <div className="row">
                    <div className="col-12">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <Link className="navbar-brand" to="/" style={{marginLeft: 0,fontSize:"17px"}}>
                                SHOP EVENT & SAVE UP TO 65% OFF!
                            </Link>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active mr-2">
                                        <Link className="nav-link" to="/"style={{marginLeft: 0,fontSize:"17px"}}>
                                            Follow us on Facebook
                                            <span className="sr-only">(current)</span>
                                        </Link>
                                    </li>
                                    <li className="nav-item active mr-2">
                                        {user === null ? null : <Link className="nav-link" to="/customer/profile"style={{marginLeft: 0,fontSize:"17px"}}>
                                            Seller Centre
                                            <span className="sr-only">(current)</span>
                                        </Link>}
                                    </li>
                                </ul>
                            </div>
                            <div className="form-inline my-2 my-lg-0">
                                {user === null ? null : <>
                                    <img src="/image/avatar/avatar-s-2.png" alt="" style={{width : "35px", borderRadius : "50%", marginRight : "20px"}}/>
                                    <span style={{color : "white"}}>Hi, </span><h2 style={{color : "white", marginLeft : "10px", fontSize : "20px", textTransform : "capitalize"}}> {user.fullName}</h2>
                                </>}
                            </div>
                        </nav>
                    </div>
                </div>
                <hr/>
                <div className="row" style={{}}>
                    <div className="col" style={{textAlign: "left"}}>
                        <img src="/image/logo.png" alt="" style={{width: "200px", height: "70px"}}/>
                    </div>
                    <div className="col">
                        <form className="d-flex">
                            <input className="form-control me-4 h-100 mt-3" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-success mt-3" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="col mt-3" style={{textAlign: "center"}}>
                        <div className="hotline-phone-ring">
                            <div className="hotline-phone-ring-circle"></div>
                            <div className="hotline-phone-ring-circle-fill"></div>
                            <div className="hotline-phone-ring-img-circle">
                                <a href="tel:0123456789" className="pps-btn-img">
                                    <FaPhoneAlt style={{color: "red", fontSize: "30px"}}/> || Tel: 0969.969.969
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-3" style={{ textAlign: "center", backgroundColor: "#F05d0e"}}>
                        <Link className="navbar-brand" to="/" style={{ marginLeft: 0, color: "white" }}>
                            ALL DEPARTMENTS
                        </Link>
                    </div>
                    <div className="col-9"style={{backgroundColor:"white"}}>
                        <nav className="navbar navbar-expand-lg navbar-white bg-white">
                            <Link className="navbar-brand" to="/" style={{marginLeft: 0, color:"black",fontSize:"17px"}}>
                                HOME
                            </Link>
                            <Link className="navbar-brand" to="/" style={{marginLeft: 0, color:"black",fontSize:"17px"}}>
                                CUSTOMER SERVICE
                            </Link>
                            <Link className="navbar-brand" to="/" style={{marginLeft: 0, color:"black",fontSize:"17px"}}>
                                REGISTRY & GIFTING
                            </Link>
                            <Link className="navbar-brand" to="/" style={{marginLeft: 0, color:"black",fontSize:"17px"}}>
                                GIFT CARDS
                            </Link>
                            <Link className="navbar-brand" to="/" style={{marginLeft: 0, color:"black",fontSize:"17px"}}>
                                CONTACT
                            </Link>
                            <div className="form-inline my-2 my-lg-0 ml-auto">
                                {user === null ? <Link to={'/login'}>
                                    <button
                                        className="btn btn-outline-danger my-2 my-sm-0"
                                        type="submit"
                                        onClick={() => {
                                        }}
                                    >
                                        Register / Sign in
                                    </button>
                                </Link> : <></>}
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3 sidebarHome" style={{padding: '30px',backgroundColor:"white",boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px'}}>
                        {categories.map(cate => {
                            return (
                                <div style={{marginBottom: '10px'}}>
                                    {cate.enabled ? (<>
                                        <StarIcon></StarIcon><Link to={"/category/" + cate.id}>{cate.name}</Link>
                                    </>) : null}
                                </div>
                            )
                        })}
                    </div>
                    <div className="col-6" style={{backgroundColor: "#F0FFFF"}}>
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="/image/6228c8689d1fe414adeb300a_1646839912310.jpg" className="d-block w-100" alt="..."style={{height:"400px",width:"750px",padding:'20px'}}/>
                                </div>
                                <div className="carousel-item">
                                    <img src="/image/modern-teaching-concept-P7BTJU7.jpg" className="d-block w-100" alt="..."style={{height:"400px",width:"750px",padding:'20px'}}/>
                                </div>
                                <div className="carousel-item">
                                    <img src="/image/logo.png" className="d-block w-100" alt="..."style={{height:"400px",width:"750px",padding:'20px'}}/>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button"
                                    data-target="#carouselExampleIndicators" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button"
                                    data-target="#carouselExampleIndicators" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className="col-3"style={{paddingBlock:"20px"}}>
                        <div className={'col-12'}>
                            <Link className="navbar-brand" to="/" style={{ marginLeft: 10, color: "#F05d0e",fontSize:"17px"}}>
                                BEST SELLERS
                            </Link>
                            <div className="col-12 product-items">
                                {bestSellerList.map((item) => {
                                    console.log(bestSellerList)
                                    return  (
                                        <div className={'best-seller-items'}>
                                            <div className={'best-seller-items-image'}>
                                                <img src="/image/image-thumbnail.png" alt=""/>
                                            </div>
                                            <div className={'best-seller-items-description'}>
                                                <Link to={'/product/' + item.id}>{item.name}</Link><br/>
                                                <Link className={'old-price'}>${item.price}</Link>
                                                <Link className={'new-price'}>${item.price - (item.discountPercent * item.price/100)}</Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div id={'customer-footer'}>
                    <CustomerFooter></CustomerFooter>
                </div>
            </div>
        </>
    );
}
