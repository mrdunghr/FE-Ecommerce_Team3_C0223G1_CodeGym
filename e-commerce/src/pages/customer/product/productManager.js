import CustomerHeader from "../../../components/customer/header";
import "./productManager.css"
import {Link, useNavigate} from "react-router-dom";
import {CustomerFooter} from "../../../components/customer/footer";
import {useEffect, useState} from "react";
import axios from "axios";

export const ProductManager= () =>{
    const [products, setProducts] = useState([])
    const user = JSON.parse(sessionStorage.getItem('user'))
    const navigate = useNavigate()
    if (user === null){
        navigate('/login')
    }
    useEffect(() =>{
        axios.get('http://localhost:8080/api/v1/products/customer-list/' + user.id).then((res) =>{
            console.log(res)
            setProducts(res.data.content)
        })
    },[])
    return(
        <>
            <div id={'product-display'}>
                <div id={'customer-header'}>
                    <CustomerHeader></CustomerHeader>
                </div>
                <div id={'product-main'}>
                    <p>Manage Products</p>
                    <Link to={'/product/add'}>Add new Product</Link>
                    <div id={'product-container'}>
                         <input type="text" placeholder={'Search'}/>
                            <table id={'product-table'}>
                                <tr>
                                    <th>ID</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Brand</th>
                                     <th>Category</th>
                                    <th>Shop</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                {products.map(p => (
                                    <tr>
                                        <td>{p.id}</td>
                                        <td><img src="/image/image-thumbnail.png" alt=""/></td>
                                        <td>{p.name}</td>
                                        <td>{p.brand.logo}</td>
                                        <td>{p.category.name}</td>
                                        <td>{p.shop.name}</td>
                                        <td>{p.enable ? "Active" : "Inactive"}</td>
                                        <td>OK</td>
                                    </tr>
                                ))}
                            </table>
                    </div>
                </div>
                <div id={'customer-footer'}>
                    <CustomerFooter></CustomerFooter>
                </div>
            </div>
        </>
    )
}