import CustomerHeader from "../../../components/customer/header";
import "./DetailProduct.css"
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {CustomerFooter} from "../../../components/customer/footer";
import Rating from '@mui/material/Rating';
export function DetailProduct() {
    const [value, setValue] = useState(2);
    const navigate = useNavigate()
    const { id } = useParams();
    const [product, setProduct] = useState({
        id: '',
        name: '',
        discountPercent:'',
        price:'',
        inStock:'',
        shop:'',
        brand:'',
        averageRating:'',
        mainImage : ''
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
    }, []);

    const addItem = () =>{
        const user = JSON.parse(sessionStorage.getItem('user'))
        if(user === null ){
            navigate('/login')
        }else {
            const cartItem = {
                product: product,
                customer : user,
                quantity : count
            }
            addItemToCart(cartItem)
        }
    }
    const addItemToCart = (item) =>{
        axios.post('http://localhost:8080/api/v1/cart/add/' + item.customer.id, item).then(res => {
            console.log(res)
            alert('Adding successful!')
        })
    }

    return (
        <>
            <div id={"display-detail"} style={{paddingBottom:'100px'}}>
                <div id={"customer-header"}>
                    <CustomerHeader/>
                </div>
                <div className="container" style={{paddingTop:"50px"}}>
                    <div className="row">
                        <div className="col-6" style={{textAlign: "center"}}>
                            {product.mainImage === ".png" ? <img src={'/image/modern-teaching-concept-P7BTJU7.jpg'} width={'380px'} height={"420px"}></img> :
                                <img src={product.mainImage} alt="" width={'380px'} height={"420px"}/>}
                        </div>
                        <div className="col-6">
                            <h4>{product.name}</h4>

                            <Rating
                                name="read-only"
                                value= {product.averageRating}
                                readOnly
                            />
                            <div>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <h5 style={{color: '#fe5502'}}>Digital List Price:</h5>
                                    <span className={'h5'}>${product.price}</span>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', margin: '10px 0'}}>
                                    <h5 style={{color: '#ce5b5e'}}>Kindle Price:</h5>
                                    <h5 style={{color: '#88010f'}}>${product.price - (product.discountPercent * product.price / 100)}</h5>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', margin: '10px 0'}}>
                                    <span>Availability: </span>
                                    <span style={{color: "#75a92b"}}>{product.inStock ? "inStock" : "true"}</span>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', margin: '10px 0'}}>
                                    <span>Shop: </span>
                                    <span style={{color: "#fe5502"}}>{product.shop.name}</span>
                                </div>
                                <div style={{display: 'flex', alignItems: 'center', margin: '10px 0'}}>
                                    <span>Brands: </span>
                                    <span style={{color: "#fe5502"}}>{product.brand.logo}</span>
                                </div>
                            </div>
                            <div style={{marginTop: '20px'}}>
                                <button onClick={increaseClick} style={{border: 'none',width: '32px', height: '32px'}}>+</button>
                                <span style={{height: '32px', border: '1px solid #adabac', width: '70px', display: 'inline-block', textAlign: "center", lineHeight: '30px'}}>{count}</span>
                                <button onClick={decreaseClick} style={{border: 'none',width: '32px', height: '32px'}}>-</button>
                            </div>
                            <button onClick={addItem} style={{marginRight:'20px',border: 'none',fontSize:'18px',width:'250px',height:'50px',backgroundColor:'#fe5502',color:'white', marginTop : "80px"}}><i className="fa fa-shopping-cart" style={{color:'white'}} ></i> ADD TO CART</button>
                        </div>
                    </div>
                    <div style={{ paddingTop: '70px', display: 'flex', alignItems: 'center' }}>
                        <Link to={'/'} style={{ color: 'black', marginRight: '20px', paddingRight: '10px', borderRight: '2px solid black' }}><h5>Description</h5></Link>
                        <Link to={'/'} style={{ color: 'black', marginRight: '20px', paddingRight: '10px', borderRight: '2px solid black' }}><h5>Information</h5></Link>
                        <Link to={'/'} style={{ color: 'black' }}><h5>Reviews</h5></Link>
                    </div>
                </div>
                <CustomerFooter/>
            </div>
        </>
    )
}