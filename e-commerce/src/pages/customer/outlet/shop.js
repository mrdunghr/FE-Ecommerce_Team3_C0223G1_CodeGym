import "./shop.css"
import {useEffect, useState} from "react";
import axios from "axios";
import {Field, Form, Formik} from "formik";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

 export const Shop = () =>{
    const [shops, setShops] = useState([])
     const user = JSON.parse(sessionStorage.getItem('user'))
     const navigate = useNavigate()
     useEffect(() => {
         if(user === null){
              navigate('/login')
         }else{
         axios.get("http://localhost:8080/api/v1/shop/" + user.id).then((res) => {
             console.log(res.data.content)
             setShops(res.data.content)

         })}
     }, [])
    return(
        <>
            <div id={'shop-container'}>
                <p>Manage Shops</p>
                <div id={'main-shop'}>
                    <input type="text" placeholder={'Search'} id={'search'}/>
                    <table id={'table-shop'}>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Delivery Address</th>
                            <th>Created Time</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        {shops.map(shop => {
                            return(
                                <tr>
                                    <td>{shop.id}</td>
                                    <td>{shop.name}</td>
                                    <td><img src="/image/image-thumbnail.png" alt=""/></td>
                                    <td>{shop.deliveryAddress}</td>
                                    <td>{shop.createdTime}</td>
                                    <td>{shop.enabled ? "Active" : "Inactive"}</td>
                                    <td>OK</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        </>
    )
}
export const CreateShop = () =>{
    const user = JSON.parse(sessionStorage.getItem('user'))
    return(
        <Formik
            initialValues={{
                name : "",
                deliveryAddress : "",
                customer : user,
                alias : "",
                image : "ok"
            }}
            onSubmit={(values) =>{
                console.log(values)
                axios.post('http://localhost:8080/api/v1/shop/create', values).then((res) => {
                    console.log(res)
                    Swal.fire("Create success!")
                }).catch((errors) => {
                    console.log(errors)
                    Swal.fire("Khong ok")
                })
            }}
        >
            <Form>
            <div id={'shop-container'}>
                <p>Add new shop</p>
                <div id={'main-shop'}>
                    <div id={'first-main-shop'}>
                        <Field name={'name'} placeholder={'Name'}/>
                        <Field name={'alias'} placeholder={'Alias'}/>
                        <Field  placeholder={'Image'}>
                            {({field, form}) => (
                                <input type="file"/>
                            )}
                        </Field>

                        <button type={'submit'}>Save change</button>
                    </div>
                    <div id={'second-main-shop'}>
                        <Field name={'deliveryAddress'} placeholder={'Delivery Address'}/>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                        <button type={'reset'}>Cancel</button>
                    </div>
                </div>
            </div>
            </Form>
        </Formik>
    )
}