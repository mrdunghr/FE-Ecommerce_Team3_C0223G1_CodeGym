import CustomerHeader from "../../../components/customer/header";
import "./productManager.css"
import {Link, useNavigate} from "react-router-dom";
import {CustomerFooter} from "../../../components/customer/footer";
import React, {useEffect, useState} from "react";
import axios from "axios";
import BlockIcon from '@mui/icons-material/Block';
import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/Key';
import Swal from "sweetalert2";

export const ProductManager= () =>{
    const [products, setProducts] = useState([])
    const user = JSON.parse(sessionStorage.getItem('user'))
    const navigate = useNavigate()
    const [isUpdated, setIsUpdated] = useState(false);
    const [page, setPage] = useState(0)
    useEffect(() =>{
        if(user === null){
            navigate('/login')
        }else{
        axios.get('http://localhost:8080/api/v1/products/customer-list/' + user.id +"?page="+ page).then((res) =>{
            console.log(res)
            setProducts(res.data.content)
        })}
    },[page, isUpdated])
    const handlePrevPage = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
        console.log(page)
    };

    const handleNextPage = () => {
        if (products.length > 1) { // điều kiện list có length > 1 thì không được next nữa, nhỏ hơn mới được tăng giá trị page
            setPage((prevPage) => prevPage + 1);
        }
    };
    function inActiveProduct(id){
        console.log(id)
        Swal.fire({
            title : "Are you sure you want to inactive this product?",
            showCancelButton : true,
        }).then((res) => {
            if(res.isConfirmed){
                axios.put('http://localhost:8080/api/v1/products/' + id + "/stop-product-shop").then(res =>{
                    if(isUpdated){
                        setIsUpdated(false)
                    }else{
                        setIsUpdated(true)
                    }
                    Swal.fire("Success!")
                }).catch(errors => {
                    console.log(errors)
                })
            }
        })
    }
    function ActiveProduct(id){
        Swal.fire({
            title : "Are you sure you want to active this product?",
            showCancelButton : true,
        }).then((res) => {
            if(res.isConfirmed){
                axios.put('http://localhost:8080/api/v1/products/' + id + "/open-product-shop").then(res =>{
                    if(isUpdated){
                        setIsUpdated(false)
                    }else{
                        setIsUpdated(true)
                    }
                    Swal.fire("Success!")
                }).catch(errors => {
                    console.log(errors)
                })
            }
        })
    }
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
                                        <td>{p.brand === null ? "None" : p.brand.logo}</td>
                                        <td>{p.category.name}</td>
                                        <td>{p.shop.name}</td>
                                        <td>{p.enabled ? <p className={'active-product'} style={{fontSize : "15px"}}>Active</p> : <p className={'inactive-product'} style={{fontSize : "15px"}}>Inactive</p>}</td>
                                        <td>{p.enabled ? <BlockIcon onClick={() => inActiveProduct(p.id)} className={'block-icon product-icon'}/> : <KeyIcon className={'product-icon key-icon'} onClick={() => ActiveProduct(p.id)}></KeyIcon>} <Link to={'/product/edit/'+p.id}><EditIcon className={'product-icon'}/></Link></td>
                                    </tr>
                                ))}
                            </table>
                        <button onClick={handlePrevPage}>Previous</button>
                        <button onClick={handleNextPage}>Next</button>
                    </div>

                </div>
                <div id={'footer-product-manager'}>
                    <CustomerFooter></CustomerFooter>
                </div>
            </div>
        </>
    )
}

