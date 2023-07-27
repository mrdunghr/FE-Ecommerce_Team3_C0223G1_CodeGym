import CustomerHeader from "../../../components/customer/header";
import "./create.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Field, Form, Formik} from "formik";
import {Link, useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

export const CreateProduct = () =>{
    const [shops, setShop] = useState([])
    const [categories, setCategory] = useState([])
    const navigate = useNavigate()
    const [categoryVal, setCategoryVal] = useState(-1)
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [brands, setBrand] = useState([])
    const [isUpdated, setIsUpdated] = useState(false)
    useEffect(() => {
        if(user === null){
            navigate('/login')
        }else{
        const tabs = document.querySelectorAll('.tab-btn');
        const all_content = document.querySelectorAll('.content');
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', (e) => {
                // console.log(e)
                tabs.forEach(tab => tab.classList.remove('active'))
                tab.classList.add('active')

                all_content.forEach(ct => ct.classList.remove('active'))
                all_content[index].classList.add('active');
            })
        })
        axios.get('http://localhost:8888/api/v1/shop/' + user.id + "?list=true").then((res) => {
            setShop(res.data.filter(shop => shop.enabled))
        })
        axios.get('http://localhost:8888/api/v1/category/all').then((res) =>{
            setCategory(res.data.filter(cate => cate.enabled === true))
        })
        }
        axios.get('http://localhost:8888/api/v1/brand/all?list=true').then((res) => {
            setBrand(res.data)
        })
    }, [isUpdated])
    const handleChangeSelect = (e) =>{
        console.log(e.target.value)
        setCategoryVal(e.target.value)
        console.log(brands)
        setBrand(brands.filter(brand => brand.categories.map(cate => cate.id === categoryVal)))
        console.log(brands)
        if(isUpdated){
            setIsUpdated(false)
        }else{
            setIsUpdated(true)
        }
    }

    return(
        <Formik
            initialValues={{
            name : "",
            alias : "",
            shortDescription : "",
            fullDescription : "",
            customer : user,
            cost : 0,
            price : 0,
            shop : {
                id : -1
            },
            discount: 0,
            brand : {
                id : -1,

            },
            category : {
                id : -1
            }
        }}
            enableReinitialize={true}
        onSubmit={(values) =>{
            console.log(values)
            axios.post('http://localhost:8888/api/v1/products/add', values).then(res =>
                {
                    console.log(res)
                    Swal.fire("Create success!")
                }
            )
        }}
        >
            <Form>
            <div id={'display'}>
                <div id={'customer-header'}>
                    <CustomerHeader></CustomerHeader>
                </div>
                <div id={'main-create'}>
                    <h2>Manage Product | Create New Product</h2>
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
                                    <td><Field component={'select'} name={'category.id'} onClick={e => handleChangeSelect(e)}>
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
                                    <td>Discount:</td>
                                    <td><Field name={'discount'}/></td>
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
                                    <img src="/image/image-thumbnail.png" alt=""/><br/>
                                    <input type="file"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div id={'btn-submit'}>
                        <span><button id={'create-product'} type={'submit'}>Create</button> <Link to={'/product-manager'}><button id={'cancel-product'} type={'button'}>Cancel</button></Link></span>
                    </div>
            </div>

            </div>
            </Form>
        </Formik>
    )
}