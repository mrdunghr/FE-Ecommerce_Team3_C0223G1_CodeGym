
import "./customerProfile.css"
import CustomerHeader from "../../components/customer/header";
import Dashboard from "../../components/customer/dashboard";
import {Outlet} from "react-router-dom";
import {Footer} from "../../components/admin/footer";

export default function CustomerProfile(){
    return(
        <>
            <div id={'customer-header'}>
                <CustomerHeader></CustomerHeader>
            </div>
            <div id={'shop-display'}>
                <div id={'sidebar'}>
                    <Dashboard></Dashboard>
                </div>
                <div id={'main-outlet'}>
                        <Outlet></Outlet>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}