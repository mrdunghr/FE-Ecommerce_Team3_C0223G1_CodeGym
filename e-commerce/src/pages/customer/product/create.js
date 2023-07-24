import CustomerHeader from "../../../components/customer/header";
import "./create.css"
import {CustomerFooter} from "../../../components/customer/footer";

export const CreateProduct = () =>{

    return(
        <>
            <div id={'display'}>
                <div id={'customer-header'}>
                    <CustomerHeader></CustomerHeader>
                </div>
                <div id={'main-create'}>
                    <h2>Manage Product | Create New Product</h2>
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
                            <tr>
                                <td>Description: </td>
                                <td><textarea name="" id="" cols="30" rows="10"></textarea></td>
                            </tr>
                            <tr>
                                <td>Images:</td>
                                <td><input type="file"/></td>
                            </tr>
                            <tr>
                                <td colSpan={2} style={{paddingLeft: "400px"}}>
                                    <button id={'btn-create-prod'}>Create</button>
                                    <button id={'btn-cancel-prod'}>Cancel</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id={'footer'}>
                    <CustomerFooter></CustomerFooter>
                </div>
            </div>
        </>
    )
}