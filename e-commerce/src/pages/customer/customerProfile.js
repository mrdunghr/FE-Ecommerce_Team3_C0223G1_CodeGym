
import "./customerProfile.css"
import CustomerHeader from "../../components/customer/header";
import Dashboard from "../../components/customer/dashboard";
import {Outlet} from "react-router-dom";
import {CustomerFooter} from "../../components/customer/footer";

export default function CustomerProfile(){
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
                <div id={'customer-footer'} >
                    <CustomerFooter></CustomerFooter>
                </div>
            </div>
        </>
    )
}