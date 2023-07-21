import {Link, useLocation} from "react-router-dom";
import {FaPhoneAlt, FaStar} from 'react-icons/fa';
import "./customerHome.css"
import {CustomerFooter} from "../../components/customer/footer";
const StarIcon = () => <FaStar style={{ marginRight: '10px', color: 'yellow' }} />;

export function CustomerHome() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user)
    return (
        <>
            <div className="col-12" style={{height : "1000px"}}>
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
                                        <Link className="nav-link" to="/customer/profile"style={{marginLeft: 0,fontSize:"17px"}}>
                                            Seller Centre
                                            <span className="sr-only">(current)</span>
                                        </Link>
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
                        <div style={{ marginBottom: '10px' }}>
                            <StarIcon /> <Link>Automotive</Link>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <StarIcon /> <Link>Beauty</Link>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <StarIcon /> <Link>Books</Link>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <StarIcon /> <Link>Cameras</Link>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <StarIcon /> <Link>Bike, E-Bike</Link>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <StarIcon /> <Link>Car</Link>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <StarIcon /> <Link>Skincare</Link>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <StarIcon /> <Link>Domestic Books</Link>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <StarIcon /> <Link>Skincare</Link>
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <StarIcon /> <Link>Domestic Books</Link>
                        </div>
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
                                    <img src="/image/1.png" className="d-block w-100" alt="..."style={{height:"400px",width:"750px",padding:'20px'}}/>
                                </div>
                                <div className="carousel-item">
                                    <img src="/image/2.jpg" className="d-block w-100" alt="..."style={{height:"400px",width:"750px",padding:'20px'}}/>
                                </div>
                                <div className="carousel-item">
                                    <img src="/image/3.jpg" className="d-block w-100" alt="..."style={{height:"400px",width:"750px",padding:'20px'}}/>
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
                        <div style={{backgroundColor:"#E1f0f0"}}>
                            <Link className="navbar-brand" to="/" style={{ marginLeft: 10, color: "#F05d0e",fontSize:"17px"}}>
                                BEST SELLERS
                            </Link>
                            <div className="col-12 product-items"></div>
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
