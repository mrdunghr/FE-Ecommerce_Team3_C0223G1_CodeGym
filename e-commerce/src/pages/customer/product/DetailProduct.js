import CustomerHeader from "../../../components/customer/header";
import "./DetailProduct.css"
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Rating from '@mui/material/Rating';
import Swal from "sweetalert2";
import {Footer} from "../../../components/admin/footer";

export function DetailProduct() {

    const [showReview, setShowReview] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    const handleLinkClick = () => {
        setShowDescription(false);
        setShowReview(true);
    };


    const handleLinkClickDescription = () => {
        setShowDescription(true);
        setShowReview(false);
    };

    const [value, setValue] = useState(2);
    const navigate = useNavigate()
    const {id} = useParams();
    const [reviews, setReviews] = useState([{
        id: '',
        headline: '',
        comment: '',
        rating: '',
        votes: '',
        reviewTime: '',
        product: '',
        customer: '',
        upvotedByCurrentCustomer: '',
        downvotedByCurrentCustomer: ''
    }]);
    const [product, setProduct] = useState({
        id: '',
        name: '',
        discountPercent: '',
        price: '',
        inStock: '',
        shop: '',
        brand: '',
        averageRating: '',
        mainImage: '',
        fullDescription: '',
        quantity:''
    });
    console.log(product)
    let [count, setCount] = useState(0)
    const increaseClick = () => {
        const newValue = count + 1;
        setCount(newValue);
    };
    const decreaseClick = () => {
        if (count > 0) {
            const newValue = count - 1;
            setCount(newValue);
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/products/detail/${id}`).then((response) => {
            setProduct(response.data)
        });
        axios.get(`http://localhost:8080/api/v1/reviews/${id}`).then((resp) => {
            console.log("reviews: " + resp)
            setReviews(resp.data)
        }).catch(err => {
            console.log(err)
        })
        if(JSON.parse(sessionStorage.getItem('user')) === null){
            const link = "/product/" + id
            sessionStorage.setItem('link', link)
        }else{
            sessionStorage.setItem('link', '/')
        }
    }, []);



    const addItem = () => {
        const user = JSON.parse(sessionStorage.getItem('user'))
        if (user === null) {
            navigate('/login')
        } else {
            if (user.id === product.customer.id) {
                alert("You can't buy your product!")
            } else {
                const cartItem = {
                    product: product,
                    customer: user,
                    quantity: count
                }
                addItemToCart(cartItem)
            }

        }
    }
    const addItemToCart = (item) => {
        axios.post('http://localhost:8080/api/v1/cart-item/add/' + item.customer.id, item).then(res => {
            console.log(res)
            alert('Adding successful!')
        }).catch(err => {
            console.log(err)
        })
    }

    function MySweetAlert(ok) {
        return (
            <Swal
                title="My picture"
                html={<img src={ok} alt="My picture"/>}
                confirmButtonText="Close"
            />
        );

    }
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2; // Số đánh giá trên mỗi trang
    const totalPages = Math.ceil(reviews.length / itemsPerPage); // Tính tổng số trang

    // Hàm lấy danh sách đánh giá cho trang hiện tại
    const getCurrentPageReviews = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return reviews.slice(startIndex, endIndex);
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
    return (
        <>
            <div id={"display-detail"} style={{paddingBottom: '100px'}}>
                <div id={"customer-header"}>
                    <CustomerHeader/>
                </div>
                <div className="container-detail" style={{paddingTop: "50px"}}>
                    <div className="row" style={{
                        margin: '50px',
                        paddingTop: '50px',
                        paddingBottom: '50px',
                        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.8)'
                    }}>
                        <div className="col-6" style={{textAlign: "center"}}>
                            {product.mainImage === ".png" ?
                                <img src={'/image/modern-teaching-concept-P7BTJU7.jpg'} width={'600px'}
                                     height={"420px"}></img> :
                                <img src={product.mainImage} alt="" width={'600px'} height={"420px"}/>}

                        </div>
                        <div className="col-6">
                            <h4 style={{paddingBottom: '10px'}}>{product.name.length > 100 ? product.name.substring(0,100) + "..." : product.name}</h4>

                            <Rating
                                name="read-only"
                                value={product.averageRating}
                                readOnly
                            />
                            <div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <h5 style={{paddingTop: '10px'}}>Digital List Price:</h5>
                                    <span style={{paddingTop: '10px', paddingLeft: '5px'}}
                                          className={'h5'}>${product.price}</span>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', margin: '10px 0'}}>
                                    <h5>Kindle Price:</h5>
                                    <h5 style={{
                                        color: '#fe5502',
                                        paddingLeft: '5px'
                                    }}>${product.price - (product.discountPercent * product.price / 100)}</h5>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', margin: '15px 0'}}>
                                    <h5 style={{fontSize: '18px'}}>Shop: </h5>
                                    <Link to={'/shop/' + product.shop.id}
                                          style={{fontSize: '18px', color: "black", paddingLeft: '5px'}}>
                                        <h5>{product.shop.name}</h5></Link>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', margin: '15px 0'}}>
                                    <h5 style={{fontSize: '18px'}}>Brands: </h5>
                                    <h5 style={{fontSize: '18px', paddingLeft: '5px'}}>{product.brand.logo}</h5>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', margin: '15px 0'}}>
                                    <h5 style={{fontSize: '18px'}}>Quantity in stock: </h5>
                                    <h5 style={{fontSize: '18px', paddingLeft: '5px'}}>{product.quantity > 10 ? product.quantity : "Only " + product.quantity + " left."}</h5>
                                </div>
                            </div>
                            <div style={{marginTop: '20px'}}>
                                <button onClick={decreaseClick}
                                        style={{border: 'none', width: '32px', height: '32px'}}>-
                                </button>
                                <span style={{
                                    height: '32px',
                                    border: '1px solid #adabac',
                                    width: '70px',
                                    display: 'inline-block',
                                    textAlign: "center",
                                    lineHeight: '30px'
                                }}>{count}</span>
                                <button onClick={increaseClick}
                                        style={{border: 'none', width: '32px', height: '32px'}}>+
                                </button>
                            </div>
                            <button id={"btn-cart"} disabled={!product.enabled} onClick={addItem} style={{
                                marginRight: '20px',
                                border: 'none',
                                fontSize: '18px',
                                width: '250px',
                                height: '50px',
                                backgroundColor: '#fe5502',
                                color: 'white',
                                marginTop: "45px",
                                cursor: product.enabled ? "pointer" : "not-allowed"
                            }}><i className="fa fa-shopping-cart" style={{color: 'white'}}></i> ADD TO CART
                            </button>
                        </div>
                    </div>
                    <div style={{paddingLeft: '250px', paddingTop: '30px', display: 'flex', alignItems: 'center'}}>
                        <Link to={''} style={{
                            color: 'black',
                            marginRight: '20px',
                            paddingRight: '20px',
                            borderRight: '2px solid black'
                        }} onClick={handleLinkClickDescription}><h5>Description</h5></Link>
                        <Link to={''} style={{color: 'black'}} onClick={handleLinkClick}><h5>Reviews</h5></Link>
                    </div>

                    <div style={{marginTop: '50px', paddingLeft: '70px', paddingRight: '70px'}}
                         className={showReview ? "review-product" : "review-product hidden"}>
                        <div style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            padding: '20px',
                            backgroundColor: "rgba(0,0,0,.02)",
                            borderRadius: '10px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)'
                        }}>
                            PRODUCT REVIEWS
                        </div>
                        {reviews.length === 0 ? (
                            <span style={{fontSize: '18px', textAlign: "center", display: "block"}}>There are no reviews for this product!</span>
                        ) : (
                            getCurrentPageReviews().map((review) => (
                                <div className={'row'} key={review.id} style={{paddingLeft:'50px',paddingRight:'50px'}}> {/* Thêm key cho mỗi đánh giá */}
                                    <div className="avatar-customer">
                                            <img
                                                src='/image/avatar/avatar-s-1.png'
                                                alt=""
                                                style={{
                                                    height: "50px",
                                                    width: "50px",
                                                    borderRadius: "50px",
                                                    marginRight: '10px'
                                                }}
                                            />
                                        </div>
                                        <div className="content-customer">
                                            <span style={{fontWeight: 'bold'}}>{review.customer.lastName}</span>
                                            <div>
                                                <Rating name="read-only" value={review.rating} readOnly/>
                                            </div>
                                            <div>
                                                <span
                                                    style={{opacity: '0.7'}}> {review.reviewTime.substring(11, 19)} {review.reviewTime.substring(0, 10)}</span>
                                            </div>
                                            <div style={{marginTop: '5px'}}>
                                                <span> {review.comment}</span> <br/>
                                                <hr/>
                                            </div>
                                        </div>
                                </div>
                            ))
                        )}
                        <div>
                        {totalPages > 1 && (
                            <div id="bnt-pagination">
                                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                                    Previous
                                </button>
                                <span>{currentPage}</span>
                                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                                    Next
                                </button>
                            </div>
                        )}
                        </div>
                    </div>
                    <div className={showDescription ? "review-description" : "review-description hidden-description"}
                         style={{paddingLeft: '70px', paddingRight: '70px', marginTop: '50px'}}>
                        <div style={{
                            fontSize: '18px',
                            fontWeight: 'bold',
                            padding: '20px',
                            backgroundColor: "rgba(0,0,0,.02)",
                            borderRadius: '10px',
                            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)'
                        }}>
                            DESCRIPTION PRODUCT
                        </div>
                        <div style={{padding: '20px'}}>
                            <span style={{paddingTop: '10px', paddingLeft: '5px'}}>{product.fullDescription}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

