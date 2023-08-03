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
    const { id } = useParams();
    const [reviews,setReviews]= useState([{
        id:'',
        headline:'',
        comment:'',
        rating:'',
        votes:'',
        reviewTime:'',
        product:'',
        customer:'',
        upvotedByCurrentCustomer:'',
        downvotedByCurrentCustomer:''
    }]);
    const [product, setProduct] = useState({
        id: '',
        name: '',
        discountPercent:'',
        price:'',
        inStock:'',
        shop:'',
        brand:'',
        averageRating:'',
        mainImage : '',
        fullDescription : ''
    });
    console.log(product)
    let [count, setCount] = useState(0)
    const increaseClick = () => {
        const newValue = count + 1;
        setCount(newValue);
    };
    const decreaseClick = () => {
        if (count>0){
            const newValue = count - 1;
            setCount(newValue);
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/products/detail/${id}`).then((response) => {
            setProduct(response.data)
        });
    },[]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/reviews/${id}`).then((resp) =>{
            console.log("reviews: " + resp)
            setReviews(resp.data)
        })
    },[]);

    const addItem = () =>{
        const user = JSON.parse(sessionStorage.getItem('user'))
        if(user === null ){
            navigate('/login')
        }else {
            if(user.id === product.customer.id){
                alert("You can't buy your product!")
            }else{
                const cartItem = {
                    product: product,
                    customer : user,
                    quantity : count
                }
                addItemToCart(cartItem)
            }

        }
    }
    const addItemToCart = (item) =>{
        axios.post('http://localhost:8080/api/v1/cart/add/' + item.customer.id, item).then(res => {
            console.log(res)
            alert('Adding successful!')
        })
    }
    const viewImage = (src) =>{
        Swal.fire({
            html : "<img src='https://hongngochospital.vn/wp-content/uploads/2020/02/tra-da-2.jpg'></img>"
        })
    }

    return (
        <>
            <div id={"display-detail"} style={{paddingBottom:'100px'}}>
                <div id={"customer-header"}>
                    <CustomerHeader/>
                </div>
                <div className="container-content" style={{paddingTop:"50px"}}>
                    <div className="row">
                        <div className="col-6" style={{textAlign: "center"}}>
                            {product.mainImage === ".png" ? <img src={'/image/modern-teaching-concept-P7BTJU7.jpg'} width={'500px'} height={"420px"} ></img> :
                                <img src={product.mainImage} alt="" width={'500px'} height={"420px"}/>}
                        </div>
                        <div className="col-6">
                            <h4 style={{paddingBottom:'10px'}}>{product.name}</h4>

                            <Rating
                                name="read-only"
                                value= {product.averageRating}
                                readOnly
                            />
                            <div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <h5 style={{color: '#fe5502',paddingTop:'10px'}}>Digital List Price:</h5>
                                    <span style={{paddingTop:'10px',paddingLeft:'5px'}} className={'h5'}>${product.price}</span>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', margin: '10px 0'}}>
                                    <h5 style={{color: '#ce5b5e'}}>Kindle Price:</h5>
                                    <h5 style={{color: '#88010f',paddingLeft:'5px'}}>${product.price - (product.discountPercent * product.price / 100)}</h5>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', margin: '10px 0'}}>
                                    <span style={{fontSize:'18px'}}>Availability: </span>
                                    <span style={{color: "#75a92b",fontSize:'18px',paddingLeft:'5px'}}>{product.inStock ? "inStock" : "true"}</span>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', margin: '15px 0'}}>
                                    <span style={{fontSize:'18px'}}>Shop: </span>
                                    <span style={{fontSize:'18px',color: "#fe5502",paddingLeft:'5px'}}>{product.shop.name}</span>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', margin: '15px 0'}}>
                                    <span style={{fontSize:'18px'}}>Brands: </span>
                                    <span style={{fontSize:'18px',color: "#fe5502",paddingLeft:'5px'}}>{product.brand.logo}</span>
                                </div>
                            </div>
                            <div style={{marginTop: '20px'}}>
                                <button onClick={decreaseClick} style={{border: 'none',width: '32px', height: '32px'}}>-</button>
                                <span style={{height: '32px', border: '1px solid #adabac', width: '70px', display: 'inline-block', textAlign: "center", lineHeight: '30px'}}>{count}</span>
                                <button onClick={increaseClick} style={{border: 'none',width: '32px', height: '32px'}}>+</button>
                            </div>
                            <button disabled={product.enabled ? false : true} onClick={addItem} style={{marginRight:'20px',border: 'none',fontSize:'18px',width:'250px',height:'50px',backgroundColor:'#fe5502',color:'white', marginTop : "45px"}}><i className="fa fa-shopping-cart" style={{color:'white'}} ></i> ADD TO CART</button>
                        </div>
                    </div>
                    <div style={{ paddingLeft:'160px',paddingTop: '70px', display: 'flex', alignItems: 'center' }}>
                        <Link to={''} style={{ color: 'black', marginRight: '20px', paddingRight: '20px', borderRight: '2px solid black' }} onClick={handleLinkClickDescription}><h5>Description</h5></Link>
                        <Link to={''} style={{ color: 'black' }} onClick={handleLinkClick}><h5>Reviews</h5></Link>

                    </div>
                    <div style={{ marginTop: '50px', padding: '20px' }} className={showReview ? "review-product" : "review-product hidden"}>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', padding: '20px', backgroundColor: "rgba(0,0,0,.02)", borderRadius: '10px' }}>
                            PRODUCT REVIEWS
                        </div>
                        {reviews.length === 0 ? (
                            <span style={{ fontSize:'18px',padding: "40px", textAlign: "center", display: "block" }}>There are no reviews for this product!</span>
                        ) : (
                            reviews.map((review) => (
                                <div className={'row'} key={review.id}> {/* Thêm key cho mỗi đánh giá */}
                                    <div className="avatar-customer" style={{ padding: "20px" }}>
                                        <img
                                            src='/image/avatar/avatar-s-1.png'
                                            alt=""
                                            style={{ height: "50px", width: "50px", borderRadius: "50px", marginRight: '10px' }}
                                        />
                                    </div>
                                    <div className="content-customer" style={{ padding: "20px" }}>
                                        <span style={{ fontWeight: 'bold' }}>{review.customer.lastName}</span>
                                        <div>
                                            <Rating name="read-only" value={review.rating} readOnly />
                                        </div>
                                        <div>
                                            <span style={{ opacity: '0.7' }}> {review.reviewTime.substring(11, 19)} {review.reviewTime.substring(0, 10)}</span>
                                        </div>
                                        <div style={{ marginTop: '5px' }}>
                                            <span> {review.comment}</span> <br />
                                            <hr />
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className={showDescription ? "review-description" : "review-description hidden-description"} style={{padding:'20px',marginTop:'50px'}}>
                        <div style={{fontSize:'18px',fontWeight:'bold',padding:'20px', backgroundColor:"rgba(0,0,0,.02)",borderRadius:'10px'}}>
                            DESCRIPTION PRODUCT
                        </div>
                        <div style={{padding:'20px'}}>
                            <span style={{paddingTop:'10px',paddingLeft:'5px'}}>{product.fullDescription}</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

