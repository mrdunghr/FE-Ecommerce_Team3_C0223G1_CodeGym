
import "./customerHome.css"
import CustomerHeader from "../../components/customer/header";
import Dashboard from "../../components/customer/dashboard";
// import {CreateShop, Shop} from "./outlet/shop";
import {Outlet} from "react-router-dom";

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
                        <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}