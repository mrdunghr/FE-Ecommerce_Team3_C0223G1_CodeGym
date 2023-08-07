import {useNavigate, useParams} from "react-router-dom";
import "./review.css"
import CustomerHeader from "../../../components/customer/header";
import {useEffect, useState} from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import {Field, Form, Formik} from "formik";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Swal from "sweetalert2";

export const ReviewProduct = () =>{
    const {id} = useParams()
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [rate, setRate] = useState(0)
    const {odDetailID} = useParams()
    console.log(rate)
    const navigate = useNavigate()
    const handleRating = (value) =>{
        setRate(value)
    }
    const [product, setProduct] = useState({
        id: '',
        name: '',
        discountPercent:'',
        price:'',
        inStock:'',
        shop:'',
        brand:'',
        averageRating: 0,
        mainImage : '',
        fullDescription : ''
    });
    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/products/detail/' + id).then((res) =>{
            console.log(res)
            setProduct(res.data)
        })
    },[])
    return(
        <>
            <div id={'review-display'}>
                <div id={'cus-header-review'}>
                    <CustomerHeader></CustomerHeader>
                </div>
                <div id={'main-review-display'}>
                    <div id={'product-sidebar-review'}>
                        <div id={'product-review-sidebar-image'}>
                            <img src={product.mainImage === ".png" ? "/image/modern-teaching-concept-P7BTJU7.jpg" : product.mainImage} alt=""/>
                        </div>
                        <div id={'product-review-sidebar-info'}>
                            <h3 style={{textTransform : "uppercase"}}>{product.name}</h3>
                            <Rating
                                name="read-only"
                                value= {product.averageRating}
                                readOnly
                            />
                            <p>Digital List Price: <span className={'old-price'}>${product.price}</span></p>
                            <p>Kindle Price: <span className={'new-price'}>${(product.price - (product.price * product.discountPercent/100)).toFixed(2)}</span></p>
                            <p>Shop: <span style={{textTransform : "uppercase"}}>{product.shop.name}</span></p>
                            <p>Availability: <span style={{color : product.enabled ? "green" : "grey"}}>{product.enabled ? "In stock" : "Out stock"}</span></p>
                            <p>Brand : <span style={{textTransform : "uppercase"}}>{product.brand.logo}</span></p>
                        </div>
                    </div>
                    <div id={'product-review-comment'}>
                        <Formik
                            initialValues={{
                                headline : "",
                                comment  : "",
                                rating : rate,
                                product : product,
                                customer : user,
                            }}
                            enableReinitialize={true}
                            onSubmit={(values) =>{
                                console.log(values)
                                axios.post('http://localhost:8080/api/v1/reviews/comment/' + odDetailID, values).then(res =>{
                                    console.log(res)
                                    Swal.fire("Comment success!")
                                    navigate('/')
                                })
                            }
                        }
                        >
                            <Form>
                                <p><AccountBoxIcon></AccountBoxIcon> {user.firstName}</p>
                                <Rating onChange={(e) => setRate(e.target._wrapperState.initialValue)}>

                                </Rating>
                                <Field name={'headline'} placeholder={'Head line'}></Field>
                                <Field name={'comment'} as={'textarea'} placeholder={'Comment here'}>

                                </Field><br/>
                                <button type={'submit'}>Comment</button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}