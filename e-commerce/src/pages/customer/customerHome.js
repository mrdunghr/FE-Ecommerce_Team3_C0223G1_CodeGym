import Header from "../../components/admin/header";
import CustomerHeader from "../../components/customer/header";
import Dashboard from "../../components/customer/dashboard";


export default function CustomerHome(){
    return(
        <>
            <CustomerHeader></CustomerHeader>
            <Dashboard></Dashboard>
        </>
    )
}