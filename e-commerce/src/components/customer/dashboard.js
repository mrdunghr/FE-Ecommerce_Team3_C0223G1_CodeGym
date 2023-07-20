import "./dashboard.css"
import {Link} from "react-router-dom";
export default function Dashboard(){
    return(
        <>
            <div id={'dashboard-sidebar'}>
                <div id={'nav-dashboard'}>
                    <div id={'first-nav'}>
                        <img src="/image/avatar/avatar-1.png" alt=""/>
                        <h2>Hieu</h2>
                    </div>
                    <div id={'second-nav'}>
                        <Link to={'/home/customer'}>Dashboard</Link>
                        <Link to={'/home/customer/create-shop'}>Add New Shop</Link>
                        <Link>Manage Products</Link>
                    </div>
                </div>
            </div>
            <div id={'dashboard-main'}>

            </div>
        </>
    )
}