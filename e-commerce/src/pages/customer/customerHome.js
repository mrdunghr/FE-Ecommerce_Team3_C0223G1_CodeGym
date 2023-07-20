
import "./customerHome.css"
import CustomerHeader from "../../components/customer/header";
import Dashboard from "../../components/customer/dashboard";
// import {Outlet} from "react-router-dom";
import {Shop} from "./outlet/shop";

export default function CustomerHome(){
    return(
        <>
            <div id={'display'}>
                <div id={'customer-header'}>
                    <CustomerHeader></CustomerHeader>
                </div>
                <div id={'sidebar'}>
                    <Dashboard></Dashboard>
                </div>
                <div id={'main-outlet'}>
                        <Shop></Shop>
                </div>
            </div>
        </>
    )
}