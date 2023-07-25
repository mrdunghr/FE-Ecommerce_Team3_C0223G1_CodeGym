import CustomerHeader from "../../../components/customer/header";
import "./productManager.css"
import {Link} from "react-router-dom";
import {CustomerFooter} from "../../../components/customer/footer";

export const ProductManager= () =>{

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
                                <tr>
                                    <td>1</td>
                                    <td>None</td>
                                    <td>OK</td>
                                    <td>OK</td>
                                    <td>OK</td>
                                    <td>OK</td>
                                    <td>OK</td>
                                    <td>OK</td>
                                </tr>
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