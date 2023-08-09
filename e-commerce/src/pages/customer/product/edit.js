import {Field, Form, Formik} from "formik";
import "./edit.css"
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import CustomerHeader from "../../../components/customer/header";
import Swal from "sweetalert2";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import app from "../../../firebase";


export const EditProduct = () =>{
    const {id} = useParams()
    const [shops, setShop] = useState([])
    const [categories, setCategory] = useState([])
    const navigate = useNavigate()
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [selectedImage, setSelectedImage] = useState(null)
    const [urlImage, setUrlImage ] = useState("")
    const [product, setProduct] = useState({
        name : "",
        alias : "",
        shortDescription : "",
        fullDescription : "",
        customer : {
            id : -1
        },
        cost : 0,
        price : 0,
        shop : {
            id : 0
        },
        discountPercent : 0,
        brand : {
            id : 0
        },
        category : {
            id : 0
        },
        mainImage : "",
        inStock : false,
        enabled : false
    })
    console.log(product)
    const [brands, setBrand] = useState([])
    const [isUpdate, setIsUpdate] = useState(false)
    useEffect(() => {
            const tabs = document.querySelectorAll('.tab-btn')
            const firstTab = tabs[0]
            firstTab.classList.add('active')
            const all_content = document.querySelectorAll('.content');
            const firstContent = all_content[0]
            firstContent.classList.add('active')
            tabs.forEach((tab, index) => {
                tab.addEventListener('click', (e) => {
                    tabs.forEach(tab => tab.classList.remove('active'))
                    tab.classList.add('active')
                    all_content.forEach(ct => ct.classList.remove('active'))
                    all_content[index].classList.add('active');
                })
            })
    }, [])
    useEffect(() =>{
        axios.get('http://localhost:8080/api/v1/shop/' + user.id + "?list=true").then((res) => {
            setShop(res.data.filter(shop => shop.enabled))
        }).catch(err => {
            console.log(err)
        })
        axios.get('http://localhost:8080/api/v1/category/all').then((res) =>{
            setCategory(res.data.filter(cate => cate.enabled === true))
        }).catch(err => {
            console.log(err)
        })
        axios.get('http://localhost:8080/api/v1/brand/all?list=true').then((res) => {
            setBrand(res.data)
        }).catch(err => {
            console.log(err)
        })
        axios.get('http://localhost:8080/api/v1/products/detail/' + id).then((res) => {
            setProduct(res.data)
            setSelectedImage(res.data.mainImage)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
            uploadImageToFirebaseStorage(file).then(r => {
                console.log(r)
            }); // Thêm dòng này để tải hình ảnh lên Firebase Storage
        }
    };
    const uploadImageToFirebaseStorage = async (file) => {
        try {
            const storage = getStorage(app);
            const storageRef = ref(storage, "images/" + file.name);
            await uploadBytes(storageRef, file);
            const imageURL = await getDownloadURL(storageRef);
            console.log(imageURL)
            setUrlImage(imageURL);
        } catch (error) {
            console.error("Lỗi khi tải hình ảnh lên Firebase Storage:", error);
        }
    };

    return(
        <Formik
            initialValues={{
                name : product.name,
                alias : product.alias,
                shortDescription : product.shortDescription,
                fullDescription : product.fullDescription,
                customer : {
                    id : user.id
                },
                cost : product.cost,
                price : product.price,
                shop : {
                    id : product.shop.id
                },
                discountPercent : product.discountPercent,
                brand : {
                    id : product.brand.id
                },
                category : {
                    id : product.category.id
                },
                inStock : product.inStock,
                enabled : product.enabled,
                quantity : product.quantity,
                mainImage : product.mainImage
            }}
            enableReinitialize={true}
            onSubmit={(values) =>{
                if(urlImage !== ""){
                    values = {...values, mainImage : urlImage}
                }
                // values = {...values, mainImage : urlImage}
                console.log(values)
                axios.put('http://localhost:8080/api/v1/products/edit/' + id, values).then((res) => {
                    Swal.fire("Edit success!")
                    navigate('/customer/profile/product-manager')
                }).catch(errors =>{
                    Swal.fire("Something went wrong!")
                })
            }}
        >
            <Form>
                <div id={'display'}>
                    <div id={'customer-header'}>
                        <CustomerHeader></CustomerHeader>
                    </div>
                    <div id={'main-create'}>
                        <h2>Manage Product | Edit New Product</h2>
                        <div id={'container-create'}>
                            <div id={'tab-box'}>
                                <button className={'tab-btn'} type={'button'}>Overview</button>
                                <button className={'tab-btn'} type={'button'}>Description</button>
                                <button className={'tab-btn'} type={'button'}>Images</button>
                            </div>
                            <div id={'content-box'}>
                                <div className={'content'}>
                                    <div id={'create-product-table'}>
                                        <table>
                                            <tr>
                                                <td>Product Name:</td>
                                                <td><Field name={'name'}/></td>
                                            </tr>
                                            <tr>
                                                <td>Alias:</td>
                                                <td><Field name={'alias'}/></td>
                                            </tr>
                                            <tr>
                                                <td>Shop:</td>
                                                <td><Field component={'select'} name={'shop.id'} >
                                                    <option value=""></option>
                                                    {shops.map((item) => {
                                                        return(
                                                            <option value={item.id}>{item.name}</option>
                                                        )
                                                    })}
                                                </Field></td>
                                            </tr>
                                            <tr>
                                                <td>Category:</td>
                                                <td><Field component={'select'} name={'category.id'} >
                                                    <option value=""></option>
                                                    {categories.map((item) => {
                                                        return(
                                                            <option value={item.id}>{item.name}</option>
                                                        )
                                                    })}
                                                </Field></td>
                                            </tr>
                                            <tr>
                                                <td>Brand:</td>
                                                <td><Field name={'brand.id'} component={'select'}>
                                                    <option value=""></option>
                                                    {brands.map((item) => {
                                                        return(
                                                            <option value={item.id}>{item.logo === null ? "None" : item.logo}</option>
                                                        )
                                                    })}
                                                </Field>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Cost:</td>
                                                <td><Field name={'cost'}/></td>
                                            </tr>
                                            <tr>
                                                <td>Price:</td>
                                                <td><Field name={'price'}/></td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Quantity:
                                                </td>
                                                <td><Field name={'quantity'}></Field></td>
                                            </tr>
                                            <tr>
                                                <td>Discount:</td>
                                                <td><Field name={'discountPercent'}/></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                                <div className={'content'}>
                                    <div id={'add-description-product'}>
                                        <p>Short Description: </p>
                                        <Field name={'shortDescription'} component={'textarea'}></Field>
                                        <p>Full Description:</p>
                                        <Field name={'fullDescription'} component={'textarea'}></Field>
                                    </div>
                                </div>
                                <div className={'content'}>
                                    <div id={'add-product-image'}>
                                        <div className={'image-box-product'}>
                                            <p>Main image: </p>
                                            {product.mainImage === ".png" ? <img src={'/image/image-thumbnail.png'}></img> : <img src={selectedImage}></img>}<br/>
                                            <input type="file" onChange={handleImageChange}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id={'btn-submit'}>
                            <span><button id={'create-product'} type={'submit'}>Edit</button> <Link to={'/customer/profile/product-manager'}><button id={'cancel-product'} type={'button'}>Cancel</button></Link></span>
                        </div>
                    </div>

                </div>
            </Form>
        </Formik>
    )
}