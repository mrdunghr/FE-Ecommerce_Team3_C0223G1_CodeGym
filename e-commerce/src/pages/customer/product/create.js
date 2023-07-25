import CustomerHeader from "../../../components/customer/header";
import "./create.css"
import {CustomerFooter} from "../../../components/customer/footer";
import {useEffect, useState} from "react";
import axios from "axios";
import {Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";

export const CreateProduct = () =>{
    const [shops, setShop] = useState([])
    const user = JSON.parse(sessionStorage.getItem('user'))
    useEffect(() => {
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
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/shop/' + user.id)
    })
    return(
        <Formik initialValues={{
            name : "",
            alias : "",
            shortDescription : "",
            fullDescription : "",
            customer : {

            }
        }}>
            <Form>
            <div id={'display'}>
                <div id={'customer-header'}>
                    <CustomerHeader></CustomerHeader>
                </div>
                <div id={'main-create'}>
                    <h2>Manage Product | Create New Product</h2>
                    <div id={'container-create'}>
                    <div id={'tab-box'}>
                        <button className={'tab-btn'}>Overview</button>
                        <button className={'tab-btn'}>Description</button>
                        <button className={'tab-btn'}>Images</button>
                    </div>
                    <div id={'content-box'}>
                        <div className={'content'}>
                        <div id={'create-product-table'}>
                            <table>
                                <tr>
                                    <td>Product Name:</td>
                                    <td><input type="text"/></td>
                                </tr>
                                <tr>
                                    <td>Alias:</td>
                                    <td><input type="text"/></td>
                                </tr>
                                <tr>
                                    <td>Shop:</td>
                                    <td><input type="text"/></td>
                                </tr>
                                <tr>
                                    <td>Brand:</td>
                                    <td><input type="text"/></td>
                                </tr>
                                <tr>
                                    <td>Category:</td>
                                    <td><input type="text"/></td>
                                </tr>
                                <tr>
                                    <td>Status:</td>
                                    <td><input type="checkbox"/></td>
                                </tr>
                                <tr>
                                    <td>In-stock:</td>
                                    <td><input type="checkbox"/></td>
                                </tr>
                                <tr>
                                    <td>Cost:</td>
                                    <td><input type="text"/></td>
                                </tr>
                                <tr>
                                    <td>Price:</td>
                                    <td><input type="text"/></td>
                                </tr>
                                <tr>
                                    <td>Discount:</td>
                                    <td><input type="text"/></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                        <div className={'content'}>
                            <div id={'add-description-product'}>
                                <p>Short Description: </p>
                                <textarea name="" id="" cols="30" rows="10"></textarea>
                                <p>Full Description:</p>
                                <textarea name="" id="" cols="30" rows="10"></textarea>
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
                        <span><button id={'create-product'}>Create</button> <button id={'cancel-product'}>Cancel</button></span>
                    </div>
            </div>

            </div>
            </Form>
        </Formik>
    )
}